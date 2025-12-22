import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@monicaesguevaart.com'
  const password = await bcrypt.hash('password123', 10)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
    },
  })
  console.log({ admin })

  const collections = [
    {
      title: 'Portals',
      slug: 'portals',
      tagline: 'Thresholds to the Higher Worlds',
      description: 'Gateways into realms of subtle perception, where higher guidance becomes tangible, and the soul begins to remember its origin.',
      order: 1,
    },
    {
      title: 'Acqua',
      slug: 'acqua',
      tagline: 'The Language of Flow',
      description: 'A collection inspired by emotional alchemy, where fluid movement and color invite the heart to soften, release, and expand.',
      order: 2,
    },
    {
      title: 'Lightscapes',
      slug: 'lightscapes',
      tagline: 'Where Light Reveals the Invisible',
      description: 'Landscapes not of Earth, but of consciousness — geographies of energy, stillness, and insight.',
      order: 3,
    },
    {
      title: 'Universe',
      slug: 'universe',
      tagline: 'Codes from the Infinite',
      description: 'Visions arising from meditation and silence, offering frequencies that speak to the vast, eternal aspect of your being.',
      order: 4,
    },
    {
      title: 'Soul Memory',
      slug: 'soul-memory',
      tagline: 'Echoes from Other Lifetimes & Dimensions',
      description: 'Paintings that reconnect you with timelines, wisdom, and identities your soul has carried across dimensions.',
      order: 5,
    },
    {
      title: 'Ascension Series',
      slug: 'ascension-series',
      tagline: 'Frequencies for the Awakening Path',
      description: 'Painted in moments of profound connection, these pieces emit ascension codes that help activate 5D awareness — lifting your vibration, dissolving density, and aligning you with the next octave of your spiritual evolution.',
      order: 6,
    },
  ]

  for (const col of collections) {
    const c = await prisma.collection.upsert({
      where: { slug: col.slug },
      update: {},
      create: col,
    })
    console.log(`Created collection: ${c.title}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
