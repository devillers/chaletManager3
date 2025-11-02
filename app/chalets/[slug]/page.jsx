import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { connectToDatabase } from "../../../lib/db/connect";
import { serializeChalet } from "../../../lib/serializers/chalet";
import Chalet from "../../../models/Chalet";

export const revalidate = 300;

const getChalet = unstable_cache(
  async (slug) => {
    await connectToDatabase();
    const doc = await Chalet.findOne({ slug, status: "published" });
    return doc ? serializeChalet(doc) : null;
  },
  ["chalet-by-slug"],
  { revalidate },
);

export async function generateMetadata({ params }) {
  const chalet = await getChalet(params.slug);
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
  const chalet = await getChalet(params.slug);
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
            <Image
              src={chalet.heroUrl}
              alt={chalet.title}
              width={1920}
              height={1080}
              className="h-96 w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
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
                  <Image
                    src={photo.url}
                    alt={photo.roomName || "Chalet photo"}
                    width={1280}
                    height={720}
                    className="h-56 w-full rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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
              className={[
                "inline-flex items-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold",
                "text-neutral-700 hover:bg-neutral-100",
              ].join(" ")}
            >
              Download availability calendar
            </a>
          ) : null}
        </section>
      </main>
    </div>
  );
}
