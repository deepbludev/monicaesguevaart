import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react' // Using generic icons for now

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6 flex flex-col items-center text-center gap-8">
        <h2 className="text-3xl font-serif italic">Art That Awakens the Soul</h2>
        
        <div className="flex gap-6">
          <Link href="/collections" className="text-sm tracking-widest hover:text-accent transition-colors">COLLECTIONS</Link>
          <Link href="/about" className="text-sm tracking-widest hover:text-accent transition-colors">ABOUT</Link>
          <Link href="/contact" className="text-sm tracking-widest hover:text-accent transition-colors">CONTACT</Link>
        </div>

        <div className="flex gap-4 mt-4">
          <a href="#" className="p-2 border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="mailto:contact@monicaesguevaart.com" className="p-2 border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <div className="text-xs opacity-60 mt-8">
          &copy; {new Date().getFullYear()} Monica Esgueva. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
