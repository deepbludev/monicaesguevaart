'use client'

import { useState, useTransition } from 'react'
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
  available: initialAvailable,
  label,
  showLabel = false,
}: ToggleAvailableProps) {
  // Use local state for optimistic updates - initialize from prop but don't sync
  const [localAvailable, setLocalAvailable] = useState(initialAvailable)
  const [isPending, startTransition] = useTransition()

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault()
    if (isPending) return

    const newValue = !localAvailable
    // Optimistic update
    setLocalAvailable(newValue)

    const formData = new FormData()
    formData.append('paintingId', paintingId)

    startTransition(async () => {
      try {
        await togglePaintingAvailable(formData)
        // Server action updates the database
        // We don't revalidate to avoid re-render loops
        // The optimistic update provides immediate feedback
      } catch (error) {
        // Revert on error
        setLocalAvailable(initialAvailable)
        console.error('Failed to toggle painting availability:', error)
      }
    })
  }

  return (
    <form id={`form-toggle-${paintingId}`} onSubmit={(e) => e.preventDefault()}>
      <input type="hidden" name="paintingId" value={paintingId} />
      <label
        className={`${showLabel ? 'flex cursor-pointer items-center gap-2' : 'cursor-pointer'}`}
        htmlFor={`checkbox-toggle-${paintingId}`}
        title={localAvailable ? 'Mark as unavailable' : 'Mark as available'}
        onClick={handleToggle}
      >
        <Checkbox
          id={`checkbox-toggle-${paintingId}`}
          checked={localAvailable}
          disabled={isPending}
        />
        {showLabel && label && <span className="text-xs">{label}</span>}
      </label>
    </form>
  )
}
