import { getCollections } from '@/actions/collections'
import { PaintingForm } from '@/components/painting-form'

export default async function NewPaintingPage() {
  const collections = await getCollections()

  return (
    <div className="mx-auto max-w-2xl">
      <PaintingForm collections={collections} />
    </div>
  )
}
