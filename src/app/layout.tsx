import { PT_Serif } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next/types'

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
})

export const metadata: Metadata = {
  title: 'Monica Esgueva | Awakening Art',
  description: 'Sacred art for the awakened soul',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${ptSerif.variable} font-sans`}>{children}</body>
    </html>
  )
}
