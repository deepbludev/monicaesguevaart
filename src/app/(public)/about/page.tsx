'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/button'
import Link from 'next/link'
import { ParallaxHeaderStrip } from '@/features/layout/components/parallax-header-strip'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header Image Strip with Parallax */}
      <ParallaxHeaderStrip src="/about-header.jpg" alt="The Artist">
        <h1 className="text-5xl font-light tracking-wide text-white md:text-7xl">
          The Artist
        </h1>
      </ParallaxHeaderStrip>

      {/* Bio Section */}
      <section className="bg-background py-12 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm md:aspect-square"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://placehold.co/800x800/222/fff?text=Monica)',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl">
                Monica Esgueva
              </h2>
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed font-light">
                <p>
                  Monica Esgueva is a celebrated spiritual teacher, author, and
                  visionary artist whose work serves as a bridge between the
                  physical and the ethereal. Her art is not merely an aesthetic
                  expression but a channeled transmission of high-frequency
                  energy.
                </p>
                <p>
                  With a background in deep meditative practices and a life
                  dedicated to the expansion of consciousness, Monica channels
                  codes of light onto the canvas. Each piece is birthed from a
                  state of no-mind, allowing the intelligence of the universe to
                  flow through her hands.
                </p>
                <p>
                  These paintings are portals—designed to bypass the analytical
                  mind and speak directly to the soul, activating dormant
                  memories and facilitating a return to one&apos;s true essence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative overflow-hidden bg-neutral-900 py-24 text-neutral-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-10" />

        <div className="relative z-10 container mx-auto max-w-3xl space-y-12 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 font-serif text-4xl">Philosophy</h2>
            <p className="text-xl leading-relaxed font-light italic md:text-2xl">
              &quot;True art does not explain; it reveals. It is an invitation
              to step beyond the known and experience the vastness of who we
              truly are.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 font-serif text-3xl">Connect with the Work</h2>
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-xs tracking-widest uppercase"
          >
            <Link href="/collections">View Collections</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
