import { getPainting } from '@/features/public/paintings/actions/paintings'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/atoms/button'
import { ArrowLeft } from 'lucide-react'

export default async function PaintingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const painting = await getPainting(id)

  if (!painting || !painting.collection) {
    notFound()
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4">
          <Link
            href="/collections"
            className="hover:text-primary inline-flex items-center text-sm tracking-widest uppercase transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Collections
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/collections/${painting.collection.slug}`}
            className="hover:text-primary text-sm tracking-widest uppercase transition-colors"
          >
            {painting.collection.title}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm tracking-widest uppercase">
            {painting.title}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              <Image
                src={painting.imageUrl}
                alt={painting.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl">
                {painting.title}
              </h1>

              <div className="space-y-2 text-sm tracking-wide uppercase">
                {painting.medium && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">Medium:</span> {painting.medium}
                  </p>
                )}
                {painting.size && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">Size:</span> {painting.size}
                  </p>
                )}
                {painting.year && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">Year:</span> {painting.year}
                  </p>
                )}
              </div>

              {painting.description && (
                <div className="pt-4">
                  <p className="text-lg leading-relaxed opacity-90">
                    {painting.description}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <p className="text-muted-foreground text-sm">
                  From the collection:{' '}
                  <Link
                    href={`/collections/${painting.collection.slug}`}
                    className="text-primary hover:underline"
                  >
                    {painting.collection.title}
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-8">
              <Button
                size="lg"
                className="w-full tracking-widest uppercase"
                asChild
              >
                <Link href="/contact">Inquire About This Piece</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full tracking-widest uppercase"
                asChild
              >
                <Link href={`/collections/${painting.collection.slug}`}>
                  View Collection
                </Link>
              </Button>
            </div>

            {!painting.available && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-amber-800 text-center text-sm font-medium">
                  This piece is currently unavailable
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

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

