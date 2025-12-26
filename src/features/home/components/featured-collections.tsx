import { getFeaturedCollections } from '@/features/public/collections/actions/collections'
import { FeaturedCollectionsClient } from './featured-collections-client'

export async function FeaturedCollections() {
  const collections = await getFeaturedCollections()

  return <FeaturedCollectionsClient collections={collections} />
}
