import { getAllCollectionsForAdmin as getCollections } from '@/features/admin/collections/actions/collections'
import { PaintingForm } from '@/features/admin/paintings/components/painting-form'

export default async function NewPaintingPage() {
  const collections = await getCollections()

  return (
    <div className="mx-auto max-w-2xl">
      <PaintingForm collections={collections} />
    </div>
  )
}
