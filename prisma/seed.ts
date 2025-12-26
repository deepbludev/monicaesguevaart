import { PrismaClient } from '@prisma/client'
import { ensureAdminExists } from '../src/lib/admin'
import { promises as fs } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

// CSV parsing function to handle quoted fields with newlines
interface PaintingRow {
  name: string
  collection: string
  available: string
  description: string
  year: string
  medium: string
  size: string
  slug: string
  imageUrl: string
}

function parseCSV(content: string): PaintingRow[] {
  const rows: PaintingRow[] = []
  const lines = content.split('\n')

  // Skip header row
  let i = 1
  while (i < lines.length) {
    const row: string[] = []
    let currentField = ''
    let inQuotes = false
    let lineIndex = i

    // Handle multiline quoted fields
    while (lineIndex < lines.length) {
      const line = lines[lineIndex]

      for (let j = 0; j < line.length; j++) {
        const char = line[j]
        const nextChar = line[j + 1]

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            // Escaped quote (double quote)
            currentField += '"'
            j++ // Skip next quote
          } else if (inQuotes && (nextChar === ',' || j === line.length - 1)) {
            // End of quoted field (quote followed by comma or end of line)
            inQuotes = false
          } else if (!inQuotes) {
            // Start of quoted field
            inQuotes = true
          } else {
            // Quote inside quoted field (shouldn't happen in well-formed CSV, but handle it)
            currentField += char
          }
        } else if (char === ',' && !inQuotes) {
          // Field separator
          row.push(currentField)
          currentField = ''
        } else {
          currentField += char
        }
      }

      if (inQuotes) {
        // Field continues on next line - add newline and continue
        currentField += '\n'
        lineIndex++
      } else {
        // End of row - add last field if exists
        if (currentField || row.length > 0) {
          row.push(currentField)
        }
        break
      }
    }

    // Move to next row
    i = lineIndex + 1

    // Validate and add row if it has enough fields
    if (row.length >= 9) {
      rows.push({
        name: row[0] || '',
        collection: row[1] || '',
        available: row[2] || '',
        description: row[3] || '',
        year: row[4] || '',
        medium: row[5] || '',
        size: row[6] || '',
        slug: row[7] || '',
        imageUrl: row[8] || '',
      })
    } else if (row.length > 0) {
      // Log incomplete rows for debugging
      console.warn(
        `Skipping incomplete row at line ${i}: expected 9 fields, got ${row.length}`,
      )
    }
  }

  return rows
}

// Function to strip HTML tags and convert to plain text
function stripHTML(html: string): string {
  if (!html) return ''

  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '')

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")

  // Clean up multiple newlines (keep max 2 consecutive)
  text = text.replace(/\n{3,}/g, '\n\n')

  // Trim whitespace
  return text.trim()
}

