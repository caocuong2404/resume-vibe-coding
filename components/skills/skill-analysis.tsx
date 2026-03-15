'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Experience {
  title: string
  company: string
  description: string
}

interface SkillAnalysisProps {
  experiences: Experience[]
}

interface ExtractedSkill {
  name: string
  category: string
  confidence: number
  source: string
}

export function SkillAnalysis({ experiences }: SkillAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [extractedSkills, setExtractedSkills] = useState<ExtractedSkill[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/skills/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experiences }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze skills')
      }

      const data = await response.json()
      setExtractedSkills(data.skills || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAddSkill = async (skill: ExtractedSkill) => {
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: skill.name,
          category: skill.category,
          proficiency_level: 'intermediate',
        }),
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (err) {
      console.error('Error adding skill:', err)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">AI Skill Extraction</h2>
          <p className="text-muted-foreground text-sm">
            Let AI analyze your experience and automatically extract key skills
          </p>
        </div>
        <span className="text-3xl">🤖</span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {extractedSkills.length === 0 ? (
        <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
          {isAnalyzing ? 'Analyzing...' : 'Extract Skills from Experience'}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium">
              Found {extractedSkills.length} skills
            </p>
            <button
              onClick={() => setExtractedSkills([])}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {extractedSkills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between bg-background/50 rounded-lg p-3 border border-border"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{skill.name}</p>
                  <div className="flex gap-2 mt-2">
                    {skill.category && (
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        opacity: skill.confidence,
                      }}
                    >
                      {Math.round(skill.confidence * 100)}%
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddSkill(skill)}
                  className="ml-2 shrink-0"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
