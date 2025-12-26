'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { Trash, Edit, Images, GripVertical } from 'lucide-react'
import { deleteCollection, reorderCollections } from '../actions/collections'
import { useState } from 'react'
import Image from 'next/image'

type Collection = {
  id: string
  title: string
  slug: string
  description: string
  tagline?: string | null
  medium?: string | null
  order: number
  _count: { paintings: number }
  paintings: { imageUrl: string }[]
}

interface SortableCollectionsGridProps {
  collections: Collection[]
}

function SortableCollectionCard({ collection }: { collection: Collection }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: collection.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} className="overflow-hidden">
      <div className="bg-muted relative aspect-3/4">
        <Image
          src={collection.paintings[0]?.imageUrl || '/meart-default.png'}
          alt={collection.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute top-2 left-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none rounded bg-black/50 p-1 text-white hover:bg-black/70 active:cursor-grabbing"
            aria-label="Drag to reorder"
            suppressHydrationWarning
          >
            <GripVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="line-clamp-1 text-base">
          {collection.title}
        </CardTitle>
        {collection.medium && (
          <p className="text-muted-foreground text-xs">{collection.medium}</p>
        )}
        {collection.tagline && (
          <p className="text-muted-foreground text-xs tracking-widest uppercase">
            {collection.tagline}
          </p>
        )}
      </CardHeader>
      <CardContent className="text-muted-foreground p-4 pt-0 text-sm">
        <p className="line-clamp-2">{collection.description}</p>
        <p className="mt-2 text-xs">Paintings: {collection._count.paintings}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-muted-foreground text-xs">
          Order: {collection.order}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link
              href={`/admin/collections/${collection.id}/paintings`}
              title="Manage Paintings"
            >
              <Images className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href={`/admin/collections/${collection.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <form
            action={deleteCollection.bind(null, collection.id)}
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
      </CardFooter>
    </Card>
  )
}

export function SortableCollectionsGrid({
  collections: initialCollections,
}: SortableCollectionsGridProps) {
  const [collections, setCollections] = useState(initialCollections)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = collections.findIndex((c) => c.id === active.id)
    const newIndex = collections.findIndex((c) => c.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const previousCollections = collections
    const newCollections = arrayMove(collections, oldIndex, newIndex)

    // Update order values in local state
    const updatedCollections = newCollections.map((c, index) => ({
      ...c,
      order: index,
    }))
    setCollections(updatedCollections)

    // Save to database
    const orderedIds = updatedCollections.map((c) => c.id)
    const result = await reorderCollections(orderedIds)

    if (!result.success) {
      // Revert on error
      setCollections(previousCollections)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={collections.map((c) => c.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {collections.map((collection) => (
            <SortableCollectionCard
              key={collection.id}
              collection={collection}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
