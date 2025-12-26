'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/button'

type Collection = {
  id: string
  title: string
  slug: string
  paintings: Array<{ imageUrl: string }>
}

interface FeaturedCollectionsClientProps {
  collections: Collection[]
}

export function FeaturedCollectionsClient({
  collections,
}: FeaturedCollectionsClientProps) {
  return (
    <section className="bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl">
            Featured Collections
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl font-light tracking-wide">
            Explore the latest series of works, each a unique gateway to higher
            dimensions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group block space-y-4"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${
                        collection.paintings[0]?.imageUrl ||
                        '/meart-default.png'
                      })`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </div>
                <div className="text-center">
                  <h3 className="group-hover:text-primary font-serif text-xl tracking-wide transition-colors">
                    {collection.title}
                  </h3>
                  <span className="text-muted-foreground group-hover:border-primary/50 mt-1 inline-block border-b border-transparent text-xs tracking-widest uppercase transition-all">
                    View Collection
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="text-xs tracking-[0.2em] uppercase"
          >
            <Link href="/collections">View All Collections</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

