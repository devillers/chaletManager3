import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db/connect";
import Chalet from "../../../../models/Chalet";
import { serializeChalet } from "../../../../lib/serializers/chalet";

export async function POST() {
  const session = await auth();
  if (!session || session.user.role !== "owner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const chalet = await Chalet.findOne({ owner: session.user.id });
  if (!chalet) {
    return NextResponse.json({ error: "Chalet missing" }, { status: 400 });
  }

  chalet.contractAcceptedAt = new Date();
  if (chalet.status === "draft") {
    chalet.status = "pending";
  }
  const saved = await chalet.save();
  return NextResponse.json(serializeChalet(saved));
}
