'use client'

import { useActionState } from 'react'
import { createCollection, updateCollection } from '@/actions/collections'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea' // Need to add textarea
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// I need to install textarea component. I'll stick to Input for now or add textarea later.
// I'll assume Textarea is available or use standard <textarea> styled with Tailwind.
// Actually, I should install textarea component or just use Input for description if short, but description is long.
// I'll usage standard textarea with shadcn class 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

export function CollectionForm({ collection }: { collection?: any }) {
  const isEdit = !!collection
  const action = isEdit ? updateCollection.bind(null, collection.id) : createCollection
  const [state, formAction] = useActionState(action, undefined)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Collection' : 'New Collection'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={collection?.title} required />
            {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={collection?.slug} required />
            {state?.errors?.slug && <p className="text-red-500 text-sm">{state.errors.slug}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input id="order" name="order" type="number" defaultValue={collection?.order || 0} required />
            {state?.errors?.order && <p className="text-red-500 text-sm">{state.errors.order}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={collection?.tagline} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={collection?.description}
              required
            />
            {state?.errors?.description && <p className="text-red-500 text-sm">{state.errors.description}</p>}
          </div>

          {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}

          <div className="flex justify-end gap-2">
            <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
