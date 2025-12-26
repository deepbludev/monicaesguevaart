'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { togglePaintingAvailable } from '../actions/paintings'
import { Checkbox } from '@/components/atoms/checkbox'

interface ToggleAvailableProps {
  paintingId: string
  available: boolean
  label?: string
  showLabel?: boolean
}

export function ToggleAvailable({
  paintingId,
  available,
  label,
  showLabel = false,
}: ToggleAvailableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault()
    if (isPending) return
    
    const formData = new FormData()
    formData.append('paintingId', paintingId)
    
    startTransition(async () => {
      await togglePaintingAvailable(formData)
      router.refresh()
    })
  }

  return (
    <form id={`form-toggle-${paintingId}`} onSubmit={(e) => e.preventDefault()}>
      <input type="hidden" name="paintingId" value={paintingId} />
      <label
        className={`${showLabel ? 'flex cursor-pointer items-center gap-2' : 'cursor-pointer'}`}
        htmlFor={`checkbox-toggle-${paintingId}`}
        title={available ? 'Mark as unavailable' : 'Mark as available'}
        onClick={handleToggle}
      >
        <Checkbox
          id={`checkbox-toggle-${paintingId}`}
          checked={available}
          disabled={isPending}
        />
        {showLabel && label && <span className="text-xs">{label}</span>}
      </label>
    </form>
  )
}

