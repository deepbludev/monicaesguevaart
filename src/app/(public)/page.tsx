import { HeroSection } from '@/features/home/components/hero-section'
import { ExperienceSection } from '@/features/home/components/experience-section'
import { PurposeSection } from '@/features/home/components/purpose-section'
import { FeaturedCollections } from '@/features/home/components/featured-collections'
import { FAQSection } from '@/features/home/components/faq-section'
import { MeetTheArtist } from '@/features/home/components/meet-artist'
import { FinalCTA } from '@/features/home/components/final-cta'

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <FeaturedCollections />
      <MeetTheArtist />
      <PurposeSection />
      <ExperienceSection />
      <FAQSection />
      <FinalCTA />
    </main>
  )
}
