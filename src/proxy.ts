import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

export async function proxy(request: NextRequest) {
  const protectedRoutes = ['/admin']
  const publicRoutes = ['/admin/login']
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  )
  const isPublicRoute = publicRoutes.includes(path)

  if (isProtectedRoute && !isPublicRoute) {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value
    const session = await decrypt(sessionCookie)

    if (!session?.userId) {
      return NextResponse.redirect(new URL('/admin/login', request.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
