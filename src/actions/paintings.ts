'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const prisma = new PrismaClient()

const paintingSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  medium: z.string().optional(),
  size: z.string().optional(),
  year: z.string().optional(),
  imageUrl: z.string().min(1),
  available: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  order: z.number().int().optional().default(0),
})

export async function getPaintings(collectionId: string) {
  return await prisma.painting.findMany({
    where: { collectionId },
    orderBy: { order: 'asc' },
  })
}

export async function getAllPaintings(
  collectionId?: string,
  search?: string,
) {
  const where: {
    collectionId?: string
    title?: { contains: string }
  } = {}

  if (collectionId) {
    where.collectionId = collectionId
  }

  if (search) {
    where.title = { contains: search }
  }

  return await prisma.painting.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    orderBy: [{ collection: { order: 'asc' } }, { order: 'asc' }],
    include: { collection: { select: { id: true, title: true } } },
  })
}

export async function getPainting(id: string) {
  return await prisma.painting.findUnique({ where: { id } })
}

export async function createPainting(
  collectionId: string,
  prevState: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData)
  const available = data.available === 'on' || data.available === 'true'

  const parsed = paintingSchema
    .extend({
      available: z.boolean().default(true),
      order: z.coerce.number().default(0),
    })
    .safeParse({
      ...data,
      available,
      order: data.order,
    })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.painting.create({
    data: {
      ...parsed.data,
      collectionId,
    },
  })

  revalidatePath(`/admin/collections/${collectionId}/paintings`)
  revalidatePath('/admin/paintings')
  redirect(`/admin/collections/${collectionId}/paintings`)
}

export async function createPaintingStandalone(
  collectionId: string,
  prevState: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData)
  const available = data.available === 'on' || data.available === 'true'

  const parsed = paintingSchema
    .extend({
      available: z.boolean().default(true),
      order: z.coerce.number().default(0),
    })
    .safeParse({
      ...data,
      available,
      order: data.order,
    })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.painting.create({
    data: {
      ...parsed.data,
      collectionId,
    },
  })

  revalidatePath(`/admin/collections/${collectionId}/paintings`)
  revalidatePath('/admin/paintings')
  redirect('/admin/paintings')
}

export async function updatePainting(
  collectionId: string,
  paintingId: string,
  prevState: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData)
  const available = data.available === 'on' || data.available === 'true'

  const parsed = paintingSchema
    .extend({
      available: z.boolean().default(true),
      order: z.coerce.number().default(0),
    })
    .safeParse({
      ...data,
      available,
      order: data.order,
    })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.painting.update({
    where: { id: paintingId },
    data: parsed.data,
  })

  revalidatePath(`/admin/collections/${collectionId}/paintings`)
  revalidatePath('/admin/paintings')
  redirect(`/admin/collections/${collectionId}/paintings`)
}

export async function updatePaintingStandalone(
  paintingId: string,
  collectionId: string,
  prevState: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData)
  const available = data.available === 'on' || data.available === 'true'

  const parsed = paintingSchema
    .extend({
      available: z.boolean().default(true),
      order: z.coerce.number().default(0),
    })
    .safeParse({
      ...data,
      available,
      order: data.order,
    })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.painting.update({
    where: { id: paintingId },
    data: {
      ...parsed.data,
      collectionId,
    },
  })

  revalidatePath('/admin/paintings')
  revalidatePath(`/admin/collections/${collectionId}/paintings`)
  redirect('/admin/paintings')
}

export async function deletePainting(collectionId: string, paintingId: string) {
  await prisma.painting.delete({ where: { id: paintingId } })
  revalidatePath(`/admin/collections/${collectionId}/paintings`)
  revalidatePath('/admin/paintings')
}
