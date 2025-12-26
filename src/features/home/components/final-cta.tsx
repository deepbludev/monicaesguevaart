import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/atoms/button'

export function FinalCTA() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-48 text-center md:py-64">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/central-sun-cta.jpg"
          alt="Central Sun"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto w-full max-w-4xl space-y-8 px-6">
        <h2 className="font-serif text-4xl text-white md:text-6xl">
          Ready to Work with the Codes?
        </h2>
        <p className="text-xl font-light text-white/90 md:text-2xl">
          Choose the piece that calls your soul.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
          <Button
            asChild
            className="bg-white px-8 py-6 tracking-widest text-black uppercase transition-all duration-300 hover:bg-white/90"
          >
            <Link href="/collections">Explore the Collections</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-white bg-white/10 px-8 py-6 tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          >
            <Link href="/contact">Contact Mónica</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
