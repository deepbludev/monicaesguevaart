import { getCollectionBySlug } from '@/actions/collections'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

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
    <div className="bg-background min-h-screen pb-24">
      {/* Header Section */}
      <section className="relative flex h-[60vh] min-h-[500px] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${collection.imageUrl || 'https://placehold.co/1920x1080/222222/FFFFFF/png?text=' + collection.title})`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container space-y-6 text-center text-white">
          <h1 className="font-serif text-5xl tracking-tight md:text-7xl">
            {collection.title}
          </h1>
          <p className="text-xl font-light italic opacity-90 md:text-2xl">
            {collection.tagline}
          </p>
          <div className="pt-8">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/collections"
          className="hover:text-primary inline-flex items-center text-sm tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
        </Link>
      </div>

      {/* Artwork Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {collection.paintings.map((painting) => (
            <div key={painting.id} className="group space-y-6">
              <Link
                href={`/paintings/${painting.id}`}
                className="block relative aspect-4/5 cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                <Image
                  src={painting.imageUrl}
                  alt={painting.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </Link>

              <div className="space-y-1 text-center">
                <Link
                  href={`/paintings/${painting.id}`}
                  className="block hover:text-primary transition-colors"
                >
                  <h3 className="text-primary font-serif text-2xl">
                    {painting.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm font-light tracking-wide uppercase">
                  {painting.medium} {painting.size && `• ${painting.size}`}{' '}
                  {painting.year && `• ${painting.year}`}
                </p>
                {painting.description && (
                  <p className="mx-auto max-w-md pt-2 text-sm italic opacity-80">
                    {painting.description}
                  </p>
                )}

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="text-xs tracking-widest uppercase"
                    asChild
                  >
                    <Link href="/contact">Inquire</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Guidance */}
      <section className="container mx-auto max-w-2xl px-6 py-24 text-center">
        <h3 className="mb-4 font-serif text-2xl italic">
          &quot;Allow yourself to feel rather than think.&quot;
        </h3>
        <p className="opacity-80">
          Trust the intelligence of your body and soul. They recognize the codes
          long before the mind understands them.
        </p>
      </section>
    </div>
  )
}
