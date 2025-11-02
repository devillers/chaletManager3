import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { isCloudinaryEnabled, uploadImage } from "../../../lib/cloudinary";

const uploadsDir = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
  ["image/heic", "heic"],
]);

async function ensureUploadsDir() {
  await fs.mkdir(uploadsDir, { recursive: true });
}

function getExtension(file) {
  if (file.type && ALLOWED_MIME_TYPES.has(file.type)) {
    return ALLOWED_MIME_TYPES.get(file.type);
  }
  const nameExtension = file.name?.split(".").pop()?.toLowerCase();
  if (nameExtension && Array.from(ALLOWED_MIME_TYPES.values()).includes(nameExtension)) {
    return nameExtension;
  }
  return null;
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

  if (typeof file.size === "number" && file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }

  if (!file.type || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 415 });
  }

  const extension = getExtension(file);
  if (!extension) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 415 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

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
