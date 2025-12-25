import Link from 'next/link'
import { getCollections } from '@/actions/collections'

export default async function CollectionsIndexPage() {
  const collections = await getCollections()

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Intro Section */}
      <section className="relative overflow-hidden px-6 py-24 text-center md:py-32">
        <div className="bg-secondary/10 absolute inset-0 -z-10" />
        <div className="animate-in fade-in slide-in-from-bottom-8 container mx-auto max-w-4xl space-y-8 duration-1000">
          <h1 className="text-primary font-serif text-5xl md:text-6xl">
            Collections
          </h1>
          <p className="text-xl leading-relaxed font-light md:text-2xl">
            Welcome to a realm where art is not decoration, but transmission.
            &quot;Each collection tells a story, a journey through color and
            emotion.&quot;cies, codes, and subtle architectures designed to
            awaken remembrance — the ancient knowing already alive within your
            spirit.
          </p>
          <p className="text-lg leading-relaxed font-light opacity-90 md:text-2xl">
            These paintings are portals, not objects. They open the inner eye,
            recalibrate the heart, touch your soul, and help dissolve the
            densities that keep you bound to 3D perception. Their role is simple
            and sacred: to assist your ascent into higher consciousness and
            support the embodiment of your 5D Self.
          </p>
          <p className="text-muted-foreground pt-4 font-serif text-lg italic">
            &quot;Your soul will recognize what your mind has not yet learned to
            name.&quot;
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group block space-y-4"
              // Add stagger animation roughly
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${collection.paintings[0]?.imageUrl || collection.imageUrl || 'https://placehold.co/600x800/222222/FFFFFF/png?text=' + collection.title})`,
                  }}
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
              </div>

              <div className="space-y-2 text-center">
                <h3 className="text-primary group-hover:text-accent-foreground font-serif text-3xl transition-colors">
                  {collection.title}
                </h3>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                  {collection.tagline}
                </p>
                <p className="line-clamp-2 px-4 text-sm opacity-80">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
