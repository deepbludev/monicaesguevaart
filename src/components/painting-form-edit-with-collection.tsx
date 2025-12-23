'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { updatePaintingStandalone } from '@/actions/paintings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Painting } from '@prisma/client'

interface Collection {
  id: string
  title: string
}

export function PaintingFormEditWithCollection({
  painting,
  collections,
}: {
  painting: Painting
  collections: Collection[]
}) {
  const [collectionId, setCollectionId] = useState<string>(
    painting.collectionId,
  )

  const action = updatePaintingStandalone.bind(null, painting.id, collectionId)
  const [state, formAction] = useActionState(action, undefined)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/paintings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <CardTitle>Edit Painting</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="collection">Collection *</Label>
            <Select value={collectionId} onValueChange={setCollectionId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                    {collection.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={painting.title}
              required
            />
            {state?.errors?.title && (
              <p className="text-sm text-red-500">{state.errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              className="min-h-[100px]"
              defaultValue={painting.description || ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medium">Medium</Label>
              <Input
                id="medium"
                name="medium"
                defaultValue={painting.medium || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input id="size" name="size" defaultValue={painting.size || ''} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" defaultValue={painting.year || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                defaultValue={painting.order || 0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL *</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={painting.imageUrl}
              required
            />
            {state?.errors?.imageUrl && (
              <p className="text-sm text-red-500">{state.errors.imageUrl}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              name="available"
              defaultChecked={painting.available ?? true}
              className="h-4 w-4"
            />
            <Label htmlFor="available">Available</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

