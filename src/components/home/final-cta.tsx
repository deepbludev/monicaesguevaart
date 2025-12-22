import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="py-32 bg-[url('https://placehold.co/1920x800/111111/444444/png?text=Cosmic+Sky')] bg-cover bg-center text-white text-center relative">
       <div className="absolute inset-0 bg-black/60" />
       
       <div className="container relative z-10 px-6 space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif">Ready to Work with the Codes?</h2>
            <p className="text-xl md:text-2xl font-light opacity-90">Choose the piece that calls your soul.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full uppercase tracking-widest">
                    <Link href="/collections">Explore the Collections</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-full uppercase tracking-widest">
                    <Link href="/contact">Contact Mónica</Link>
                </Button>
            </div>
       </div>
    </section>
  )
}
