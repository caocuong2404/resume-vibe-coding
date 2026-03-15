'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Skill {
  id: string
  name: string
  category: string
  proficiency_level: string
  years_of_experience: number | null
  ai_score: number | null
  endorsements: number
}

interface SkillsListProps {
  skills: Skill[]
}

export function SkillsList({ skills }: SkillsListProps) {
  const groupedByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const getProficiencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'advanced':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'beginner':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedByCategory).map(([category, categorySkills]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorySkills.map(skill => (
              <Card key={skill.id} className="p-5 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-base">{skill.name}</h4>
                    {skill.endorsements > 0 && (
                      <Badge variant="secondary" className="text-xs shrink-0">
                        👍 {skill.endorsements}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getProficiencyColor(skill.proficiency_level)}`}
                    >
                      {skill.proficiency_level}
                    </Badge>

                    {skill.years_of_experience !== null && (
                      <Badge variant="secondary" className="text-xs">
                        {skill.years_of_experience} years
                      </Badge>
                    )}
                  </div>

                  {skill.ai_score !== null && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-2">
                        AI Assessment
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-primary/50 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min(skill.ai_score * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(skill.ai_score * 100)}% confidence
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
