import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db/connect";
import Chalet from "../../../../models/Chalet";
import { serializeChalet } from "../../../../lib/serializers/chalet";

const ALLOWED_STATUSES = ["draft", "pending", "published"];

export async function POST(request) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { chaletId, status } = await request.json();
  if (!chaletId || !status) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }
  if (!ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  if (!mongoose.isValidObjectId(chaletId)) {
    return NextResponse.json({ error: "Invalid identifier" }, { status: 400 });
  }

  await connectToDatabase();
  const chalet = await Chalet.findById(chaletId);
  if (!chalet) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  chalet.status = status;
  chalet.publishedAt = status === "published" ? new Date() : chalet.publishedAt;
  const saved = await chalet.save();

  return NextResponse.json(serializeChalet(saved));
}
