'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // const [scrolled, setScrolled] = useState(false)

  return (
    <nav
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        'bg-background/80 text-foreground border-b backdrop-blur-md',
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/meart-logo-1200px.png"
            alt="Mónica Esgueva Art"
            width={200}
            height={60}
            className="h-auto w-auto max-h-12 object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary text-sm font-medium tracking-wide uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="outline"
            asChild
            className="ml-4 text-xs tracking-widest uppercase"
          >
            <Link href="/collections">View Gallery</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-background animate-in slide-in-from-top-5 absolute top-20 right-0 left-0 flex flex-col gap-6 border-b p-6 shadow-lg md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-center font-serif text-lg tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="w-full">
            <Link href="/collections" onClick={() => setIsOpen(false)}>
              View Gallery
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
