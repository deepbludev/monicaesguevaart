import { PaintingForm } from '@/components/painting-form'

export default function NewPaintingPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl mx-auto">
         <h1 className="text-2xl font-bold mb-6">Add Painting</h1>
      <PaintingForm collectionId={params.id} />
    </div>
  )
}
