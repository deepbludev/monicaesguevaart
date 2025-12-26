'use client'

import { useState } from 'react'
import { Painting } from '@prisma/client'
import { LayoutGrid, List as ListIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { SortablePaintingsList } from './sortable-paintings-list'
import { SortablePaintingsGrid } from './sortable-paintings-grid'

interface PaintingsViewProps {
  paintings: Painting[]
  collectionId: string
}

export function PaintingsView({ paintings, collectionId }: PaintingsViewProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')

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

      {paintings.length === 0 ? (
        <div className="text-muted-foreground rounded-md border border-dashed p-8 text-center">
          No paintings found. Add one to get started.
        </div>
      ) : view === 'list' ? (
        <SortablePaintingsList paintings={paintings} collectionId={collectionId} />
      ) : (
        <SortablePaintingsGrid paintings={paintings} collectionId={collectionId} />
      )}
    </div>
  )
}
