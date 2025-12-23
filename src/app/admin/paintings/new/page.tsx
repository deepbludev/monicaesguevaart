import { getCollections } from '@/actions/collections'
import { PaintingFormWithCollection } from '@/components/painting-form-with-collection'

export default async function NewPaintingPage() {
  const collections = await getCollections()

  return (
    <div className="mx-auto max-w-2xl">
      <PaintingFormWithCollection collections={collections} />
    </div>
  )
}
