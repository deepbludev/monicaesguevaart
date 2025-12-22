import { HeroSection } from '@/components/home/hero-section'
import { ExperienceSection } from '@/components/home/experience-section'
import { PurposeSection } from '@/components/home/purpose-section'
import { FeaturedCollections } from '@/components/home/featured-collections'

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <PurposeSection />
      <FeaturedCollections />
      <ExperienceSection />
    </main>
  )
}
