import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const systemPrompt = `You are an expert career analyst. Analyze the provided work experiences and extract key skills.

For each skill, provide:
1. Skill name (specific and professional)
2. Category (Frontend, Backend, DevOps, Data, Mobile, Design, Leadership, Other)
3. Confidence score (0-1, how confident you are this is a real skill)
4. Source (which experience it came from)

Return a JSON object with an array of skills. Example format:
{
  "skills": [
    {
      "name": "React",
      "category": "Frontend",
      "confidence": 0.95,
      "source": "Software Engineer at TechCorp"
    }
  ]
}

Focus on technical and professional skills. Be specific (e.g., "React" not just "web development").
Include both hard skills (technologies, tools) and soft skills (leadership, communication) if evident.`

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { experiences } = await request.json()

    if (!experiences || experiences.length === 0) {
      return NextResponse.json(
        { skills: [] },
        { status: 200 }
      )
    }

    const experienceText = experiences
      .map((exp: any) => `Role: ${exp.title} at ${exp.company}. ${exp.description}`)
      .join('\n')

    const result = await generateText({
      model: 'openai/gpt-4-mini',
      system: systemPrompt,
      prompt: `Please analyze these experiences and extract skills:\n\n${experienceText}`,
    })

    // Parse the AI response
    let skills = []
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        skills = parsed.skills || []
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      // Return empty skills if parsing fails
      skills = []
    }

    return NextResponse.json({ skills }, { status: 200 })
  } catch (error) {
    console.error('Skills analyze API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze skills', skills: [] },
      { status: 500 }
    )
  }
}
