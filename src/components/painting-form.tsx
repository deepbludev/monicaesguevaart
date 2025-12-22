'use client'

import { useActionState } from 'react'
import { createPainting, updatePainting } from '@/actions/paintings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Painting } from '@prisma/client'

export function PaintingForm({
  collectionId,
  painting,
}: {
  collectionId: string
  painting?: Painting
}) {
  const isEdit = !!painting
  const action = isEdit
    ? updatePainting.bind(null, collectionId, painting.id)
    : createPainting.bind(null, collectionId)

  const [state, formAction] = useActionState(action, undefined)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Painting' : 'New Painting'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={painting?.title}
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
              defaultValue={painting?.description || ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medium">Medium</Label>
              <Input
                id="medium"
                name="medium"
                defaultValue={painting?.medium || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                name="size"
                defaultValue={painting?.size || ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                defaultValue={painting?.year || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                defaultValue={painting?.order || 0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={painting?.imageUrl}
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
              defaultChecked={painting?.available ?? true}
              className="h-4 w-4"
            />
            <Label htmlFor="available">Available</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
