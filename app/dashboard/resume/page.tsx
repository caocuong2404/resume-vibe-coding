import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Resume - ResumeVibe Dashboard',
  description: 'Create and customize your professional resume',
}

export default async function ResumePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('user_id', user?.id)

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', user?.id)

  const { data: education } = await supabase
    .from('education')
    .select('*')
    .eq('user_id', user?.id)

  const completionPercentage = Math.round(
    ((profile?.full_name ? 1 : 0) +
      (experiences?.length ? 1 : 0) +
      (skills?.length ? 1 : 0) +
      (education?.length ? 1 : 0)) *
      25
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Resume</h1>
        <p className="text-muted-foreground mt-2">
          Create and customize your professional resume
        </p>
      </div>

      {/* Profile Completion */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="space-y-4">
          <h2 className="font-semibold">Profile Completion</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall</span>
              <span className="font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-primary/50 h-3 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Resume Templates */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Resume Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-border hover:border-primary">
            <div className="text-center">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-semibold mb-2">Modern</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Clean and contemporary design
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-border hover:border-primary">
            <div className="text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">Minimal</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Simple and elegant presentation
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Resume Preview */}
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="text-6xl">👁️</div>
          <h3 className="text-xl font-semibold">Resume Preview</h3>
          <p className="text-muted-foreground">
            Once you select a template, you'll be able to preview and download your resume
          </p>
        </div>
      </Card>
    </div>
  )
}
