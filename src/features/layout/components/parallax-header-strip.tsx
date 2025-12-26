'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'

interface ParallaxHeaderStripProps {
  src: string
  alt: string
  children?: ReactNode
}

export function ParallaxHeaderStrip({
  src,
  alt,
  children,
}: ParallaxHeaderStripProps) {
  const containerRef = useRef<HTMLDivElement>(null)
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
      className="relative h-[200px] w-full overflow-hidden md:h-[250px] lg:h-[300px]"
    >
      <div ref={imageRef} className="absolute inset-0 -top-[20%] -bottom-[20%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </section>
  )
}
