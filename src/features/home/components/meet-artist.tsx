import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/atoms/button'

export function MeetTheArtist() {
  return (
    <section className="bg-secondary/20 py-24">
      <div className="container mx-auto grid items-center gap-12 px-6 md:grid-cols-[1fr_2fr]">
        {/* Image */}
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-lg bg-gray-200">
          <Image
            src="/monica-esgueva-about-homepage.jpg"
            alt="Mónica Esgueva"
            fill
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Text */}
        <div className="space-y-6 md:pl-12">
          <h2 className="text-primary font-serif text-4xl md:text-5xl">
            Meet Mónica
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Mónica Esgueva is a visionary artist and spiritual teacher whose
            work emerges from meditation, expanded awareness, and communion with
            higher realms. Born with remarkable spiritual sensitivity and
            artistic gifts, she has spent decades refining both her inner vision
            and her creative mastery.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Her paintings have been exhibited internationally and are recognized
            for their ability to activate, uplift, and awaken the soul.
          </p>
          <Button asChild variant="outline" className="px-8 tracking-widest uppercase">
            <Link href="/about">Read My Story</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
