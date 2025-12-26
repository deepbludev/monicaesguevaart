import { PaintingForm } from '@/features/admin/paintings/components/painting-form'

export default async function NewPaintingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Add Painting</h1>
      <PaintingForm collectionId={id} />
    </div>
  )
}
