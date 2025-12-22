import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="relative bg-[url('https://placehold.co/1920x800/111111/444444/png?text=Cosmic+Sky')] bg-cover bg-center py-32 text-center text-white">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container space-y-8 px-6">
        <h2 className="font-serif text-4xl md:text-6xl">
          Ready to Work with the Codes?
        </h2>
        <p className="text-xl font-light opacity-90 md:text-2xl">
          Choose the piece that calls your soul.
        </p>

        <div className="flex flex-col justify-center gap-6 pt-8 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-8 py-6 text-lg tracking-widest text-black uppercase hover:bg-white/90"
          >
            <Link href="/collections">Explore the Collections</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white px-8 py-6 text-lg tracking-widest text-white uppercase hover:bg-white/10"
          >
            <Link href="/contact">Contact Mónica</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
