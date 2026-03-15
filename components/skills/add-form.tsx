'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'DevOps',
  'Data',
  'Mobile',
  'Design',
  'Leadership',
  'Other',
]

const PROFICIENCY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert']

export function AddSkillForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: SKILL_CATEGORIES[0],
    proficiency_level: PROFICIENCY_LEVELS[1],
    years_of_experience: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          proficiency_level: formData.proficiency_level,
          years_of_experience: formData.years_of_experience
            ? parseFloat(formData.years_of_experience)
            : null,
        }),
      })

      if (response.ok) {
        setFormData({
          name: '',
          category: SKILL_CATEGORIES[0],
          proficiency_level: PROFICIENCY_LEVELS[1],
          years_of_experience: '',
        })
        window.location.reload()
      }
    } catch (error) {
      console.error('Error adding skill:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Skill Name *</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., React, Python, TypeScript"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            {SKILL_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Proficiency Level *
          </label>
          <select
            name="proficiency_level"
            value={formData.proficiency_level}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            {PROFICIENCY_LEVELS.map(level => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Years of Experience
        </label>
        <Input
          name="years_of_experience"
          type="number"
          step="0.5"
          min="0"
          value={formData.years_of_experience}
          onChange={handleChange}
          placeholder="e.g., 5"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Adding...' : 'Add Skill'}
      </Button>
    </form>
  )
}
