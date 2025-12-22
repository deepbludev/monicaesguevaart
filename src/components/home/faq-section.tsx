import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion'
  
  export function FAQSection() {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-serif text-center mb-12 text-primary">Understanding the Energy</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-serif">Are these paintings channeled?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Yes — but not in the simplistic sense often associated with the word.
                The paintings arise from states of expanded awareness, where the rational mind quiets and a higher intelligence becomes perceptible.
                In these states, I receive impressions, geometries, colors, and energetic architectures that do not originate from thought, emotion, or personal imagination.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-serif">How do activations happen?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Activations occur through resonance — a vibrational meeting between the codes in the painting and the deeper layers of your consciousness.
                This exchange does not rely on thought or analysis. When you connect with a piece, its frequency interacts with your subtle body, awakening memory, intuition, and new fields of perception.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-serif">What is 5D consciousness?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                5D is not a destination — it is a frequency of awareness. A shift from fear to trust, from separation to unity, from ego-driven perception to soul-centered clarity.
                In 5D consciousness, your inner world becomes lighter, clearer, and more aligned with your truth.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    )
  }
