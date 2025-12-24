import { put, del } from '@vercel/blob'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export interface UploadResult {
  url: string
  error?: string
}

export interface ValidationError {
  error: string
}

/**
 * Validates a file before upload
 */
export function validateImageFile(file: File): ValidationError | null {
  if (!file) {
    return { error: 'No file provided' }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`,
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    }
  }

  return null
}

/**
 * Uploads an image file to Vercel Blob Store
 */
export async function uploadImage(
  file: File,
  filename?: string,
): Promise<UploadResult> {
  const validation = validateImageFile(file)
  if (validation) {
    return { url: '', error: validation.error }
  }

  try {
    const blob = await put(filename || file.name, file, {
      access: 'public',
      contentType: file.type,
    })

    return { url: blob.url }
  } catch (error) {
    console.error('Error uploading image to Vercel Blob:', error)
    return {
      url: '',
      error:
        error instanceof Error
          ? error.message
          : 'Failed to upload image. Please try again.',
    }
  }
}

/**
 * Deletes an image from Vercel Blob Store
 * Returns true if successful, false otherwise
 */
export async function deleteImage(url: string): Promise<boolean> {
  if (!url || !url.includes('blob.vercel-storage.com')) {
    // Not a Vercel Blob URL, skip deletion
    return true
  }

  try {
    await del(url)
    return true
  } catch (error) {
    // Log error but don't fail the operation
    console.error('Error deleting image from Vercel Blob:', error)
    return false
  }
}
