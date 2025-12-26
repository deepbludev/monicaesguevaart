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
import { Painting } from '@prisma/client'
import { Edit, Trash, ExternalLink, GripVertical } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { deletePainting, reorderPaintings } from '../actions/paintings'
import { ToggleAvailable } from './toggle-available'
import Image from 'next/image'
import { useState } from 'react'

interface SortablePaintingsGridProps {
  paintings: Painting[]
  collectionId: string
}

function SortablePaintingCard({
  painting,
  collectionId,
  optimisticAvailable,
  onToggle,
}: {
  painting: Painting
  collectionId: string
  optimisticAvailable?: boolean
  onToggle?: (newValue: boolean) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: painting.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const isAvailable =
    optimisticAvailable !== undefined ? optimisticAvailable : painting.available

  return (
    <Card ref={setNodeRef} style={style} className="overflow-hidden">
      <div className="bg-muted relative aspect-square">
        <Image
          src={painting.imageUrl}
          alt={painting.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-white">
            Sold / Unavailable
          </div>
        )}
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
          {painting.title}
        </CardTitle>
        {painting.medium && (
          <p className="text-muted-foreground text-xs">{painting.medium}</p>
        )}
      </CardHeader>
      <CardContent className="text-muted-foreground p-4 pt-0 text-sm">
        <p>{painting.size}</p>
        <div className="mt-2 flex items-center gap-2">
          <ToggleAvailable
            paintingId={painting.id}
            available={painting.available}
            label="Available"
            showLabel
            onToggle={onToggle}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-muted-foreground text-xs">
          Order: {painting.order}
        </span>
        <PaintingActions collectionId={collectionId} paintingId={painting.id} />
      </CardFooter>
    </Card>
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
        <Link
          href={`/admin/collections/${collectionId}/paintings/${paintingId}/edit`}
        >
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

export function SortablePaintingsGrid({
  paintings: initialPaintings,
  collectionId,
}: SortablePaintingsGridProps) {
  const [paintings, setPaintings] = useState(initialPaintings)
  // Track optimistic availability state for each painting
  const [availabilityState, setAvailabilityState] = useState<
    Record<string, boolean>
  >(() => {
    const state: Record<string, boolean> = {}
    initialPaintings.forEach((p) => {
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

    const oldIndex = paintings.findIndex((p) => p.id === active.id)
    const newIndex = paintings.findIndex((p) => p.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const previousPaintings = paintings
    const newPaintings = arrayMove(paintings, oldIndex, newIndex)

    // Update order values in local state
    const updatedPaintings = newPaintings.map((p, index) => ({
      ...p,
      order: index,
    }))
    setPaintings(updatedPaintings)

    // Save to database
    const orderedIds = updatedPaintings.map((p) => p.id)
    const result = await reorderPaintings(collectionId, orderedIds)

    if (!result.success) {
      // Revert on error
      setPaintings(previousPaintings)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={paintings.map((p) => p.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {paintings.map((painting) => (
            <SortablePaintingCard
              key={painting.id}
              painting={painting}
              collectionId={collectionId}
              optimisticAvailable={availabilityState[painting.id]}
              onToggle={handleToggle(painting.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
