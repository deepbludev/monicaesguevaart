import Link from 'next/link'
import { getAllPaintings } from '@/features/admin/paintings/actions/paintings'
import { getAllCollectionsForAdmin as getCollections } from '@/features/admin/collections/actions/collections'
import { Button } from '@/components/atoms/button'
import { Plus } from 'lucide-react'
import { AllPaintingsView } from '@/features/admin/paintings/components/all-paintings-view'
import { CollectionFilter } from '@/features/admin/collections/components/collection-filter'
import { PaintingSearch } from '@/features/admin/paintings/components/painting-search'

export default async function PaintingsPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string; search?: string }>
}) {
  const { collection, search } = await searchParams
  const paintings = await getAllPaintings(collection, search)
  const collections = await getCollections()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Paintings</h1>
        <Button asChild>
          <Link href="/admin/paintings/new">
            <Plus className="mr-2 h-4 w-4" />
            New Painting
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <CollectionFilter
          collections={collections}
          currentCollectionId={collection}
        />
        <PaintingSearch currentSearch={search} />
        <span className="text-muted-foreground text-sm">
          {paintings.length} painting{paintings.length !== 1 ? 's' : ''}
        </span>
      </div>

      <AllPaintingsView paintings={paintings} />
    </div>
  )
}
