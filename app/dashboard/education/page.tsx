import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Education - ResumeVibe Dashboard',
  description: 'Manage your educational background',
}

export default async function EducationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: education } = await supabase
    .from('education')
    .select('*')
    .eq('user_id', user?.id)
    .order('end_date', { ascending: false })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Education</h1>
        <p className="text-muted-foreground mt-2">
          Showcase your educational background and qualifications
        </p>
      </div>

      {education && education.length > 0 ? (
        <div className="space-y-4">
          {education.map(edu => (
            <Card key={edu.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold">{edu.school}</h3>
                  {edu.degree && (
                    <p className="text-primary font-medium">{edu.degree}</p>
                  )}
                </div>
                <Badge variant="secondary">
                  {edu.start_date ? formatDate(edu.start_date) : 'N/A'} —{' '}
                  {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                </Badge>
              </div>

              {edu.field_of_study && (
                <p className="text-muted-foreground mb-2">
                  Field: {edu.field_of_study}
                </p>
              )}

              {edu.description && (
                <p className="text-muted-foreground">{edu.description}</p>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No education records yet. Add your educational background.
          </p>
        </Card>
      )}
    </div>
  )
}
