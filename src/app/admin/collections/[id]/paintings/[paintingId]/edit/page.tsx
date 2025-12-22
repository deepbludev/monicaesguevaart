import { PaintingForm } from '@/components/painting-form'
import { getPainting } from '@/actions/paintings'
import { notFound } from 'next/navigation'

export default async function EditPaintingPage({
  params,
}: {
  params: { id: string; paintingId: string }
}) {
  const painting = await getPainting(params.paintingId)

  if (!painting) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Edit Painting</h1>
      <PaintingForm collectionId={params.id} painting={painting} />
    </div>
  )
}
