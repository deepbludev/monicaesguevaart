import { HeroSection } from '@/features/home/components/hero-section'
import { ExperienceSection } from '@/features/home/components/experience-section'
import { PurposeSection } from '@/features/home/components/purpose-section'
import { FeaturedCollections } from '@/features/home/components/featured-collections'

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
