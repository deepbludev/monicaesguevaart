import { PrismaClient } from '@prisma/client'
import { ensureAdminExists } from '../src/lib/admin'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email) {
    throw new Error('ADMIN_EMAIL environment variable is required')
  }

  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable is required')
  }

  const result = await ensureAdminExists(email, password)
  if (!result.success) {
    throw new Error(result.message)
  }
  console.log({ admin: result.admin })

  // Clear existing paintings (optional - comment out if you want to keep existing)
  await prisma.painting.deleteMany({})
  console.log('Cleared existing paintings')

  // Clear existing paintings (optional - comment out if you want to keep existing)
  await prisma.collection.deleteMany({})
  console.log('Cleared existing collections')

  const collections = [
    {
      title: 'Portals',
      slug: 'portals',
      tagline: 'Thresholds to the Higher Worlds',
      description:
        'Gateways into realms of subtle perception, where higher guidance becomes tangible, and the soul begins to remember its origin.',
      order: 1,
    },
    {
      title: 'Acqua',
      slug: 'acqua',
      tagline: 'The Language of Flow',
      description:
        'A collection inspired by emotional alchemy, where fluid movement and color invite the heart to soften, release, and expand.',
      order: 2,
    },
    {
      title: 'Lightscapes',
      slug: 'lightscapes',
      tagline: 'Where Light Reveals the Invisible',
      description:
        'Landscapes not of Earth, but of consciousness — geographies of energy, stillness, and insight.',
      order: 3,
    },
    {
      title: 'Universe',
      slug: 'universe',
      tagline: 'Codes from the Infinite',
      description:
        'Visions arising from meditation and silence, offering frequencies that speak to the vast, eternal aspect of your being.',
      order: 4,
    },
    {
      title: 'Soul Memory',
      slug: 'soul-memory',
      tagline: 'Echoes from Other Lifetimes & Dimensions',
      description:
        'Paintings that reconnect you with timelines, wisdom, and identities your soul has carried across dimensions.',
      order: 5,
    },
    {
      title: 'Ascension Series',
      slug: 'ascension-series',
      tagline: 'Frequencies for the Awakening Path',
      description:
        'Painted in moments of profound connection, these pieces emit ascension codes that help activate 5D awareness — lifting your vibration, dissolving density, and aligning you with the next octave of your spiritual evolution.',
      order: 6,
    },
  ]

  const createdCollections: { [slug: string]: string } = {}

  for (const col of collections) {
    const c = await prisma.collection.upsert({
      where: { slug: col.slug },
      update: {},
      create: col,
    })
    createdCollections[col.slug] = c.id
    console.log(`Created collection: ${c.title}`)
  }

  // Paintings for each collection
  const paintings = [
    // Portals
    {
      collectionSlug: 'portals',
      paintings: [
        {
          title: 'Gateway to Eternity',
          description: 'A luminous portal opening to higher dimensions',
          medium: 'Acrylic on Canvas',
          size: '24" x 36"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/6366f1/ffffff?text=Gateway+to+Eternity',
          order: 1,
          available: true,
        },
        {
          title: 'Threshold of Light',
          description: 'The moment between worlds, where transformation begins',
          medium: 'Acrylic on Canvas',
          size: '30" x 40"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/8b5cf6/ffffff?text=Threshold+of+Light',
          order: 2,
          available: true,
        },
        {
          title: 'Sacred Passage',
          description: 'A doorway to inner wisdom and divine connection',
          medium: 'Mixed Media',
          size: '20" x 30"',
          year: '2023',
          imageUrl:
            'https://placehold.co/800x1200/a855f7/ffffff?text=Sacred+Passage',
          order: 3,
          available: true,
        },
      ],
    },
    // Acqua
    {
      collectionSlug: 'acqua',
      paintings: [
        {
          title: 'Flow of Emotions',
          description: 'The gentle movement of feelings through the heart',
          medium: 'Watercolor on Paper',
          size: '18" x 24"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/06b6d4/ffffff?text=Flow+of+Emotions',
          order: 1,
          available: true,
        },
        {
          title: 'Ocean of Release',
          description: 'Letting go into the vastness of emotional freedom',
          medium: 'Acrylic on Canvas',
          size: '36" x 48"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/0891b2/ffffff?text=Ocean+of+Release',
          order: 2,
          available: true,
        },
        {
          title: 'Liquid Light',
          description: 'Where water and light merge in perfect harmony',
          medium: 'Mixed Media',
          size: '24" x 32"',
          year: '2023',
          imageUrl:
            'https://placehold.co/800x1200/0ea5e9/ffffff?text=Liquid+Light',
          order: 3,
          available: false,
        },
      ],
    },
    // Lightscapes
    {
      collectionSlug: 'lightscapes',
      paintings: [
        {
          title: 'Dawn of Consciousness',
          description: 'The first light of awareness breaking through',
          medium: 'Acrylic on Canvas',
          size: '30" x 40"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/fbbf24/ffffff?text=Dawn+of+Consciousness',
          order: 1,
          available: true,
        },
        {
          title: 'Ethereal Landscape',
          description: 'A geography of pure energy and stillness',
          medium: 'Oil on Canvas',
          size: '40" x 50"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/f59e0b/ffffff?text=Ethereal+Landscape',
          order: 2,
          available: true,
        },
        {
          title: 'Mountain of Insight',
          description: 'Peaks of understanding rising from the depths',
          medium: 'Acrylic on Canvas',
          size: '28" x 36"',
          year: '2023',
          imageUrl:
            'https://placehold.co/800x1200/eab308/ffffff?text=Mountain+of+Insight',
          order: 3,
          available: true,
        },
      ],
    },
    // Universe
    {
      collectionSlug: 'universe',
      paintings: [
        {
          title: 'Cosmic Codes',
          description: 'Frequencies from the infinite speaking to the soul',
          medium: 'Acrylic on Canvas',
          size: '36" x 48"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/1e1b4b/ffffff?text=Cosmic+Codes',
          order: 1,
          available: true,
        },
        {
          title: 'Stellar Awakening',
          description: 'The moment when cosmic awareness dawns',
          medium: 'Mixed Media',
          size: '32" x 40"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/312e81/ffffff?text=Stellar+Awakening',
          order: 2,
          available: true,
        },
        {
          title: 'Nebula of Silence',
          description: 'Visions from deep meditation and inner quiet',
          medium: 'Acrylic on Canvas',
          size: '30" x 38"',
          year: '2023',
          imageUrl:
            'https://placehold.co/800x1200/4c1d95/ffffff?text=Nebula+of+Silence',
          order: 3,
          available: true,
        },
      ],
    },
    // Soul Memory
    {
      collectionSlug: 'soul-memory',
      paintings: [
        {
          title: 'Ancient Echoes',
          description: 'Wisdom from lifetimes past resurfacing',
          medium: 'Acrylic on Canvas',
          size: '28" x 36"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/7c2d12/ffffff?text=Ancient+Echoes',
          order: 1,
          available: true,
        },
        {
          title: 'Timeline Convergence',
          description: 'Where past and future meet in the present moment',
          medium: 'Mixed Media',
          size: '36" x 44"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/991b1b/ffffff?text=Timeline+Convergence',
          order: 2,
          available: true,
        },
        {
          title: 'Dimensional Memory',
          description: 'Recalling identities carried across dimensions',
          medium: 'Acrylic on Canvas',
          size: '24" x 32"',
          year: '2023',
          imageUrl:
            'https://placehold.co/800x1200/b91c1c/ffffff?text=Dimensional+Memory',
          order: 3,
          available: false,
        },
      ],
    },
    // Ascension Series
    {
      collectionSlug: 'ascension-series',
      paintings: [
        {
          title: '5D Activation',
          description: 'Frequencies that activate higher dimensional awareness',
          medium: 'Acrylic on Canvas',
          size: '40" x 50"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/065f46/ffffff?text=5D+Activation',
          order: 1,
          available: true,
        },
        {
          title: 'Vibration Lift',
          description: 'Dissolving density and aligning with higher octaves',
          medium: 'Mixed Media',
          size: '36" x 48"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/047857/ffffff?text=Vibration+Lift',
          order: 2,
          available: true,
        },
        {
          title: 'Evolution Code',
          description: 'Painted in moments of profound connection',
          medium: 'Acrylic on Canvas',
          size: '32" x 40"',
          year: '2024',
          imageUrl:
            'https://placehold.co/800x1200/059669/ffffff?text=Evolution+Code',
          order: 3,
          available: true,
        },
        {
          title: 'Spiritual Awakening',
          description: 'The next octave of spiritual evolution',
          medium: 'Acrylic on Canvas',
          size: '30" x 38"',
          year: '2023',
          imageUrl:
            'https://placehold.co/800x1200/10b981/ffffff?text=Spiritual+Awakening',
          order: 4,
          available: true,
        },
      ],
    },
  ]

  // Create paintings for each collection
  for (const collectionPaintings of paintings) {
    const collectionId = createdCollections[collectionPaintings.collectionSlug]
    if (!collectionId) {
      console.warn(
        `Collection with slug ${collectionPaintings.collectionSlug} not found`,
      )
      continue
    }

    for (const painting of collectionPaintings.paintings) {
      await prisma.painting.create({
        data: {
          ...painting,
          collectionId,
        },
      })
      console.log(
        `Created painting: ${painting.title} in ${collectionPaintings.collectionSlug}`,
      )
    }
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
