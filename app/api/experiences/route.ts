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
      .from('experiences')
      .insert({
        user_id: user.id,
        title: body.title,
        company: body.company,
        location: body.location,
        description: body.description,
        start_date: body.start_date,
        end_date: body.is_current ? null : body.end_date,
        is_current: body.is_current,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Experience API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
