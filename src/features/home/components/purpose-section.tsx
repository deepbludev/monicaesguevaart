import { Sparkles, Eye, Zap, Heart, Anchor } from 'lucide-react'

const purposes = [
  { icon: Eye, label: 'Opening intuitive channels' },
  { icon: Zap, label: 'Activating dormant DNA' },
  { icon: Sparkles, label: 'Clearing emotional residues' },
  { icon: Heart, label: 'Expanding the heart field' },
  { icon: Anchor, label: 'Anchoring higher frequencies' },
]

export function PurposeSection() {
  return (
    <section className="bg-secondary/30 relative overflow-hidden py-24 md:py-32">
      {/* Decorative background elements could go here */}
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-primary mb-8 font-serif text-4xl md:text-5xl">
          The Purpose of This Art
        </h2>

        <div className="mx-auto max-w-4xl space-y-12">
          <p className="text-xl leading-relaxed font-light md:text-2xl">
            A visual language transmitted through intuition, silence, and the
            unseen. Each painting carries a specific vibration designed to{' '}
            <span className="text-primary font-medium">
              support the awakening process
            </span>
            .
          </p>

          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {purposes.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="border-border/50 bg-background/50 hover:bg-background group flex flex-col items-center gap-4 rounded-xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="bg-secondary text-primary rounded-full p-4 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-lg font-medium tracking-wide">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="text-muted-foreground pt-8 font-serif text-lg italic md:text-3xl">
            &quot;This is art as energetic technology — a bridge between
            worlds&quot;
          </p>
        </div>
      </div>
    </section>
  )
}
