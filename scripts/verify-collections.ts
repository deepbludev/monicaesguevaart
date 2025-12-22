import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.info('Starting Collection CRUD verification...')

  // 1. Create
  const slug = 'test-collection-' + Date.now()
  console.info(`Creating collection with slug: ${slug}`)
  const created = await prisma.collection.create({
    data: {
      title: 'Test Collection',
      slug: slug,
      description: 'A test collection description.',
      tagline: 'Test Tagline',
      order: 100,
    },
  })
  console.info('Created:', created)

  // 2. Read
  console.info('Reading collection...')
  const read = await prisma.collection.findUnique({
    where: { id: created.id },
  })
  if (!read) throw new Error('Failed to read collection')
  console.info('Read:', read)

  // 3. Update
  console.info('Updating collection...')
  const updated = await prisma.collection.update({
    where: { id: created.id },
    data: { title: 'Updated Test Collection' },
  })
  if (updated.title !== 'Updated Test Collection')
    throw new Error('Failed to update collection')
  console.info('Updated:', updated)

  // 4. Delete
  console.info('Deleting collection...')
  await prisma.collection.delete({
    where: { id: created.id },
  })

  const deleted = await prisma.collection.findUnique({
    where: { id: created.id },
  })
  if (deleted) throw new Error('Failed to delete collection')
  console.info('Deleted successfully.')

  console.info('All CRUD operations verified.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
