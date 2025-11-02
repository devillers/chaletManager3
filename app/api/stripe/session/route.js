import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { applyRateLimit } from "../../../../lib/security/rate-limit";

const STRIPE_API_VERSION = "2024-06-20";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_LINE_ITEMS = 10;
const MAX_UNIT_AMOUNT = 1_000_000; // €10,000.00

function getClientIdentifier(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.ip ||
    "anonymous"
  );
}

function resolveAppUrl(request) {
  const configured = process.env.APP_URL;
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch (error) {
      // ignore invalid APP_URL and fallback to request origin
    }
  }
  return new URL(request.url).origin;
}

function sanitizeReturnUrl(input, fallback, appOrigin) {
  if (!input) return fallback;
  try {
    const url = new URL(input, appOrigin);
    if (url.origin !== appOrigin) {
      return fallback;
    }
    return url.toString();
  } catch (error) {
    return fallback;
  }
}

function normalizeLineItems(lineItems = []) {
  if (!Array.isArray(lineItems)) {
    throw new Error("lineItems must be an array");
  }

  if (lineItems.length === 0) {
    return [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Chalet Manager partnership activation",
          },
          unit_amount: 5_000,
        },
        quantity: 1,
      },
    ];
  }

  if (lineItems.length > MAX_LINE_ITEMS) {
    throw new Error("Too many line items");
  }

  return lineItems.map((item) => {
    if (!item || typeof item !== "object") {
      throw new Error("Invalid line item");
    }
    const { price_data: priceData, quantity } = item;
    if (!priceData || typeof priceData !== "object") {
      throw new Error("Missing price_data");
    }
    const { currency, product_data: productData, unit_amount: unitAmount } = priceData;
    if (currency !== "eur") {
      throw new Error("Unsupported currency");
    }
    if (!productData?.name || typeof productData.name !== "string") {
      throw new Error("Invalid product name");
    }
    if (typeof unitAmount !== "number" || !Number.isFinite(unitAmount) || unitAmount <= 0) {
      throw new Error("Invalid amount");
    }
    if (unitAmount > MAX_UNIT_AMOUNT) {
      throw new Error("Amount exceeds limit");
    }
    const safeQuantity = typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: productData.name.slice(0, 80),
        },
        unit_amount: Math.round(unitAmount),
      },
      quantity: Math.min(safeQuantity, 10),
    };
  });
}

export async function POST(request) {
  const session = await auth();
  if (!session || !["owner", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientId = getClientIdentifier(request);
  const rateLimit = applyRateLimit(clientId, {
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.reset - Date.now()) / 1000)),
        },
      },
    );
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = new Stripe(secret, { apiVersion: STRIPE_API_VERSION });

  let body = {};
  try {
    body = await request.json();
  } catch (error) {
    body = {};
  }

  const appOrigin = resolveAppUrl(request);
  const defaultSuccess = `${appOrigin}/owner?checkout=success`;
  const defaultCancel = `${appOrigin}/owner?checkout=cancelled`;

  const successUrl = sanitizeReturnUrl(body.successUrl, defaultSuccess, appOrigin);
  const cancelUrl = sanitizeReturnUrl(body.cancelUrl, defaultCancel, appOrigin);

  let lineItems;
  try {
    lineItems = normalizeLineItems(body.lineItems);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: lineItems,
    });
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe session error", error);
    return NextResponse.json({ error: "Unable to create session" }, { status: 500 });
  }
}
