import Link from 'next/link'
import Image from 'next/image'
import { getCollections } from '@/actions/collections'

export default async function CollectionsIndexPage() {
  const collections = await getCollections()

  return (
    <div className="bg-background min-h-screen">
      {/* Header Image Strip */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[40vh] min-h-[300px] w-full md:h-[50vh]">
          <Image
            src="/collections-header.jpg"
            alt="Collections"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-light tracking-wide text-white md:text-7xl">
              Collections
            </h1>
          </div>
        </div>
      </section>

      {/* Collections List */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="space-y-12 md:space-y-16">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="flex flex-col gap-6 md:flex-row md:gap-8"
            >
              {/* Image on Left */}
              <div className="shrink-0 md:w-1/3 lg:max-w-xs">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                  <Image
                    src={
                      collection.paintings[0]?.imageUrl ||
                      collection.imageUrl ||
                      'https://placehold.co/600x600/222222/FFFFFF/png?text=' +
                        collection.title
                    }
                    alt={collection.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content on Right */}
              <div className="flex flex-col justify-center space-y-4 md:flex-1">
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                    {collection.title}
                  </h2>
                  {collection.tagline && (
                    <p className="text-muted-foreground text-sm font-light italic md:text-base">
                      {collection.tagline}
                    </p>
                  )}
                </div>
                <p className="text-base leading-relaxed font-light md:text-lg">
                  {collection.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="inline-block rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium tracking-wide text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
                  >
                    View gallery &gt;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
