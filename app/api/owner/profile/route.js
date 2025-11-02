i
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db/connect";
import User from "../../../../models/User";

export async function PUT(request) {
  const session = await auth();
  if (!session || session.user.role !== "owner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { profile } = await request.json();
  if (!profile) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const { firstName, lastName, phone, email } = profile;

  await connectToDatabase();
  const user = await User.findById(session.user.id).select("firstName lastName email phone role");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (email && email !== user.email) {
    const emailTaken = await User.exists({ email, _id: { $ne: user._id } });
    if (emailTaken) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    user.email = email;
  }

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (phone !== undefined) user.phone = phone;

  await user.save();

  return NextResponse.json({
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
    role: user.role,
  });
}
