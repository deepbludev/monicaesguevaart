import Link from 'next/link'
import { getAllCollectionsForAdmin } from '@/actions/collections'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CollectionsView } from '@/components/admin/collections-view'

export default async function CollectionsPage() {
  const collections = await getAllCollectionsForAdmin()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Collections</h1>
        <Button asChild>
          <Link href="/admin/collections/new">
            <Plus className="mr-2 h-4 w-4" />
            New Collection
          </Link>
        </Button>
      </div>

      <CollectionsView collections={collections} />
    </div>
  )
}
