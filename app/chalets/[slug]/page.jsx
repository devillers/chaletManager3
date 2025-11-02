import Link from "next/link";
import { notFound } from "next/navigation";
import { connectToDatabase } from "../../../lib/db/connect";
import { serializeChalet } from "../../../lib/serializers/chalet";
import Chalet from "../../../models/Chalet";

export const dynamic = "force-dynamic";

async function fetchChalet(slug) {
  await connectToDatabase();
  const doc = await Chalet.findOne({ slug, status: "published" });
  return doc ? serializeChalet(doc) : null;
}

export async function generateMetadata({ params }) {
  const chalet = await fetchChalet(params.slug);
  if (!chalet) {
    return { title: "Chalet Manager" };
  }
  return {
    title: `${chalet.title} – Chalet Manager`,
    description: chalet.descriptionShort,
    openGraph: {
      title: chalet.title,
      description: chalet.descriptionShort,
      images: chalet.heroUrl ? [{ url: chalet.heroUrl }] : [],
    },
  };
}

export default async function ChaletPage({ params }) {
  const chalet = await fetchChalet(params.slug);
  if (!chalet) {
    notFound();
  }
  return (
    <div className="bg-neutral-50">
      <header className="bg-neutral-900 py-10 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4">
          <Link href="/fr" className="text-sm font-semibold text-neutral-300 hover:text-white">
            ← Chalet Manager
          </Link>
          <h1 className="text-4xl font-semibold">{chalet.title}</h1>
          <p className="max-w-2xl text-neutral-200">{chalet.descriptionShort}</p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl space-y-10 px-4 py-12">
        {chalet.heroUrl ? (
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chalet.heroUrl} alt={chalet.title} className="h-96 w-full object-cover" />
          </div>
        ) : null}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-900">About this chalet</h2>
          <p className="whitespace-pre-line text-neutral-700">{chalet.descriptionLong}</p>
        </section>
        {Array.isArray(chalet.photos) && chalet.photos.length > 0 ? (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Gallery</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {chalet.photos.map((photo) => (
                <figure key={photo.url} className="space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.roomName || "Chalet photo"} className="h-56 w-full rounded-xl object-cover" />
                  <figcaption className="text-sm text-neutral-600">
                    <span className="font-semibold text-neutral-900">{photo.roomName}</span>
                    {photo.roomDescription ? ` – ${photo.roomDescription}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-900">Location & availability</h2>
          <p className="text-neutral-700">{chalet.address}</p>
          {chalet.icalUrl ? (
            <a
              href={chalet.icalUrl}
              className="inline-flex items-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
            >
              Download availability calendar
            </a>
          ) : null}
        </section>
      </main>
    </div>
  );
}
