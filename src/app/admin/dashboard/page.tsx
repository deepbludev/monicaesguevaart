import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getDashboardStats as getCollectionStats } from '@/features/admin/collections/actions/collections'
import { getDashboardStats as getPaintingStats } from '@/features/admin/paintings/actions/paintings'
import { Button } from '@/components/atoms/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import {
  Plus,
  Images,
  Palette,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FolderOpen,
  Clock,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import Image from 'next/image'

export default async function DashboardPage() {
  const session = await verifySession()

  if (!session.isAuth) {
    redirect('/admin/login')
  }

  const [collectionStats, paintingStats] = await Promise.all([
    getCollectionStats(),
    getPaintingStats(),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your collections and paintings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
          >
            <Link href="/admin/collections/new">
              <Plus className="mr-2 h-4 w-4" />
              New Collection
            </Link>
          </Button>
          <Button
            asChild
            className="border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
          >
            <Link href="/admin/paintings/new">
              <Plus className="mr-2 h-4 w-4" />
              New Painting
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Images className="h-5 w-5" />
              Total Collections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {collectionStats.totalCount}
            </div>
            <Link
              href="/admin/collections"
              className="text-muted-foreground hover:text-primary mt-2 flex items-center gap-1 text-sm transition-colors"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Total Paintings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{paintingStats.totalCount}</div>
            <Link
              href="/admin/paintings"
              className="text-muted-foreground hover:text-primary mt-2 flex items-center gap-1 text-sm transition-colors"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Available
                </span>
                <span className="text-xl font-semibold">
                  {paintingStats.availableCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-red-600" />
                  Unavailable
                </span>
                <span className="text-xl font-semibold">
                  {paintingStats.unavailableCount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Paintings Per Medium */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Paintings Per Medium
            </CardTitle>
            <CardDescription>Breakdown by medium type</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(paintingStats.mediumBreakdown).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(paintingStats.mediumBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([medium, count]) => (
                    <div
                      key={medium}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{medium}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No paintings yet</p>
            )}
          </CardContent>
        </Card>

        {/* Top Collections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Collections
            </CardTitle>
            <CardDescription>Collections with most paintings</CardDescription>
          </CardHeader>
          <CardContent>
            {collectionStats.topCollections.length > 0 ? (
              <div className="space-y-3">
                {collectionStats.topCollections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/admin/collections/${collection.id}/paintings`}
                    className="hover:bg-accent flex items-center justify-between rounded-lg p-2 transition-colors"
                  >
                    <span className="text-sm">{collection.title}</span>
                    <span className="font-semibold">
                      {collection._count.paintings} painting
                      {collection._count.paintings !== 1 ? 's' : ''}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No collections yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Collections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Collections
            </CardTitle>
            <CardDescription>Last 5 created collections</CardDescription>
          </CardHeader>
          <CardContent>
            {collectionStats.recentCollections.length > 0 ? (
              <div className="space-y-3">
                {collectionStats.recentCollections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/admin/collections/${collection.id}/edit`}
                    className="hover:bg-accent flex items-center justify-between rounded-lg p-2 transition-colors"
                  >
                    <span className="text-sm">{collection.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No collections yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Paintings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Paintings
            </CardTitle>
            <CardDescription>Last 5 created paintings</CardDescription>
          </CardHeader>
          <CardContent>
            {paintingStats.recentPaintings.length > 0 ? (
              <div className="space-y-3">
                {paintingStats.recentPaintings.map((painting) => (
                  <Link
                    key={painting.id}
                    href={`/admin/paintings/${painting.id}/edit`}
                    className="hover:bg-accent flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
                      <Image
                        src={painting.imageUrl}
                        alt={painting.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {painting.title}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {painting.collection.title}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No paintings yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Empty Collections */}
      {collectionStats.emptyCollections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Empty Collections
            </CardTitle>
            <CardDescription>
              Collections without any paintings yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {collectionStats.emptyCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="hover:bg-accent flex items-center justify-between rounded-lg p-2 transition-colors"
                >
                  <span className="text-sm">{collection.title}</span>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`/admin/collections/${collection.id}/paintings/new`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Painting
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
