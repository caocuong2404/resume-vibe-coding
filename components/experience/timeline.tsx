'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Experience {
  id: string
  title: string
  company: string
  description: string
  start_date: string
  end_date: string | null
  is_current: boolean
  location: string
  media_urls: string[]
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
      years--
      months += 12
    }

    if (years > 0 && months > 0) {
      return `${years}y ${months}m`
    } else if (years > 0) {
      return `${years}y`
    } else {
      return `${months}m`
    }
  }

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={exp.id} className="relative">
          {/* Timeline connector */}
          {index !== experiences.length - 1 && (
            <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
          )}

          <Card className="relative pl-20 p-6">
            {/* Timeline dot */}
            <div className="absolute left-3 top-8 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg" />

            {/* Current badge */}
            {exp.is_current && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500/20 text-green-700 border border-green-200">
                  Current
                </Badge>
              </div>
            )}

            {/* Content */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {exp.location && (
                  <span className="flex items-center gap-1">
                    📍 {exp.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  📅 {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ {calculateDuration(exp.start_date, exp.end_date)}
                </span>
              </div>

              {exp.description && (
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              )}

              {exp.media_urls && exp.media_urls.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-3">Media</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {exp.media_urls.map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group overflow-hidden rounded-lg aspect-video bg-muted hover:shadow-lg transition-all"
                      >
                        <img
                          src={url}
                          alt={`Experience media ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
