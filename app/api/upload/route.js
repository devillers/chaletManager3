
export const dynamic = "force-dynamic";

import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { isCloudinaryEnabled, uploadImage } from "../../../lib/cloudinary";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

async function ensureUploadsDir() {
  await fs.mkdir(uploadsDir, { recursive: true });
}

export async function POST(request) {
  const session = await auth();
  if (!session || !["owner", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = file.name?.split(".").pop()?.toLowerCase() || "jpg";
  const filename = randomUUID();

  if (isCloudinaryEnabled()) {
    try {
      const result = await uploadImage(buffer, filename);
      if (result?.secure_url || result?.url) {
        return NextResponse.json({ url: result.secure_url || result.url });
      }
    } catch (error) {
      console.error("Cloudinary upload failed", error);
    }
  }

  await ensureUploadsDir();
  const target = path.join(uploadsDir, `${filename}.${extension}`);
  await fs.writeFile(target, buffer);
  return NextResponse.json({ url: `/uploads/${filename}.${extension}` });
}
