import { getPainting } from '@/actions/paintings'
import { getCollections } from '@/actions/collections'
import { notFound } from 'next/navigation'
import { PaintingForm } from '@/components/painting-form'

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

