'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/button'
import { useEffect, useRef } from 'react'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return

      const scrolled = window.scrollY
      const rate = scrolled * 0.5 // Parallax speed (adjust for more/less effect)

      imageRef.current.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 -top-[20%] -bottom-[20%]">
        <Image
          src="/hero.jpg"
          alt="Monica Esgueva Art"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <h1 className="font-serif text-5xl tracking-wider md:text-7xl lg:text-8xl">
            MONICA ESGUEVA
          </h1>
          <p className="text-lg font-light tracking-[0.2em] uppercase opacity-90 md:text-xl">
            Art that Speaks to the Soul
          </p>

          <div className="pt-8">
            <Button
              asChild
              size="lg"
              className="transform rounded-none bg-white px-8 py-6 text-sm tracking-[0.2em] text-black uppercase transition-all duration-300 hover:scale-105 hover:bg-white/90"
            >
              <Link href="/collections">Enter Gallery</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-16 w-px overflow-hidden bg-white/50">
          <div className="animate-pulldown h-full w-full origin-top bg-white" />
        </div>
      </motion.div>
    </section>
  )
}
