import { PT_Serif } from 'next/font/google'
import './globals.css'

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
})

export const metadata = {
  title: 'Monica Esgueva | Artist',
  description: 'Sacred art for the awakened soul',
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
