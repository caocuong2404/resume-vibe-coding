'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AddExperienceForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          title: '',
          company: '',
          location: '',
          description: '',
          start_date: '',
          end_date: '',
          is_current: false,
        })
        // Optionally refresh the page or show success message
        window.location.reload()
      }
    } catch (error) {
      console.error('Error adding experience:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Job Title *</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Senior Software Engineer"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Company *</label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Tech Company"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Location</label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., San Francisco, CA"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your role, responsibilities, and achievements..."
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Start Date *</label>
          <Input
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">End Date</label>
          <Input
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            disabled={formData.is_current}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_current"
          id="is_current"
          checked={formData.is_current}
          onChange={handleChange}
          className="w-4 h-4 rounded border-border cursor-pointer"
        />
        <label htmlFor="is_current" className="text-sm font-medium cursor-pointer">
          I currently work here
        </label>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Adding...' : 'Add Experience'}
      </Button>
    </form>
  )
}
