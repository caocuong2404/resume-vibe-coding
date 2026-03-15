'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface ProfileSectionProps {
  profile: any
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    github_url: profile?.github_url || '',
    linkedin_url: profile?.linkedin_url || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="overflow-hidden">
      {/* Header with gradient background */}
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10" />

      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-end gap-6 -mt-16 mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/70 border-4 border-background flex items-center justify-center text-primary-foreground text-4xl font-bold shadow-lg">
            {profile?.full_name?.slice(0, 2).toUpperCase() || 'U'}
          </div>

          <div className="flex-1 pb-2">
            <Button
              variant={isEditing ? 'default' : 'outline'}
              onClick={() => setIsEditing(!isEditing)}
              className="ml-auto"
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{profile?.full_name || 'Complete your profile'}</h1>
              {profile?.bio && <p className="text-muted-foreground mt-2">{profile.bio}</p>}
            </div>

            <div className="flex flex-wrap gap-3">
              {profile?.location && (
                <Badge variant="secondary" className="text-sm">
                  📍 {profile.location}
                </Badge>
              )}
              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border hover:bg-muted transition-colors text-sm"
                >
                  🌐 Website
                </a>
              )}
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border hover:bg-muted transition-colors text-sm"
                >
                  🐙 GitHub
                </a>
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border hover:bg-muted transition-colors text-sm"
                >
                  💼 LinkedIn
                </a>
              )}
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault()
            setIsEditing(false)
          }}>
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Website</label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">GitHub</label>
                <Input
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">LinkedIn</label>
                <Input
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </Card>
  )
}
