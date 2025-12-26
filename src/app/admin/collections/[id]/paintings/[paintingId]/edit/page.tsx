import { PaintingForm } from '@/features/admin/paintings/components/painting-form'
import { getPainting } from '@/features/admin/paintings/actions/paintings'
import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function EditPaintingPage({
  params,
}: {
  params: Promise<{ id: string; paintingId: string }>
}) {
  const { id, paintingId } = await params
  const painting = await getPainting(paintingId)
  const collection = await prisma.collection.findUnique({
    where: { id },
    select: { slug: true },
  })

  if (!painting || !collection) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Edit Painting</h1>
      <PaintingForm
        collectionId={id}
        painting={painting}
        paintingId={paintingId}
      />
    </div>
  )
}
