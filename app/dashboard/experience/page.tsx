import { createClient } from '@/lib/supabase/server'
import { ExperienceTimeline } from '@/components/experience/timeline'
import { AddExperienceForm } from '@/components/experience/add-form'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Experience - ResumeVibe Dashboard',
  description: 'Manage your work experience and achievements',
}

export default async function ExperiencePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('user_id', user?.id)
    .order('start_date', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Experience</h1>
        <p className="text-muted-foreground mt-2">
          Showcase your professional journey and achievements
        </p>
      </div>

      {/* Add Experience Form */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Add New Experience</h2>
          <AddExperienceForm />
        </div>
      </Card>

      {/* Experience Timeline */}
      {experiences && experiences.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-6">Your Journey</h2>
          <ExperienceTimeline experiences={experiences} />
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No experiences yet. Add your first one above!</p>
        </Card>
      )}
    </div>
  )
}
