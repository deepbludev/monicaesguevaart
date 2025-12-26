import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-neutral-50 py-12 dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6 md:col-span-2">
            <Link href="/" className="block">
              <Image
                src="/meart-logo.png"
                alt="Mónica Esgueva Art"
                width={250}
                height={75}
                className="h-auto max-h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground max-w-sm font-light">
              Sacred art that serves as a portal to higher dimensions. Helping
              you reconnect with your &apos;s essence.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Explore</h4>
            <nav className="text-muted-foreground flex flex-col gap-2 text-sm">
              <Link
                href="/collections"
                className="hover:text-primary transition-colors"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="hover:text-primary transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>

          {/* Social / Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Connect</h4>
            <nav className="text-muted-foreground flex flex-col gap-2 text-sm">
              <a
                href="https://instagram.com/monicaesguevaart"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center gap-2 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <Link
                href="/contact"
                className="hover:text-primary flex items-center gap-2 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="text-muted-foreground mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-xs tracking-wider uppercase md:flex-row dark:border-neutral-800">
          <p>&copy; {currentYear} Monica Esgueva. All rights reserved.</p>
          <p>Designed with Intent</p>
        </div>
      </div>
    </footer>
  )
}
