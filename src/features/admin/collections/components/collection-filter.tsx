'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'

interface CollectionFilterProps {
  collections: { id: string; title: string }[]
  currentCollectionId?: string
}

export function CollectionFilter({
  collections,
  currentCollectionId,
}: CollectionFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('collection')
    } else {
      params.set('collection', value)
    }
    router.push(`/admin/paintings?${params.toString()}`)
  }

  return (
    <Select value={currentCollectionId || 'all'} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by collection" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Collections</SelectItem>
        {collections.map((collection) => (
          <SelectItem key={collection.id} value={collection.id}>
            {collection.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
