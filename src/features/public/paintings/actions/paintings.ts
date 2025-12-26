'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPainting(id: string) {
  return await prisma.painting.findUnique({
    where: { id },
    include: { collection: { select: { id: true, title: true, slug: true } } },
  })
}

