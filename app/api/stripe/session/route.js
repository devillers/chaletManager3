import Stripe from "stripe";
import { NextResponse } from "next/server";

const STRIPE_API_VERSION = "2024-06-20";

export async function POST(request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = new Stripe(secret, { apiVersion: STRIPE_API_VERSION });
  const body = await request.json().catch(() => ({}));
  const successUrl =
    body.successUrl || `${process.env.APP_URL || "http://localhost:3000"}/owner?checkout=success`;
  const cancelUrl =
    body.cancelUrl || `${process.env.APP_URL || "http://localhost:3000"}/owner?checkout=cancelled`;
  const lineItems =
    body.lineItems || [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Chalet Manager partnership activation",
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ];

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
