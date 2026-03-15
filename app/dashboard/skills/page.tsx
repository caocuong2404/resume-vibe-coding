import { createClient } from '@/lib/supabase/server'
import { SkillsList } from '@/components/skills/skills-list'
import { SkillAnalysis } from '@/components/skills/skill-analysis'
import { AddSkillForm } from '@/components/skills/add-form'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Skills - ResumeVibe Dashboard',
  description: 'Manage your skills with AI-powered analysis',
}

export default async function SkillsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', user?.id)
    .order('category', { ascending: true })

  const { data: experiences } = await supabase
    .from('experiences')
    .select('title, company, description')
    .eq('user_id', user?.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Skills</h1>
        <p className="text-muted-foreground mt-2">
          Showcase your expertise with AI-powered skill analysis
        </p>
      </div>

      {/* AI Analysis Section */}
      {experiences && experiences.length > 0 && (
        <SkillAnalysis experiences={experiences} />
      )}

      {/* Add Skill Form */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Add New Skill</h2>
          <AddSkillForm />
        </div>
      </Card>

      {/* Skills List */}
      {skills && skills.length > 0 ? (
        <SkillsList skills={skills} />
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No skills yet. Add your first skill or let AI extract them from your experience.
          </p>
        </Card>
      )}
    </div>
  )
}
