/**
 * Image Download Script
 *
 * Purpose:
 * Downloads images from URLs listed in a CSV file and saves them to the data folder
 * with filenames based on the slug column from the CSV.
 *
 * Usage:
 *   pnpm download-images
 *   or
 *   pnpm exec tsx scripts/download-images.ts
 *
 * Requirements:
 *   - Must be run from the project root directory
 *   - Requires data/images.csv file with tab-separated values
 *   - CSV format: slug<TAB>image_url
 *
 * Input:
 *   - Reads from: data/images.csv
 *
 * Output:
 *   - Saves images to: data/images/{slug}.{extension}
 *   - File extension is inferred from the URL (defaults to .jpg if not found)
 *   - Overwrites existing files if they already exist
 *
 * Features:
 *   - Shows progress for each download
 *   - Continues processing even if individual downloads fail
 *   - Displays summary statistics at the end
 *   - Lists any failed downloads with error messages
 */

import { promises as fs } from 'fs'
import { join } from 'path'

interface ImageRow {
  slug: string
  url: string
}

async function parseCSV(filePath: string): Promise<ImageRow[]> {
  const content = await fs.readFile(filePath, 'utf-8')
  const lines = content.trim().split('\n')

  // Skip header row
  const rows = lines.slice(1)

  return rows
    .map((line) => {
      // Split by tab character
      const [slug, url] = line.split('\t')
      // Remove trailing comma from slug if present
      const cleanSlug = slug?.trim().replace(/,$/, '')
      return { slug: cleanSlug, url: url?.trim() }
    })
    .filter((row): row is ImageRow => {
      return Boolean(row.slug && row.url)
    })
}

function extractExtension(url: string): string {
  try {
    const urlPath = new URL(url).pathname
    const match = urlPath.match(/\.([a-zA-Z0-9]+)(?:\?|$)/)
    return match ? `.${match[1]}` : '.jpg' // Default to .jpg if no extension found
  } catch {
    return '.jpg' // Default to .jpg if URL parsing fails
  }
}

async function downloadImage(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await fs.writeFile(outputPath, buffer)
}

async function main() {
  const projectRoot = process.cwd()
  const csvPath = join(projectRoot, 'data', 'images.csv')
  const outputDir = join(projectRoot, 'data', 'images')

  // Ensure the images directory exists
  await fs.mkdir(outputDir, { recursive: true })

  console.info('Reading CSV file...')
  const images = await parseCSV(csvPath)
  console.info(`Found ${images.length} images to download\n`)

  const results = {
    successful: 0,
    failed: 0,
    errors: [] as Array<{ slug: string; error: string }>,
  }

  for (let i = 0; i < images.length; i++) {
    const { slug, url } = images[i]
    const extension = extractExtension(url)
    const filename = `${slug}${extension}`
    const outputPath = join(outputDir, filename)

    try {
      console.info(`[${i + 1}/${images.length}] Downloading ${slug}...`)
      await downloadImage(url, outputPath)
      console.info(`✓ Saved: ${filename}\n`)
      results.successful++
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(`✗ Failed to download ${slug}: ${errorMessage}\n`)
      results.failed++
      results.errors.push({ slug, error: errorMessage })
    }
  }

  console.info('\n=== Download Summary ===')
  console.info(`Successful: ${results.successful}`)
  console.info(`Failed: ${results.failed}`)

  if (results.errors.length > 0) {
    console.info('\nFailed downloads:')
    results.errors.forEach(({ slug, error }) => {
      console.info(`  - ${slug}: ${error}`)
    })
  }
}

main().catch((e) => {
  console.error('Fatal error:', e)
  process.exit(1)
})
