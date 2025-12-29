'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/button'
import Link from 'next/link'
import Image from 'next/image'
import { ParallaxHeaderStrip } from '@/features/layout/components/parallax-header-strip'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header Image Strip with Parallax */}
      <ParallaxHeaderStrip src="/collections-header.jpg" alt="Mónica Esgueva">
        <h1 className="text-3xl font-light tracking-wide text-white md:text-5xl">
          Mónica Esgueva - Visionary Artist
        </h1>
      </ParallaxHeaderStrip>

      {/* Artist Statement Section */}
      <section className="bg-background py-12 md:py-24">
        <div className="container mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl">Artist Statement</h2>
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed font-light text-justify">
              <p>
                My creative process is deeply rooted in meditation and inner visions
                that transcend the physical world. Through my art, I seek to channel
                the essence of these transcendent experiences, creating works that
                serve as portals to higher dimensions of consciousness.
              </p>
              <p>
                Each painting emerges from a state of deep connection with the
                universal intelligence, allowing me to translate the ineffable into
                visual form. The colors, forms, and energies that flow through me
                are not merely aesthetic choices but are guided by an inner knowing
                that seeks to expand light and awareness.
              </p>
              <p>
                As Robert Schumann once observed, art has the power to transcend the
                limitations of the material world and touch the eternal. My work
                aligns with this perspective, offering viewers an opportunity to
                reconnect with their true essence and remember the infinite
                potential that resides within.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="bg-background py-12 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-3xl md:text-4xl">
                  Mónica Esgueva
                </h2>
                <p className="text-muted-foreground mt-2 text-lg font-light">
                  Visionary Artist
                </p>
              </div>
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed font-light">
                <p>
                  Mónica Esgueva has traveled extensively, living in Spain, Paris,
                  Tanzania, and India, experiences that have deeply influenced her
                  artistic vision. She currently resides in Madrid, Spain, where she
                  continues to create and share her visionary art with the world.
                </p>
                <p>
                  Her artistic journey began in childhood, and she is largely
                  self-taught, though she has also received formal training. Her
                  early exhibitions marked the beginning of an international presence
                  that has since expanded across the globe. Her work has been
                  exhibited in numerous countries including the USA, Canada, Holland,
                  Great Britain, France, Costa Rica, Greece, Italy, and Spain.
                </p>
                <p>
                  Her paintings have been featured in prestigious institutions such
                  as the Rochester Museum of Fine Arts, Museum of Modern Art,
                  Latinamerican Art Museum, Art Connection in the Capital Region,
                  Rodem-Packard Foundation, Museo de Arte Contemporáneo de Zazuela
                  del Monte, and Museo Casa Orduna.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm md:aspect-square"
            >
              <Image
                src="/monica-esgueva-about-homepage.jpg"
                alt="Mónica Esgueva"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Artist's Role Section */}
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
              <Image
                src="/monica-esgueva-about-with-paitings.jpg"
                alt="Mónica Esgueva in her studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <blockquote className="text-muted-foreground border-l-4 border-primary pl-6 text-xl font-light italic md:text-2xl">
                &quot;The artists&apos; role is to be a leader and a visionary: Not
                only think outside the box, but to be outside the box, contributing
                to the change we want to see in the world.&quot;
              </blockquote>
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed font-light">
                <p>
                  We are all interconnected, and through our creative acts, we have
                  the potential to influence and transform reality itself. Each
                  individual carries within them the power to shape the world
                  through their unique expression and vision.
                </p>
                <p>
                  Art serves as a powerful medium for communication, transcending
                  language barriers and cultural differences. Through visual
                  expression, we can convey messages of hope, love, and a
                  transformed view of liberation that speaks directly to the human
                  spirit.
                </p>
                <p>
                  My works offer a glimpse of immortal light and the mystery of the
                  universe, inviting viewers to explore the depths of their own
                  consciousness and discover the infinite possibilities that exist
                  beyond the material realm.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-background py-12 md:py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-4xl font-bold text-neutral-900 md:text-6xl">
              ∞
            </div>
            <p className="mx-auto text-xl font-light italic text-neutral-900 md:text-3xl">
              &quot;Life is the canvas we are given and the soul the palette of color
              which can give birth to great art.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visionary Art Explanation Section */}
      <section className="bg-background py-12 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed font-light">
                <p>
                  &quot;Visionary Art&quot; is a term coined by Carl Gustav Jung,
                  referring to art that transcends the physical world and explores
                  the multi-dimensions of being. This form of artistic expression
                  seeks to bridge the gap between the visible and invisible realms,
                  offering insights into the deeper layers of consciousness.
                </p>
                <p>
                  The artist&apos;s vision and perspective of the world are
                  fundamental to this practice. Through their unique lens, they
                  translate inner experiences, dreams, and spiritual insights into
                  visual form, creating works that resonate with universal truths.
                </p>
                <p>
                  Understanding the artist&apos;s posture and vision is essential to
                  fully appreciate the depth and meaning of visionary art. It
                  requires an openness to explore beyond the surface and engage with
                  the symbolic and transformative power of the work.
                </p>
                <blockquote className="text-muted-foreground border-l-4 border-primary pl-6 text-base font-light italic">
                  &quot;Our most useful is the only true source of meaning and
                  purpose we have. Art is the way to discover for ourselves and
                  others, by opening this door to the inner life.&quot; - P. Rubinos
                  Jacobson.
                </blockquote>
                <p>
                  Integral visionary art seeks to explore the boundaries of human
                  experience, offering new perspectives and expanding
                  consciousness. It invites viewers to question their assumptions,
                  transcend limiting beliefs, and connect with the infinite
                  potential that exists within and around them.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/nebula-about.jpg"
                  alt="Nebula - Acrylic on canvas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-muted-foreground text-center text-sm">
                &quot;Nebula&quot; - Acrylic on canvas
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-6 text-xs tracking-widest uppercase"
          >
            <Link href="/collections">EXPLORE MÓNICA&apos;S ARTWORK</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
