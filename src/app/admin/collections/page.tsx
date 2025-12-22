import Link from 'next/link'
import { getCollections, deleteCollection } from '@/actions/collections'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Trash, Edit, Images } from 'lucide-react'

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Collections</h1>
        <Button asChild>
          <Link href="/admin/collections/new">
            <Plus className="mr-2 h-4 w-4" />
            New Collection
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Paintings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell>{collection.order}</TableCell>
                <TableCell className="font-medium">{collection.title}</TableCell>
                <TableCell>{collection.slug}</TableCell>
                <TableCell>{collection._count.paintings}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/collections/${collection.id}/paintings`} title="Manage Paintings">
                       <Images className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/collections/${collection.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <form action={deleteCollection.bind(null, collection.id)} className="inline">
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
