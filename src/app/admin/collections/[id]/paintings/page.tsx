import Link from 'next/link'
import { getPaintings, deletePainting } from '@/actions/paintings'
import { PrismaClient } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Trash, Edit, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function PaintingsPage({
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

  const paintings = await getPaintings(params.id)

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paintings.map((painting) => (
              <TableRow key={painting.id}>
                <TableCell>{painting.order}</TableCell>
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="h-10 w-10 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{painting.title}</TableCell>
                <TableCell>{painting.size}</TableCell>
                <TableCell>{painting.available ? 'Yes' : 'No'}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={`/admin/collections/${collection.id}/paintings/${painting.id}/edit`}
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <form
                    action={deletePainting.bind(
                      null,
                      collection.id,
                      painting.id,
                    )}
                    className="inline"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {paintings.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground h-24 text-center"
                >
                  No paintings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
