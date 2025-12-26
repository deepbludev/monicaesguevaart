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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Painting } from '@prisma/client'
import { Edit, Trash, ExternalLink, GripVertical } from 'lucide-react'
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
import { deletePainting, reorderPaintings } from '../actions/paintings'
import { ToggleAvailable } from './toggle-available'
import Image from 'next/image'
import { useState } from 'react'

interface SortablePaintingsListProps {
  paintings: Painting[]
  collectionId: string
}

function SortableRow({
  painting,
  collectionId,
}: {
  painting: Painting
  collectionId: string
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

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none active:cursor-grabbing"
            aria-label="Drag to reorder"
            suppressHydrationWarning
          >
            <GripVertical className="text-muted-foreground h-4 w-4" />
          </button>
          <span>{painting.order}</span>
        </div>
      </TableCell>
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
      <TableCell className="font-medium">{painting.title}</TableCell>
      <TableCell>{painting.medium || '-'}</TableCell>
      <TableCell>{painting.size}</TableCell>
      <TableCell>
        <ToggleAvailable
          paintingId={painting.id}
          available={painting.available}
        />
      </TableCell>
      <TableCell className="text-right">
        <PaintingActions collectionId={collectionId} paintingId={painting.id} />
      </TableCell>
    </TableRow>
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

export function SortablePaintingsList({
  paintings: initialPaintings,
  collectionId,
}: SortablePaintingsListProps) {
  const [paintings, setPaintings] = useState(initialPaintings)

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
      <div className="bg-card rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Medium</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext
              items={paintings.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {paintings.map((painting) => (
                <SortableRow
                  key={painting.id}
                  painting={painting}
                  collectionId={collectionId}
                />
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </div>
    </DndContext>
  )
}
