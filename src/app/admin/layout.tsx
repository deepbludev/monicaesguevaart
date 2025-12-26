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
      <div className="mt-20 flex w-full flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8 pt-12">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
