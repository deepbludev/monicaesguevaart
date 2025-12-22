export default function AboutPage() {
    return (
      <div className="bg-background min-h-screen pb-24">
          <section className="pt-32 pb-16 px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-serif text-primary mb-8">A Note From My Soul to Yours</h1>
              <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed font-light text-muted-foreground">
                  <p className="italic text-xl text-foreground">“Some truths cannot be spoken — only remembered.</p>
                  <p>Truths that live not in the mind but in the quiet, luminous chambers of the heart. My work is born from that place.</p>
                  <p>For years, I tried to fit into the art world’s expectations. But the paintings themselves refused to stay small. They whispered. They vibrated. They asked to be seen for what they truly are: Codes. Transmissions. Portals of light.</p>
                  <p>I paint when the veil thins. I paint when the guidance is clear. To stand before one of these works is to feel an activation.</p>
                  <p>This is not art for decoration. Is it art for transformation.</p>
                  <p>My mission is simple: to offer visual gateways that help you return to your highest expression — fully awake, fully embodied, fully aligned with your soul.”</p>
                  <p className="font-serif text-2xl pt-4 text-primary">Mónica Esgueva</p>
              </div>
          </section>
          
          <section className="bg-secondary/20 py-24">
              <div className="container mx-auto px-6 max-w-4xl grid md:grid-cols-2 gap-12 items-center">
                   <div className="relative aspect-[3/4] bg-gray-300 rounded-lg">
                       {/* Artist Image */}
                       <div className="absolute inset-0 bg-[url('https://placehold.co/600x800/222222/FFFFFF/png?text=Monica')] bg-cover bg-center rounded-lg" />
                   </div>
                   <div className="space-y-6">
                       <h2 className="text-3xl font-serif">About Mónica</h2>
                       <p className="leading-relaxed opacity-90">
                           Mónica Esgueva is a visionary artist and spiritual teacher whose life has been shaped by profound inner awareness since childhood.
                       </p>
                       <p className="leading-relaxed opacity-90">
                           Guided by an early knowing that her path belonged to the inner worlds, Mónica trained for many years with Tibetan lamas in India and Nepal, studied the nature of mind with recognized masters, and immersed herself in Eastern and Western traditions.
                       </p>
                       <p className="leading-relaxed opacity-90">
                           Each painting carries an intention: to activate dormant memory, elevate perception, and support the soul’s ascent into higher dimensions of awareness.
                       </p>
                   </div>
              </div>
          </section>
      </div>
    )
  }
