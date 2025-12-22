import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()

  if (!session.isAuth) {
    redirect('/admin/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
    </div>
  )
}
