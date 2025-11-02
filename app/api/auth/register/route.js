
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db/connect";
import User from "../../../../models/User";

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, role, accepted } = await request.json();
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!accepted) {
      return NextResponse.json({ error: "Terms must be accepted" }, { status: 400 });
    }
    if (!["tenant", "owner"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 });
    }

    await connectToDatabase();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const user = new User({ firstName, lastName, email, password, role });
    await user.save();

    return NextResponse.json({ id: user._id.toString(), role: user.role });
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
