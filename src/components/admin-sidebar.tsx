'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Images, Palette, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/collections', label: 'Collections', icon: Images },
  { href: '/admin/paintings', label: 'Paintings', icon: Palette },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-100/40 pt-28 dark:bg-gray-800/40">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight">Admin Area</h2>
      </div>
      <div className="flex-1 px-4 text-sm font-medium">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                isActive
                  ? 'text-primary bg-gray-200 dark:bg-gray-800'
                  : 'text-muted-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </div>
      <div className="p-4">
        <form action={logout}>
          <Button variant="outline" className="w-full justify-start gap-3 px-3">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}
