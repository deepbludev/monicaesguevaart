import { CollectionForm } from '@/features/admin/collections/components/collection-form'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const collection = await prisma.collection.findUnique({
    where: { id },
  })

  if (!collection) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <CollectionForm collection={collection} />
    </div>
  )
}
