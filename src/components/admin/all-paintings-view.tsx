'use client'

import { useState } from 'react'
import { Painting, Collection } from '@prisma/client'
import { LayoutGrid, List as ListIcon, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { deletePainting } from '@/actions/paintings'
import Image from 'next/image'

type PaintingWithCollection = Painting & {
  collection: Pick<Collection, 'id' | 'title'>
}

interface AllPaintingsViewProps {
  paintings: PaintingWithCollection[]
}

export function AllPaintingsView({ paintings }: AllPaintingsViewProps) {
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
        <div className="bg-card rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Collection</TableHead>
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
                  <TableCell>{painting.size}</TableCell>
                  <TableCell>{painting.available ? 'Yes' : 'No'}</TableCell>
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
                {!painting.available && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-white">
                    Sold / Unavailable
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-base">
                  {painting.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground p-4 pt-0 text-sm">
                <Link
                  href={`/admin/collections/${painting.collection.id}/paintings`}
                  className="text-primary hover:underline"
                >
                  {painting.collection.title}
                </Link>
                <p>{painting.size}</p>
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
      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
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
        >
          <Trash className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
