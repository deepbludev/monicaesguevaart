import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  throw new Error(
    'SESSION_SECRET environment variable is required but not set. Please set it in your environment variables or .env file.',
  )
}
const key = new TextEncoder().encode(secretKey)

import { JWTPayload } from 'jose'

interface SessionPayload extends JWTPayload {
  userId: string
  expires: Date
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch {
    return null
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expires })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/admin/login')
  }

  return { isAuth: true, userId: session.userId }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/admin/login')
}
