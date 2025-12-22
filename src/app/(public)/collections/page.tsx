import Link from 'next/link'
import { getCollections } from '@/actions/collections'

export default async function CollectionsIndexPage() {
  const collections = await getCollections()

  return (
    <div className="bg-background min-h-screen pb-24">
       {/* Intro Section */}
       <section className="relative py-24 md:py-32 px-6 text-center overflow-hidden">
            <div className="absolute inset-0 bg-secondary/10 -z-10" />
            <div className="container mx-auto max-w-4xl space-y-8 animate-in fade-in duration-1000 slide-in-from-bottom-8">
                <h1 className="text-5xl md:text-6xl font-serif text-primary">Collections</h1>
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                    Welcome to a realm where art is not decoration, but transmission.
                    Each collection you encounter here carries frequencies, codes, and subtle architectures designed to awaken remembrance — the ancient knowing already alive within your spirit.
                </p>
                <p className="text-lg md:text-xl font-light opacity-90 leading-relaxed">
                     These paintings are portals, not objects.
                     They open the inner eye, recalibrate the heart, touch your soul, and help dissolve the densities that keep you bound to 3D perception.
                     Their role is simple and sacred: to assist your ascent into higher consciousness and support the embodiment of your 5D Self.
                </p>
                <p className="text-lg font-serif italic text-muted-foreground pt-4">
                     "Your soul will recognize what your mind has not yet learned to name."
                </p>
            </div>
       </section>

       {/* Grid Section */}
       <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {collections.map((collection, idx) => (
                <Link 
                  key={collection.id} 
                  href={`/collections/${collection.slug}`}
                  className="group block space-y-4"
                  // Add stagger animation roughly
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                          style={{ backgroundImage: `url(${collection.imageUrl || 'https://placehold.co/600x800/222222/FFFFFF/png?text=' + collection.title})` }} 
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </div>
                  
                  <div className="text-center space-y-2">
                       <h3 className="text-3xl font-serif text-primary group-hover:text-accent-foreground transition-colors">{collection.title}</h3>
                       <p className="text-sm uppercase tracking-widest text-muted-foreground">{collection.tagline}</p>
                       <p className="text-sm line-clamp-2 opacity-80 px-4">{collection.description}</p>
                  </div>
                </Link>
            ))}
          </div>
       </section>
    </div>
  )
}
