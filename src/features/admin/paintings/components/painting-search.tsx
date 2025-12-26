'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/atoms/input'
import { Search } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface PaintingSearchProps {
  currentSearch?: string
}

export function PaintingSearch({ currentSearch }: PaintingSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSearch = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.push(`/admin/paintings?${params.toString()}`)
    }, 300)
  }

  return (
    <div className="relative w-full max-w-sm">
      <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder="Search by name..."
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}

