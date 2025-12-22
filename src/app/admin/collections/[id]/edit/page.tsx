import { CollectionForm } from '@/components/collection-form'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function EditCollectionPage({
  params,
}: {
  params: { id: string }
}) {
  const collection = await prisma.collection.findUnique({
    where: { id: params.id },
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
