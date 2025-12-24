import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export interface EnsureAdminResult {
  success: boolean
  message: string
  admin?: { id: string; email: string }
}

/**
 * Ensures an admin user exists in the database.
 * Creates the admin if it doesn't exist, but does not update the password if it already exists (for security).
 *
 * @param email - Admin email address
 * @param password - Admin password (will be hashed)
 * @returns Result object with success status and message
 */
export async function ensureAdminExists(
  email: string,
  password: string,
): Promise<EnsureAdminResult> {
  try {
    if (!email) {
      return {
        success: false,
        message: 'Email is required',
      }
    }

    if (!password) {
      return {
        success: false,
        message: 'Password is required',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.admin.upsert({
      where: { email },
      update: {}, // Don't update password if admin exists (security)
      create: {
        email,
        password: hashedPassword,
      },
    })

    return {
      success: true,
      message: `Admin user ${admin.email} ensured`,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    return {
      success: false,
      message: `Failed to ensure admin user: ${errorMessage}`,
    }
  }
}
