export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureAdminExists } = await import('./src/lib/admin')

    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if (!email || !password) {
      console.warn(
        'ADMIN_EMAIL or ADMIN_PASSWORD environment variables are not set. Skipping admin user creation.',
      )
      return
    }

    try {
      const result = await ensureAdminExists(email, password)
      if (result.success) {
        console.log(`[Instrumentation] ${result.message}`)
      } else {
        console.error(`[Instrumentation] ${result.message}`)
      }
    } catch (error) {
      console.error(
        '[Instrumentation] Failed to ensure admin user on startup:',
        error,
      )
      // Don't throw - allow the app to start even if admin creation fails
    }
  }
}