// Map collection names from CSV to database slugs
function getCollectionSlug(collectionName: string): string | null {
  const mapping: { [key: string]: string } = {
    Acqua: 'acqua',
    'Ascension Series': 'ascension-series',
    Healing: 'healing',
    Lightscapes: 'lightscapes',
    Portals: 'portals',
    'Soul Memory': 'soul-memory',
    Universe: 'universe',
  }

  return mapping[collectionName] || null
}

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
      medium: 'Acrylic on canvas',
      order: 1,
    },
    {
      title: 'Acqua',
      slug: 'acqua',
      tagline: 'The Language of Water',
      description:
        'Water is consciousness in motion.\n\nIt is the realm of emotion, memory, and the subconscious — the place where healing begins before the mind is aware of it.\n\nThe AQUA collection emerges from this living intelligence.\nThese paintings carry the frequency of flow, release, and emotional alchemy. They invite the nervous system to soften, the heart to open, and the deeper layers of the psyche to return to coherence.\n\nThe aquatic beings that appear in this series are not symbols — they are witnesses.\nThey move between worlds effortlessly, untouched by rigidity or fear, reminding us of a state of freedom that once felt natural and can be remembered again. Their presence speaks to the part of you that knows how to move with life rather than resist it.\n\nThese works act as gentle portals into the subconscious field.\nThey help dissolve emotional residue, soften stored grief, and allow long-held tensions to melt back into the flow of being. In their presence, something loosens — not by force, but by resonance.\n\nAQUA is not about water as an element.\nIt is about becoming fluid again.\n\nLet these paintings wash through you.\nLet them touch the places that words cannot reach.\nHealing here does not come from effort, but from surrender — from remembering that your true nature, like water, already knows how to find its way home.',
      medium: 'Acrylic on canvas',
      order: 2,
    },
    {
      title: 'Lightscapes',
      slug: 'lightscapes',
      tagline: 'Where Light Reveals the Invisible',
      description:
        'Landscapes not of Earth, but of consciousness — geographies of energy, stillness, and insight.',
      medium: 'Acrylic on canvas',
      order: 3,
    },
    {
      title: 'Universe',
      slug: 'universe',
      tagline: 'Codes from the Infinite',
      description:
        'Visions arising from meditation and silence, offering frequencies that speak to the vast, eternal aspect of your being.',
      medium: 'Acrylic on canvas',
      order: 4,
    },
    {
      title: 'Soul Memory',
      slug: 'soul-memory',
      tagline: 'Echoes from Other Lifetimes & Dimensions',
      description:
        'Paintings that reconnect you with timelines, wisdom, and identities your soul has carried across dimensions.',
      medium: 'Acrylic on canvas',
      order: 5,
    },
    {
      title: 'Ascension Series',
      slug: 'ascension-series',
      tagline: 'Frequencies for the Awakening Path',
      description:
        'Painted in moments of profound connection, these pieces emit ascension codes that help activate 5D awareness — lifting your vibration, dissolving density, and aligning you with the next octave of your spiritual evolution.',
      medium: 'Acrylic on canvas',
      order: 6,
    },
    {
      title: 'Healing',
      slug: 'healing',
      tagline: 'Restoration and Transformation',
      description:
        'Paintings that facilitate healing, transformation, and spiritual restoration through color, energy, and intention.',
      medium: 'Acrylic on canvas',
      order: 7,
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

  // Read and parse paintings from CSV
  const csvPath = join(process.cwd(), 'data', 'paintings.csv')
  console.log('Reading paintings from CSV...')
  const csvContent = await fs.readFile(csvPath, 'utf-8')
  const csvRows = parseCSV(csvContent)
  console.log(`Parsed ${csvRows.length} paintings from CSV`)

  // Create paintings from CSV data
  let createdCount = 0
  let skippedCount = 0
  const errors: Array<{ row: number; error: string }> = []

  for (let i = 0; i < csvRows.length; i++) {
    const row = csvRows[i]

    try {
      // Skip rows with empty collection
      if (!row.collection || row.collection.trim() === '') {
        console.warn(
          `Skipping painting "${row.name}" (row ${i + 2}): empty collection`,
        )
        skippedCount++
        continue
      }

      // Map collection name to slug
      const collectionSlug = getCollectionSlug(row.collection.trim())
      if (!collectionSlug) {
        console.warn(
          `Skipping painting "${row.name}" (row ${i + 2}): unknown collection "${row.collection}"`,
        )
        skippedCount++
        continue
      }

      // Get collection ID
      const collectionId = createdCollections[collectionSlug]
      if (!collectionId) {
        console.warn(
          `Skipping painting "${row.name}" (row ${i + 2}): collection "${collectionSlug}" not found in database`,
        )
        skippedCount++
        continue
      }

      // Validate required fields
      if (!row.name || !row.imageUrl) {
        console.warn(
          `Skipping painting (row ${i + 2}): missing required fields (name or imageUrl)`,
        )
        skippedCount++
        continue
      }

      // Clean description (strip HTML)
      const cleanDescription = stripHTML(row.description || '')

      // Convert available string to boolean
      const available = row.available.toLowerCase() === 'true'

      // Create painting
      await prisma.painting.create({
        data: {
          title: row.name.trim(),
          description: cleanDescription || null,
          medium: row.medium?.trim() || null,
          size: row.size?.trim() || null,
          year: row.year?.trim() || null,
          imageUrl: row.imageUrl.trim(),
          available,
          order: i + 1, // Use CSV row order (1-indexed)
          collectionId,
        },
      })

      createdCount++
      console.log(
        `Created painting: ${row.name} in ${collectionSlug} (order: ${i + 1})`,
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(
        `Error creating painting "${row.name}" (row ${i + 2}): ${errorMessage}`,
      )
      errors.push({ row: i + 2, error: errorMessage })
      skippedCount++
    }
  }

  console.log('\n=== Painting Seeding Summary ===')
  console.log(`Created: ${createdCount}`)
  console.log(`Skipped: ${skippedCount}`)
  if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`)
    errors.forEach(({ row, error }) => {
      console.log(`  Row ${row}: ${error}`)
    })
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
