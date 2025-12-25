'use client'

import { useState } from 'react'
import { LayoutGrid, List as ListIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SortableCollectionsTable } from './sortable-collections-table'
import { SortableCollectionsGrid } from './sortable-collections-grid'

type Collection = {
  id: string
  title: string
  slug: string
  description: string
  tagline?: string | null
  imageUrl?: string | null
  order: number
  _count: { paintings: number }
}

interface CollectionsViewProps {
  collections: Collection[]
}

export function CollectionsView({ collections }: CollectionsViewProps) {
  const [view, setView] = useState<'grid' | 'list'>('list')

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="bg-muted/20 flex items-center space-x-1 rounded-md border p-1">
          <Button
            variant={view === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('grid')}
            className="h-8 w-8 p-0"
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('list')}
            className="h-8 w-8 p-0"
            title="List View"
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {collections.length === 0 ? (
        <div className="text-muted-foreground rounded-md border border-dashed p-8 text-center">
          No collections found. Add one to get started.
        </div>
      ) : view === 'list' ? (
        <SortableCollectionsTable collections={collections} />
      ) : (
        <SortableCollectionsGrid collections={collections} />
      )}
    </div>
  )
}

