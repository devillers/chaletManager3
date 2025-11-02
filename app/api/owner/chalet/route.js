export const dynamic = "force-dynamic";

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db/connect";
import Chalet from "../../../../models/Chalet";
import { slugify } from "../../../../lib/utils/slugify";
import { serializeChalet } from "../../../../lib/serializers/chalet";

async function generateUniqueSlug(base, excludeId) {
  for (let attempt = 0; ; attempt += 1) {
    const slug = attempt === 0 ? base : `${base}-${attempt}`;
    const query = { slug };
    if (excludeId && mongoose.isValidObjectId(excludeId)) {
      query._id = { $ne: excludeId };
    }
    const exists = await Chalet.exists(query);
    if (!exists) {
      return slug;
    }
  }
}

function normalizePhotos(inputPhotos = [], heroUrl) {
  const normalized = [];
  const seen = new Set();
  for (const photo of inputPhotos) {
    if (!photo?.url || seen.has(photo.url)) continue;
    const entry = {
      url: photo.url,
      roomName: photo.roomName || "",
      roomDescription: photo.roomDescription || "",
      isHero: Boolean(photo.isHero) || photo.url === heroUrl,
    };
    normalized.push(entry);
    seen.add(photo.url);
  }
  if (heroUrl && !seen.has(heroUrl)) {
    normalized.unshift({ url: heroUrl, roomName: "", roomDescription: "", isHero: true });
  }
  if (normalized.length > 0) {
    const [primary, ...rest] = normalized.sort((a, b) => (a.isHero === b.isHero ? 0 : a.isHero ? -1 : 1));
    return [primary, ...rest.map((item) => ({ ...item, isHero: item.isHero && item.url === primary.url }))];
  }
  return normalized;
}

export async function POST(request) {
  const session = await auth();
  if (!session || session.user.role !== "owner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { chalet } = await request.json();
  if (!chalet) {
    return NextResponse.json({ error: "Missing chalet" }, { status: 400 });
  }

  if (!chalet.title || !chalet.descriptionShort || !chalet.descriptionLong || !chalet.address) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  await connectToDatabase();

  const existing = await Chalet.findOne({ owner: session.user.id });
  const baseSlug = slugify(chalet.slugSource || chalet.title || existing?.title || "chalet");
  let slug = existing?.slug;
  if (!slug || slug !== baseSlug) {
    slug = await generateUniqueSlug(baseSlug, existing?._id);
  }

  const photos = normalizePhotos(chalet.photos, chalet.heroUrl);

  const payload = {
    owner: session.user.id,
    title: chalet.title,
    address: chalet.address,
    registrationNumber: chalet.registrationNumber || "",
    fiscalAddress: chalet.fiscalAddress || "",
    descriptionShort: chalet.descriptionShort,
    descriptionLong: chalet.descriptionLong,
    icalUrl: chalet.icalUrl || "",
    photos,
    slug,
  };

  let saved;
  if (existing) {
    existing.set(payload);
    saved = await existing.save();
  } else {
    saved = await Chalet.create(payload);
  }

  return NextResponse.json(serializeChalet(saved));
}
