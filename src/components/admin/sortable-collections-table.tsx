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
import { Trash, Edit, Images, GripVertical } from 'lucide-react'
import { deleteCollection, reorderCollections } from '@/actions/collections'
import { useState } from 'react'

type Collection = {
  id: string
  title: string
  slug: string
  medium?: string | null
  order: number
  _count: { paintings: number }
}

interface SortableCollectionsTableProps {
  collections: Collection[]
}

function SortableRow({ collection }: { collection: Collection }) {
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
          <span>{collection.order}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{collection.title}</TableCell>
      <TableCell>{collection.slug}</TableCell>
      <TableCell>{collection.medium || '-'}</TableCell>
      <TableCell>{collection._count.paintings}</TableCell>
      <TableCell className="space-x-2 text-right">
        <Button variant="ghost" size="icon" asChild>
          <Link
            href={`/admin/collections/${collection.id}/paintings`}
            title="Manage Paintings"
          >
            <Images className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
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
            className="text-red-500 hover:text-red-600"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </form>
      </TableCell>
    </TableRow>
  )
}

export function SortableCollectionsTable({
  collections: initialCollections,
}: SortableCollectionsTableProps) {
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Medium</TableHead>
              <TableHead>Paintings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext
              items={collections.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {collections.map((collection) => (
                <SortableRow key={collection.id} collection={collection} />
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </div>
    </DndContext>
  )
}
