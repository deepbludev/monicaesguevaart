import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()

  if (!session.isAuth) {
    redirect('/admin/login')
  }

  redirect('/admin/dashboard')
}

