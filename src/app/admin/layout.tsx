import { AdminSidebar } from '@/components/admin-sidebar'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex w-full flex-1">
        <AdminSidebar />
        <main className="flex-1 p-8 pt-28">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
