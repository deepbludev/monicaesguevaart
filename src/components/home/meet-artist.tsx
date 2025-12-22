import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function MeetTheArtist() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative aspect-[3/4] md:aspect-square bg-gray-200 rounded-lg overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://placehold.co/800x800/333333/FFFFFF/png?text=Monica')] bg-cover bg-center" />
        </div>

        {/* Text */}
        <div className="space-y-6 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-serif text-primary">Meet Mónica</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
                Mónica Esgueva is a visionary artist and spiritual teacher whose work emerges from meditation, expanded awareness, and communion with higher realms. Born with remarkable spiritual sensitivity and artistic gifts, she has spent decades refining both her inner vision and her creative mastery.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
                Her paintings have been exhibited internationally and are recognized for their ability to activate, uplift, and awaken the soul.
            </p>
            <Button asChild className="uppercase tracking-widest px-8">
                <Link href="/about">Read My Story</Link>
            </Button>
        </div>
      </div>
    </section>
  )
}
