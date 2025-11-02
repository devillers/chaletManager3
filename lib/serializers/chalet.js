export function serializeChalet(doc) {
  const photos = (doc.photos || []).map((photo) => ({
    url: photo.url,
    roomName: photo.roomName || "",
    roomDescription: photo.roomDescription || "",
    isHero: Boolean(photo.isHero),
  }));
  const hero = photos.find((photo) => photo.isHero) || null;
  const ownerId =
    typeof doc.owner === "string"
      ? doc.owner
      : doc.owner?._id?.toString?.() || doc.owner?.toString?.() || "";
  return {
    id: doc._id.toString(),
    ownerId,
    title: doc.title,
    descriptionShort: doc.descriptionShort || "",
    descriptionLong: doc.descriptionLong || "",
    address: doc.address || "",
    registrationNumber: doc.registrationNumber || "",
    fiscalAddress: doc.fiscalAddress || "",
    icalUrl: doc.icalUrl || "",
    photos,
    heroUrl: hero ? hero.url : "",
    status: doc.status,
    slug: doc.slug,
    contractAccepted: Boolean(doc.contractAcceptedAt),
    contractAcceptedAt: doc.contractAcceptedAt ? doc.contractAcceptedAt.toISOString() : null,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
    createdAt: doc.createdAt?.toISOString?.() || null,
    updatedAt: doc.updatedAt?.toISOString?.() || null,
  };
}
