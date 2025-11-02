import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db/connect";
import RentalRequest from "../../../../models/RentalRequest";

function serializeRequest(doc) {
  return {
    id: doc._id.toString(),
    startDate: doc.startDate.toISOString(),
    endDate: doc.endDate.toISOString(),
    note: doc.notes || "",
    guests: doc.guests || 1,
    createdAt: doc.createdAt.toISOString(),
    status: "open",
  };
}

async function requireTenant() {
  const session = await auth();
  if (!session || session.user.role !== "tenant") {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireTenant();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const requests = await RentalRequest.find({ tenant: session.user.id }).sort({ createdAt: -1 });
  return NextResponse.json(requests.map(serializeRequest));
}

export async function POST(request) {
  const session = await requireTenant();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { startDate, endDate, note, guests } = await request.json();
  if (!startDate || !endDate) {
    return NextResponse.json({ error: "Missing dates" }, { status: 400 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
    return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
  }
  if (end <= start) {
    return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
  }

  await connectToDatabase();
  const created = await RentalRequest.create({
    tenant: session.user.id,
    startDate: start,
    endDate: end,
    notes: note || "",
    guests: guests && Number.isFinite(guests) ? Math.max(1, guests) : 1,
  });

  return NextResponse.json(serializeRequest(created), { status: 201 });
}

export async function DELETE(request) {
  const session = await requireTenant();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await connectToDatabase();
  const deleted = await RentalRequest.findOneAndDelete({ _id: id, tenant: session.user.id });
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
