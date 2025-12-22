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
    <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        {/* Decorative background elements could go here */}
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-8 text-primary">
          The Purpose of This Art
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            A visual language transmitted through intuition, silence, and the unseen.
            Each painting carries a specific vibration designed to <span className="text-primary font-medium">support the awakening process</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {purposes.map((item, idx) => {
                const Icon = item.icon
                return (
                    <div key={idx} className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border/50 bg-background/50 hover:bg-background transition-all duration-500 hover:shadow-lg hover:-translate-y-1 group">
                        <div className="p-4 rounded-full bg-secondary text-primary group-hover:scale-110 transition-transform duration-500">
                             <Icon className="h-8 w-8" />
                        </div>
                        <span className="text-lg font-medium tracking-wide">{item.label}</span>
                    </div>
                )
            })}
          </div>

          <p className="text-lg md:text-xl font-serif italic text-muted-foreground pt-8">
            "This is art as energetic technology — a bridge between worlds."
          </p>
        </div>
      </div>
    </section>
  )
}
