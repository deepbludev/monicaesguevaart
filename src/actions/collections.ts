'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const prisma = new PrismaClient()

const collectionSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  tagline: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().int().optional().default(0),
})

export async function getCollections() {
  return await prisma.collection.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { paintings: true } } },
  })
}

export async function getCollectionBySlug(slug: string) {
  return await prisma.collection.findUnique({
    where: { slug },
    include: { paintings: { orderBy: { order: 'asc' } } },
  })
}

import { Prisma } from '@prisma/client'

export async function createCollection(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData)
  const parsed = collectionSchema.safeParse({
    ...data,
    order: Number(data.order),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.collection.create({
      data: parsed.data,
    })
  } catch (e: unknown) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return { message: 'Slug already exists' }
    }
    return { message: 'Failed to create collection' }
  }

  revalidatePath('/admin/collections')
  redirect('/admin/collections')
}

export async function updateCollection(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData)
  const parsed = collectionSchema.safeParse({
    ...data,
    order: Number(data.order),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.collection.update({
      where: { id },
      data: parsed.data,
    })
  } catch (e: unknown) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return { message: 'Slug already exists' }
    }
    return { message: 'Failed to update collection' }
  }

  revalidatePath('/admin/collections')
  redirect('/admin/collections')
}

export async function deleteCollection(id: string) {
  await prisma.collection.delete({ where: { id } })
  revalidatePath('/admin/collections')
}

export async function updateCollectionOrder(
  collectionId: string,
  newOrder: number,
) {
  await prisma.collection.update({
    where: { id: collectionId },
    data: { order: newOrder },
  })
  revalidatePath('/admin/collections')
  revalidatePath('/collections')
}

export async function reorderCollections(orderedIds: string[]) {
  try {
    // Update all collections with new order values based on their position in the array
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.collection.update({
          where: { id },
          data: { order: index },
        }),
      ),
    )
    revalidatePath('/admin/collections')
    revalidatePath('/collections')
    return { success: true }
  } catch (error) {
    console.error('Failed to reorder collections:', error)
    return { success: false, error: 'Failed to reorder collections' }
  }
}
