import Link from 'next/link'
import { getPaintings } from '@/actions/paintings'
import { PrismaClient } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Plus, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PaintingsView } from '@/components/admin/paintings-view'

const prisma = new PrismaClient()

export default async function PaintingsPage({
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

  const paintings = await getPaintings(id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/collections">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Paintings: {collection.title}</h1>
        </div>
        <Button asChild>
          <Link href={`/admin/collections/${collection.id}/paintings/new`}>
            <Plus className="mr-2 h-4 w-4" />
            New Painting
          </Link>
        </Button>
      </div>

      <PaintingsView paintings={paintings} collectionId={collection.id} />
    </div>
  )
}
