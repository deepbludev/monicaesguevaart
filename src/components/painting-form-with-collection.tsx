'use client'

import { useState, useRef } from 'react'
import { useActionState } from 'react'
import { createPaintingStandalone } from '@/actions/paintings'
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
import Image from 'next/image'

interface Collection {
  id: string
  title: string
}

export function PaintingFormWithCollection({
  collections,
}: {
  collections: Collection[]
}) {
  const [collectionId, setCollectionId] = useState<string>(
    collections[0]?.id || '',
  )
  const [showCollectionError, setShowCollectionError] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const action = createPaintingStandalone.bind(null, collectionId)
  const [state, formAction] = useActionState(action, undefined)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!validTypes.includes(file.type)) {
        alert(
          'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.',
        )
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        return
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        return
      }

      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/paintings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <CardTitle>New Painting</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}
          className="space-y-4"
          encType="multipart/form-data"
        >
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
            {showCollectionError && !collectionId && (
              <p className="text-sm text-red-500">Please select a collection</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" required />
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
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medium">Medium</Label>
              <Input id="medium" name="medium" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input id="size" name="size" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input id="order" name="order" type="number" defaultValue={0} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image *</Label>
            <Input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="cursor-pointer"
              required
            />
            <p className="text-muted-foreground text-sm">
              Upload an image file (JPEG, PNG, WebP, or GIF, max 10MB)
            </p>
            {state?.errors?.imageUrl && (
              <p className="text-sm text-red-500">{state.errors.imageUrl}</p>
            )}
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Fallback: Image URL input (hidden but kept for backward compatibility) */}
          <input type="hidden" name="imageUrl" value="" />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              name="available"
              defaultChecked={true}
              className="h-4 w-4"
            />
            <Label htmlFor="available">Available</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              onClick={(e) => {
                if (!collectionId) {
                  e.preventDefault()
                  setShowCollectionError(true)
                }
              }}
            >
              Create
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
