'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/atoms/accordion'

export function FAQSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary mb-12 text-center font-serif text-4xl">
            FAQ — Understanding the Energy Behind This Art
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="channeled">
              <AccordionTrigger className="font-serif text-lg md:text-xl">
                Are these paintings channeled?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>
                  Yes — but not in the simplistic sense often associated with
                  the word.
                </p>
                <p>
                  The paintings arise from states of expanded awareness, where
                  the rational mind quiets and a higher intelligence becomes
                  perceptible.
                </p>
                <p>
                  In these states, I receive impressions, geometries, colors,
                  and energetic architectures that do not originate from
                  thought, emotion, or personal imagination. They arrive as
                  transmissions — subtle, luminous instructions translated into
                  form.
                </p>
                <p>
                  Some call this channeling. I experience it as collaboration
                  with the Higher Realms, where my role is to render into
                  matter what already exists in the realm of spirit.
                </p>
                <p>
                  The result is not merely a painting, but a living field of
                  consciousness.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="activations">
              <AccordionTrigger className="font-serif text-lg md:text-xl">
                How do activations happen?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>
                  Activations occur through resonance — a vibrational meeting
                  between the codes in the painting and the deeper layers of
                  your consciousness.
                </p>
                <p>
                  This exchange does not rely on thought or analysis. In fact,
                  the rational mind is often the last to understand what is
                  happening.
                </p>
                <p>
                  When you connect with a piece, its frequency interacts with
                  your subtle body, awakening memory, intuition, and new fields
                  of perception. For some, the shift is immediate; for others,
                  it unfolds quietly over hours or days, like a seed
                  germinating beneath the soil.
                </p>
                <p>You may notice:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>warmth or tingling in the body</li>
                  <li>emotions surfacing or releasing</li>
                  <li>sudden clarity or a soft inner knowing</li>
                  <li>a shift in breath, posture, or heart space</li>
                  <li>a sense of peace, expansion, or recognition</li>
                  <li>
                    or simply that you feel different without being able to
                    explain why
                  </li>
                </ul>
                <p>
                  Not all activations are felt in the moment — some bypass
                  sensation entirely and begin integrating in the unconscious,
                  reshaping your inner landscape over time.
                </p>
                <p>
                  The activation happens organically. Your soul knows how to
                  receive what it needs, in the exact way and timing that
                  supports your highest evolution.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="5d-consciousness">
              <AccordionTrigger className="font-serif text-lg md:text-xl">
                What is 5D consciousness in practical terms?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>
                  5D is not a destination — it is a frequency of awareness. A
                  shift from fear to trust, from separation to unity, from
                  ego-driven perception to soul-centered clarity.
                </p>
                <p>In everyday life, it often feels like:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>More heart-centered clarity</strong> — less
                    reactivity, more compassion.
                  </li>
                  <li>
                    <strong>A sense of inner spaciousness</strong> — thoughts
                    soften, and intuition leads.
                  </li>
                  <li>
                    <strong>Greater sovereignty</strong> — you stop following
                    conditioned beliefs and begin acting from your own inner
                    truth.
                  </li>
                  <li>
                    <strong>Creator consciousness</strong> — you move from
                    feeling controlled by the matrix to consciously shaping
                    your reality.
                  </li>
                  <li>
                    <strong>Forgiveness replacing resentment</strong> — old
                    emotional burdens dissolve as the heart opens.
                  </li>
                  <li>
                    <strong>Understanding instead of judgment</strong> —
                    people and situations are seen from a wider, kinder
                    perspective.
                  </li>
                  <li>
                    <strong>
                      Feeling connected to something larger, wiser, and loving
                    </strong>{' '}
                    — a steady awareness of guidance and inner support.
                  </li>
                  <li>
                    <strong>Emotional freedom</strong> — dense patterns lose
                    hold and transmute more easily.
                  </li>
                  <li>
                    <strong>Synchronicities increase</strong> — life begins
                    to feel guided and coherent from a higher intelligence.
                  </li>
                </ul>
                <p>
                  In 5D consciousness, your inner world becomes lighter,
                  clearer, and more aligned with your truth. You begin
                  operating from your higher Self, not from old survival
                  conditioning.
                </p>
                <p>
                  These paintings are designed to support this shift — gently,
                  deeply, and in perfect alignment with your soul&apos;s
                  timing.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prints">
              <AccordionTrigger className="font-serif text-lg md:text-xl">
                Are prints available?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>Yes.</p>
                <p>
                  Each print is created with great care so that the vibrational
                  integrity of the original work is preserved as faithfully as
                  possible.
                </p>
                <p>
                  While the energy of a print is gentler than that of the
                  original painting, it still carries the frequency, intention,
                  and transmission of the piece.
                </p>
                <p>
                  Prints are ideal for those who feel called to the work but
                  are not yet ready or able to acquire an original.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="originals">
              <AccordionTrigger className="font-serif text-lg md:text-xl">
                Are original paintings for sale?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>Originals are available by inquiry only.</p>
                <p>
                  Because of where I currently live (and the energetic nature
                  of the work), shipping originals requires special handling
                  and is considered on a case-by-case basis.
                </p>
                <p>
                  If a piece calls you deeply, you may contact us to explore
                  availability, pricing, and possibilities.
                </p>
                <p>
                  Not everyone is meant to own an original — they choose their
                  guardians.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="commissions">
              <AccordionTrigger className="font-serif text-lg md:text-xl">
                Do you accept commissions?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>On rare occasions, yes.</p>
                <p>
                  If a soul-specific transmission wishes to be created for you,
                  I will feel it immediately.
                </p>
                <p>
                  Commissioned works are not decorative; they are energetic
                  blueprints aligned with your unique frequency, your path of
                  awakening, and the transformation you are calling into your
                  life.
                </p>
                <p>
                  To inquire, you may express your intention. If the field
                  opens, the painting will come through.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="choosing">
              <AccordionTrigger className="font-serif text-lg md:text-xl">
                How do I choose the right painting for me?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>
                  You do not choose the painting — the painting chooses you.
                </p>
                <p>Allow yourself to feel rather than think.</p>
                <p>Signs of a true resonance include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>a pull in the chest or solar plexus</li>
                  <li>
                    a sense of familiarity, as if you already know the piece
                  </li>
                  <li>an inner &quot;yes&quot; that is quiet but undeniable</li>
                  <li>a subtle shift in your energy when you look at it</li>
                  <li>the sense that it is speaking to you</li>
                </ul>
                <p>
                  Trust the intelligence of your body and soul. They recognize
                  the codes long before the mind understands them.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
