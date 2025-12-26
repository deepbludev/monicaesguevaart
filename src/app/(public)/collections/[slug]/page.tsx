import { getCollectionBySlug } from '@/features/public/collections/actions/collections'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ParallaxHeaderStrip } from '@/features/layout/components/parallax-header-strip'

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Image Strip with Parallax */}
      <ParallaxHeaderStrip
        src={collection.paintings[0]?.imageUrl || '/meart-default.png'}
        alt={collection.title}
      />

      {/* Title and Description Section */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          {collection.tagline && (
            <p className="text-muted-foreground text-sm font-light tracking-wide uppercase md:text-base">
              {collection.tagline}
            </p>
          )}
          <h1 className="font-serif text-4xl tracking-tight md:text-6xl lg:text-7xl">
            {collection.title}
          </h1>
          {(collection as { medium?: string | null }).medium && (
            <p className="text-muted-foreground text-sm">
              {(collection as { medium?: string | null }).medium}
            </p>
          )}
          <div className="border-primary/30 mx-auto w-24 border-t" />
          <p className="mx-auto max-w-2xl text-base leading-relaxed font-light md:text-lg">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Artwork Grid */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collection.paintings.map((painting) => (
            <div key={painting.id} className="group space-y-4">
              <Link
                href={`/paintings/${painting.id}`}
                className="relative block aspect-4/5 cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                <Image
                  src={painting.imageUrl}
                  alt={painting.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </Link>

              <div className="space-y-2 text-center">
                <Link
                  href={`/paintings/${painting.id}`}
                  className="hover:text-primary block transition-colors"
                >
                  <h3 className="font-serif text-xl md:text-2xl">
                    {painting.title}
                  </h3>
                </Link>
                {painting.medium && (
                  <p className="text-muted-foreground text-sm">
                    {painting.medium}
                  </p>
                )}
                {painting.size && (
                  <p className="text-muted-foreground text-sm">
                    {painting.size}
                  </p>
                )}
                <Link
                  href={`/paintings/${painting.id}`}
                  className="hover:text-primary inline-block text-sm font-medium tracking-wide transition-colors"
                >
                  View details &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back Button */}
      <div className="container mx-auto px-6 pb-24 text-center">
        <Link
          href="/collections"
          className="inline-block rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium tracking-wide text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          Back to collections
        </Link>
      </div>
    </div>
  )
}
