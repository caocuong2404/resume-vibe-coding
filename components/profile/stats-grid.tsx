import { Card } from '@/components/ui/card'

interface StatsGridProps {
  experience: number
  skills: number
  projects: number
}

export function StatsGrid({ experience, skills, projects }: StatsGridProps) {
  const stats = [
    {
      label: 'Experiences',
      value: experience,
      icon: '💼',
      color: 'from-blue-500/10 to-blue-500/5',
    },
    {
      label: 'Skills',
      value: skills,
      icon: '⚡',
      color: 'from-purple-500/10 to-purple-500/5',
    },
    {
      label: 'Projects',
      value: projects,
      icon: '🚀',
      color: 'from-pink-500/10 to-pink-500/5',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`bg-gradient-to-br ${stat.color} border-0 p-6`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
