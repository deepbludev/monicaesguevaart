'use client'

import { useState } from 'react'
import { Painting, Collection } from '@prisma/client'
import {
  LayoutGrid,
  List as ListIcon,
  Edit,
  Trash,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { deletePainting } from '../actions/paintings'
import { ToggleAvailable } from './toggle-available'
import Image from 'next/image'

type PaintingWithCollection = Painting & {
  collection: Pick<Collection, 'id' | 'title' | 'slug'>
}

interface AllPaintingsViewProps {
  paintings: PaintingWithCollection[]
}

export function AllPaintingsView({ paintings }: AllPaintingsViewProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  // Track optimistic availability state for each painting
  const [availabilityState, setAvailabilityState] = useState<
    Record<string, boolean>
  >(() => {
    const state: Record<string, boolean> = {}
    paintings.forEach((p) => {
      state[p.id] = p.available
    })
    return state
  })

  const handleToggle = (paintingId: string) => (newValue: boolean) => {
    setAvailabilityState((prev) => ({
      ...prev,
      [paintingId]: newValue,
    }))
  }

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
        <div className="bg-card rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paintings.map((painting) => (
                <TableRow key={painting.id}>
                  <TableCell>{painting.order}</TableCell>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded">
                      <Image
                        src={painting.imageUrl}
                        alt={painting.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {painting.title}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/collections/${painting.collection.id}/paintings`}
                      className="text-primary hover:underline"
                    >
                      {painting.collection.title}
                    </Link>
                  </TableCell>
                  <TableCell>{painting.medium || '-'}</TableCell>
                  <TableCell>{painting.size}</TableCell>
                  <TableCell>
                    <ToggleAvailable
                      paintingId={painting.id}
                      available={painting.available}
                      onToggle={handleToggle(painting.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <PaintingActions
                      collectionId={painting.collectionId}
                      paintingId={painting.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {paintings.map((painting) => (
            <Card key={painting.id} className="overflow-hidden">
              <div className="bg-muted relative aspect-square">
                <Image
                  src={painting.imageUrl}
                  alt={painting.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {!(availabilityState[painting.id] ?? painting.available) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-white">
                    Sold / Unavailable
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-base">
                  {painting.title}
                </CardTitle>
                {painting.medium && (
                  <p className="text-muted-foreground text-xs">
                    {painting.medium}
                  </p>
                )}
              </CardHeader>
              <CardContent className="text-muted-foreground p-4 pt-0 text-sm">
                <Link
                  href={`/admin/collections/${painting.collection.id}/paintings`}
                  className="text-primary hover:underline"
                >
                  {painting.collection.title}
                </Link>
                <p>{painting.size}</p>
                <div className="mt-2 flex items-center gap-2">
                  <ToggleAvailable
                    paintingId={painting.id}
                    available={painting.available}
                    label="Available"
                    showLabel
                    onToggle={handleToggle(painting.id)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <span className="text-muted-foreground text-xs">
                  Order: {painting.order}
                </span>
                <PaintingActions
                  collectionId={painting.collectionId}
                  paintingId={painting.id}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function PaintingActions({
  collectionId,
  paintingId,
}: {
  collectionId: string
  paintingId: string
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="h-8 w-8"
        title="View Public Page"
      >
        <Link
          href={`/paintings/${paintingId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="h-8 w-8"
        title="Edit"
      >
        <Link href={`/admin/paintings/${paintingId}/edit`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <form
        action={deletePainting.bind(null, collectionId, paintingId)}
        className="inline"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
          title="Delete"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
