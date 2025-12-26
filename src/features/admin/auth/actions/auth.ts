'use server'

import { createSession } from '@/lib/session'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data

  const admin = await prisma.admin.findUnique({
    where: { email },
  })

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return {
      message: 'Invalid email or password',
    }
  }

  await createSession(admin.id)
  redirect('/admin/dashboard')
}

export async function logout() {
  const { deleteSession } = await import('@/lib/session')
  await deleteSession()
}
