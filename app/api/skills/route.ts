import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const { data, error } = await supabase
      .from('skills')
      .insert({
        user_id: user.id,
        name: body.name,
        category: body.category,
        proficiency_level: body.proficiency_level || 'intermediate',
        years_of_experience: body.years_of_experience,
        ai_score: body.ai_score || null,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Skills API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
