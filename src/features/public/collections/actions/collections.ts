'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getCollections() {
  return await prisma.collection.findMany({
    where: {
      paintings: {
        some: {},
      },
    },
    orderBy: { order: 'asc' },
    include: {
      paintings: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
  })
}

export async function getCollectionBySlug(slug: string) {
  return await prisma.collection.findUnique({
    where: { slug },
    include: { paintings: { orderBy: { order: 'asc' } } },
  })
}

