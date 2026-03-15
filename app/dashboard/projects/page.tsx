import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export const metadata = {
  title: 'Projects - ResumeVibe Dashboard',
  description: 'Showcase your best work and portfolio pieces',
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-2">
          Highlight your best work and portfolio pieces
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {project.image_url && (
                <div className="h-40 overflow-hidden bg-muted">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                {project.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 bg-muted rounded hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Code
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 bg-muted rounded hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No projects yet. Add your first project.</p>
          <Link href="#" className="text-primary font-medium hover:underline">
            Coming soon: Project submission form
          </Link>
        </Card>
      )}
    </div>
  )
}
