import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function ensureAuthenticated() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return user
}
