import { Card } from '@/components/ui/card'
import Link from 'next/link'

const quickLinks = [
  {
    title: 'Add Experience',
    description: 'Showcase your work history and achievements',
    href: '/dashboard/experience',
    icon: '💼',
    color: 'from-blue-500/10',
  },
  {
    title: 'Update Skills',
    description: 'List your technical and soft skills',
    href: '/dashboard/skills',
    icon: '⚡',
    color: 'from-purple-500/10',
  },
  {
    title: 'Add Projects',
    description: 'Highlight your best work and portfolio pieces',
    href: '/dashboard/projects',
    icon: '🚀',
    color: 'from-pink-500/10',
  },
  {
    title: 'Generate Resume',
    description: 'Create and customize your resume',
    href: '/dashboard/resume',
    icon: '📄',
    color: 'from-green-500/10',
  },
]

export function QuickLinks() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className={`bg-gradient-to-br ${link.color} to-transparent hover:shadow-lg transition-all duration-300 cursor-pointer h-full`}>
              <div className="p-6 flex items-start gap-4">
                <span className="text-4xl">{link.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
