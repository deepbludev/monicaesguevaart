import Link from 'next/link'
import { getCollections } from '@/actions/collections'
import { Button } from '@/components/ui/button'

export async function FeaturedCollections() {
  const collections = await getCollections()
  const featured = collections.slice(0, 4) // Show up to 4

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif text-center mb-16 text-primary">Featured Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((collection) => (
             <Link 
                key={collection.id} 
                href={`/collections/${collection.slug}`}
                className="group block relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                     style={{ backgroundImage: `url(${collection.imageUrl || 'https://placehold.co/600x800/222222/FFFFFF/png?text=' + collection.title})` }} 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-serif mb-2">{collection.title}</h3>
                  <p className="text-sm font-light tracking-wide italic">{collection.tagline || 'Explore the collection'}</p>
                </div>

                {/* Always visible title (optional styles) - I'll stick to hover reveal or bottom caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white md:opacity-100 transition-opacity">
                    <h3 className="text-xl font-serif">{collection.title}</h3>
                </div>
             </Link>
          ))}
        </div>

        <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="uppercase tracking-widest px-8 py-6">
                <Link href="/collections">Explore All Collections</Link>
            </Button>
        </div>
      </div>
    </section>
  )
}
