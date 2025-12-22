import { HeroSection } from '@/components/home/hero-section'
import { PurposeSection } from '@/components/home/purpose-section'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { MeetTheArtist } from '@/components/home/meet-artist'
import { ExperienceSection } from '@/components/home/experience-section'
import { FAQSection } from '@/components/home/faq-section'
import { FinalCTA } from '@/components/home/final-cta'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PurposeSection />
      <FeaturedCollections />
      <MeetTheArtist />
      <ExperienceSection />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
