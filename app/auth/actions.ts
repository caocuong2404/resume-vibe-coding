'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/auth/error?message=' + error.message)
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const requestUrl = new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        full_name: formData.get('fullName') as string,
        username: formData.get('username') as string,
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/auth/error?message=' + error.message)
  }

  redirect('/auth/signup-success')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
