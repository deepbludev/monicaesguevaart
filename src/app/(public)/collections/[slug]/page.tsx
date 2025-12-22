import { getCollectionBySlug } from '@/actions/collections'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = await getCollectionBySlug(params.slug)

  if (!collection) {
    notFound()
  }

  return (
    <div className="bg-background min-h-screen pb-24">
       {/* Header Section */}
       <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${collection.imageUrl || 'https://placehold.co/1920x1080/222222/FFFFFF/png?text=' + collection.title})` }} />
            <div className="absolute inset-0 bg-black/50" />
            
            <div className="container relative z-10 text-center text-white space-y-6">
                <h1 className="text-5xl md:text-7xl font-serif tracking-tight">{collection.title}</h1>
                <p className="text-xl md:text-2xl font-light italic opacity-90">{collection.tagline}</p>
                <div className="pt-8">
                     <p className="max-w-2xl mx-auto text-lg leading-relaxed">{collection.description}</p>
                </div>
            </div>
       </section>

       {/* Breadcrumb / Back */}
       <div className="container mx-auto px-6 py-8">
            <Link href="/collections" className="inline-flex items-center text-sm uppercase tracking-widest hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
            </Link>
       </div>

       {/* Artwork Grid */}
       <section className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {collection.paintings.map((painting) => (
                    <div key={painting.id} className="space-y-6">
                         <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img 
                                src={painting.imageUrl} 
                                alt={painting.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                             />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                         </div>
                         
                         <div className="text-center space-y-1">
                             <h3 className="text-2xl font-serif text-primary">{painting.title}</h3>
                             <p className="text-sm font-light text-muted-foreground uppercase tracking-wide">
                                {painting.medium} {painting.size && `• ${painting.size}`} {painting.year && `• ${painting.year}`}
                             </p>
                             {painting.description && <p className="text-sm opacity-80 pt-2 italic max-w-md mx-auto">{painting.description}</p>}
                             
                             <div className="pt-4">
                                <Button variant="outline" className="uppercase tracking-widest text-xs" asChild>
                                    <Link href="/contact">Inquire</Link>
                                </Button>
                             </div>
                         </div>
                    </div>
                ))}
            </div>
       </section>

       {/* Footer Guidance */}
       <section className="container mx-auto px-6 py-24 text-center max-w-2xl">
            <h3 className="text-2xl font-serif italic mb-4">"Allow yourself to feel rather than think."</h3>
            <p className="opacity-80">Trust the intelligence of your body and soul. They recognize the codes long before the mind understands them.</p>
       </section>
    </div>
  )
}
