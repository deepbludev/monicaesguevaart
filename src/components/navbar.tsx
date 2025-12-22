'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-background/80 backdrop-blur-md border-b text-foreground'
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif tracking-widest uppercase">
          Monica Esgueva
        </Link>
                
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="outline" asChild className="ml-4 uppercase text-xs tracking-widest">
            <Link href="/collections">View Gallery</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b shadow-lg p-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-serif tracking-wide text-center"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="w-full">
            <Link href="/collections" onClick={() => setIsOpen(false)}>View Gallery</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
