import { AdminSidebar } from '@/features/layout/components/admin-sidebar'
import { Navbar } from '@/features/layout/components/navbar'
import { Footer } from '@/features/layout/components/footer'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mt-20 flex h-[calc(100vh-5rem)] w-full">
        <AdminSidebar />
        <main className="flex-1 p-8 pt-28">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
