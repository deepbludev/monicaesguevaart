import { getPainting } from '@/features/admin/paintings/actions/paintings'
import { getAllCollectionsForAdmin as getCollections } from '@/features/admin/collections/actions/collections'
import { notFound } from 'next/navigation'
import { PaintingForm } from '@/features/admin/paintings/components/painting-form'

export default async function EditPaintingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const painting = await getPainting(id)
  const collections = await getCollections()

  if (!painting) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PaintingForm
        painting={painting}
        paintingId={painting.id}
        collections={collections}
      />
    </div>
  )
}

