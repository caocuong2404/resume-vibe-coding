'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Profile',
    href: '/dashboard',
    icon: '👤',
  },
  {
    label: 'Experience',
    href: '/dashboard/experience',
    icon: '💼',
  },
  {
    label: 'Skills',
    href: '/dashboard/skills',
    icon: '⚡',
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: '🚀',
  },
  {
    label: 'Education',
    href: '/dashboard/education',
    icon: '🎓',
  },
  {
    label: 'Resume',
    href: '/dashboard/resume',
    icon: '📄',
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
