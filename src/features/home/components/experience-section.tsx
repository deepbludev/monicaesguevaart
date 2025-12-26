'use client'

import Image from 'next/image'

export function ExperienceSection() {
  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden py-32 text-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/experience.jpg"
          alt="Experience background"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto max-w-3xl space-y-12 px-6">
        <h2 className="font-serif text-4xl md:text-5xl">
          How to Receive the Transmission
        </h2>

        <p className="text-xl font-light italic opacity-90 md:text-2xl">
          &quot;These works are not meant to be consumed quickly. They are meant
          to be felt.&quot;
        </p>

        <div className="flex flex-col gap-6 text-lg tracking-wide opacity-80">
          <p>Take a breath.</p>
          <p>Soften your gaze.</p>
          <p>Let the painting meet you.</p>
          <p>Notice what shifts — in your breath, your emotions, your field.</p>
        </div>

        <p className="pt-8 font-serif text-2xl">
          This is communion. Every communion is different.
        </p>
      </div>
    </section>
  )
}
