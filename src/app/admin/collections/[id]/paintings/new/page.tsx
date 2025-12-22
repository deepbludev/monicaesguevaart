import { PaintingForm } from '@/components/painting-form'

export default function NewPaintingPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Add Painting</h1>
      <PaintingForm collectionId={params.id} />
    </div>
  )
}
