'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { uploadImage, deleteImage } from '@/lib/blob'

const prisma = new PrismaClient()

const paintingSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  medium: z.string().optional(),
  size: z.string().optional(),
  year: z.string().optional(),
  imageUrl: z.string().min(1).optional(),
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

export async function getAllPaintings(collectionId?: string, search?: string) {
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
    include: { collection: { select: { id: true, title: true, slug: true } } },
  })
}

export async function getPainting(id: string) {
  return await prisma.painting.findUnique({
    where: { id },
    include: { collection: { select: { id: true, title: true, slug: true } } },
  })
}

export async function createPainting(
  collectionId: string,
  prevState: unknown,
  formData: FormData,
  redirectTo: 'collection' | 'paintings' = 'collection',
) {
  const data = Object.fromEntries(formData)
  const available = data.available === 'on' || data.available === 'true'
  const imageFile = formData.get('image') as File | null

  let imageUrl = (data.imageUrl as string) || ''

  // Handle file upload if present
  if (imageFile && imageFile.size > 0) {
    const timestamp = Date.now()
    const filename = `paintings/${timestamp}-${imageFile.name}`
    const uploadResult = await uploadImage(imageFile, filename)

    if (uploadResult.error) {
      return {
        errors: { imageUrl: [uploadResult.error] },
      }
    }

    imageUrl = uploadResult.url
  }

  // Validate that we have an image URL
  if (!imageUrl) {
    return {
      errors: {
        imageUrl: [
          'Image is required. Please upload an image or provide an image URL.',
        ],
      },
    }
  }

  const parsed = paintingSchema
    .extend({
      available: z.boolean().default(true),
      order: z.coerce.number().default(0),
      imageUrl: z.string().min(1),
    })
    .safeParse({
      ...data,
      available,
      order: data.order,
      imageUrl,
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

  if (redirectTo === 'paintings') {
    redirect('/admin/paintings')
  } else {
    redirect(`/admin/collections/${collectionId}/paintings`)
  }
}

export async function updatePainting(
  paintingId: string,
  collectionId: string,
  prevState: unknown,
  formData: FormData,
  redirectTo: 'collection' | 'paintings' = 'collection',
) {
  const data = Object.fromEntries(formData)
  const available = data.available === 'on' || data.available === 'true'
  const imageFile = formData.get('image') as File | null

  // Get existing painting to check for old image URL
  const existingPainting = await prisma.painting.findUnique({
    where: { id: paintingId },
  })

  let imageUrl = existingPainting?.imageUrl || ''

  // Handle file upload if present
  if (imageFile && imageFile.size > 0) {
    const timestamp = Date.now()
    const filename = `paintings/${paintingId}-${timestamp}-${imageFile.name}`
    const uploadResult = await uploadImage(imageFile, filename)

    if (uploadResult.error) {
      return {
        errors: { imageUrl: [uploadResult.error] },
      }
    }

    imageUrl = uploadResult.url

    // Delete old blob if it exists and is a Vercel Blob URL
    if (existingPainting?.imageUrl) {
      await deleteImage(existingPainting.imageUrl)
    }
  } else {
    // No file uploaded, check if imageUrl was provided in form (fallback for URL input)
    const providedImageUrl = (data.imageUrl as string)?.trim() || ''
    if (providedImageUrl) {
      imageUrl = providedImageUrl
    }
  }

  // Validate that we have an image URL
  if (!imageUrl) {
    return {
      errors: {
        imageUrl: [
          'Image is required. Please upload an image or provide an image URL.',
        ],
      },
    }
  }

  const parsed = paintingSchema
    .extend({
      available: z.boolean().default(true),
      order: z.coerce.number().default(0),
      imageUrl: z.string().min(1),
    })
    .safeParse({
      ...data,
      available,
      order: data.order,
      imageUrl,
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

  revalidatePath(`/admin/collections/${collectionId}/paintings`)
  revalidatePath('/admin/paintings')

  if (redirectTo === 'paintings') {
    redirect('/admin/paintings')
  } else {
    redirect(`/admin/collections/${collectionId}/paintings`)
  }
}

export async function togglePaintingAvailable(
  formData: FormData,
): Promise<void> {
  const paintingId = formData.get('paintingId') as string

  if (!paintingId) {
    return
  }

  const painting = await prisma.painting.findUnique({
    where: { id: paintingId },
  })

  if (!painting) {
    return
  }

  await prisma.painting.update({
    where: { id: paintingId },
    data: { available: !painting.available },
  })

  revalidatePath(`/admin/collections/${painting.collectionId}/paintings`)
  revalidatePath('/admin/paintings')
}

export async function deletePainting(collectionId: string, paintingId: string) {
  await prisma.painting.delete({ where: { id: paintingId } })
  revalidatePath(`/admin/collections/${collectionId}/paintings`)
  revalidatePath('/admin/paintings')
}

export async function updatePaintingOrder(
  paintingId: string,
  newOrder: number,
) {
  const painting = await prisma.painting.findUnique({
    where: { id: paintingId },
    select: { collectionId: true },
  })

  if (!painting) {
    return { success: false, error: 'Painting not found' }
  }

  await prisma.painting.update({
    where: { id: paintingId },
    data: { order: newOrder },
  })

  revalidatePath(`/admin/collections/${painting.collectionId}/paintings`)
  revalidatePath('/admin/paintings')
  return { success: true }
}

export async function reorderPaintings(
  collectionId: string,
  orderedIds: string[],
) {
  try {
    // Verify all paintings belong to the collection
    const paintings = await prisma.painting.findMany({
      where: {
        id: { in: orderedIds },
        collectionId,
      },
      select: { id: true },
    })

    if (paintings.length !== orderedIds.length) {
      return {
        success: false,
        error: 'Some paintings do not belong to this collection',
      }
    }

    // Update all paintings with new order values based on their position in the array
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.painting.update({
          where: { id, collectionId },
          data: { order: index },
        }),
      ),
    )
    revalidatePath(`/admin/collections/${collectionId}/paintings`)
    revalidatePath('/admin/paintings')
    return { success: true }
  } catch (error) {
    console.error('Failed to reorder paintings:', error)
    return { success: false, error: 'Failed to reorder paintings' }
  }
}
