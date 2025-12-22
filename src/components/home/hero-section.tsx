import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background - In real app, this would be an image or video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background z-0" />
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/000000/FFFFFF/png?text=Mystical+Art+Background')] bg-cover bg-center -z-10 opacity-60" />

      <div className="container relative z-10 px-6 text-center text-white space-y-8 animate-in fade-in duration-1000 slide-in-from-bottom-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight">
          Art as a Path of Awakening
        </h1>
        
        <p className="max-w-3xl mx-auto text-xl md:text-2xl font-light tracking-wide opacity-90">
          Paintings carrying coded frequencies to activate intuition, remembrance, and Ascension.
        </p>

        <p className="max-w-2xl mx-auto text-base md:text-lg opacity-80 italic">
          These works are living fields of energy. They speak directly to the soul, softening the veils of perception and opening pathways to higher consciousness.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full uppercase tracking-widest">
            <Link href="/collections">Enter the Collections</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-full uppercase tracking-widest backdrop-blur-sm">
            <Link href="/about">Experience the Transmission</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
