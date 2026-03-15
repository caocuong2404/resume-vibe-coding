import { createClient } from '@/lib/supabase/server'
import { ProfileSection } from '@/components/profile/profile-section'
import { StatsGrid } from '@/components/profile/stats-grid'
import { QuickLinks } from '@/components/profile/quick-links'

export const metadata = {
  title: 'Profile - ResumeVibe Dashboard',
  description: 'Manage your professional profile',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  const { count: experienceCount } = await supabase
    .from('experiences')
    .select('*', { count: 'exact' })
    .eq('user_id', user?.id)

  const { count: skillsCount } = await supabase
    .from('skills')
    .select('*', { count: 'exact' })
    .eq('user_id', user?.id)

  const { count: projectsCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact' })
    .eq('user_id', user?.id)

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <ProfileSection profile={profile} />

      {/* Stats Grid */}
      <StatsGrid
        experience={experienceCount || 0}
        skills={skillsCount || 0}
        projects={projectsCount || 0}
      />

      {/* Quick Links */}
      <QuickLinks />
    </div>
  )
}
