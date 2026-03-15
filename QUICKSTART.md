# ResumeVibe - Quick Start Guide

Get started with ResumeVibe in 5 minutes!

## Setup

### 1. Prerequisites
- Node.js 18+
- Supabase account (with credentials set in environment)
- Vercel deployment (optional)

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd resume-vibe-coding

# Install dependencies
npm install

# Setup environment variables (ask for values from team)
# Copy from .env.example and add your Supabase credentials
cp .env.example .env.local

# Run database migrations
# Execute scripts/01_create_tables.sql and scripts/02_profile_trigger.sql
# in your Supabase dashboard under SQL Editor

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First Steps

### For New Users
1. Click "Get Started" on landing page
2. Sign up with email and create a strong password
3. Verify your email (check inbox)
4. Complete your profile with name and bio
5. Start adding your experience, skills, and projects

### For Developers

#### Adding a New Skill
```tsx
// 1. Create a form component in components/skills/
// 2. Create API route in app/api/skills/route.ts
// 3. Submit form to POST /api/skills
// 4. Component auto-reloads with new skill
```

#### Creating a New Page Section
```tsx
// 1. Create page in app/dashboard/[section]/page.tsx
// 2. Fetch data from Supabase in server component
// 3. Pass data to client components
// 4. Add navigation link in components/dashboard-nav.tsx
```

#### Integrating AI Features
```ts
// Use Vercel AI SDK 6 in API routes
import { generateText } from 'ai'

export async function POST(request: NextRequest) {
  const result = await generateText({
    model: 'openai/gpt-4-mini',
    prompt: 'Your prompt here'
  })
  return NextResponse.json(result)
}
```

## Project Navigation

### Landing Page
- Hero section with key features
- Feature showcase with interactive cards
- Call-to-action buttons

### Authentication Pages
- `/auth/login` - Sign in to existing account
- `/auth/signup` - Create new account
- `/auth/callback` - Email verification handler

### Dashboard (Protected)
- `/dashboard` - Profile overview and quick links
- `/dashboard/experience` - Manage work history
- `/dashboard/skills` - Add skills with AI extraction
- `/dashboard/projects` - Showcase portfolio
- `/dashboard/education` - Track education
- `/dashboard/resume` - Generate and download resumes

## Key Features Explained

### AI Skill Analysis
1. Go to Skills page
2. Click "Extract Skills from Experience"
3. AI analyzes your experiences and suggests skills
4. Click "Add" to add suggested skills

### Experience Timeline
1. Add experience with job title, company, and dates
2. View in interactive timeline with connecting dots
3. Current roles are highlighted in green
4. Add media/portfolio links to experiences

### Profile Customization
1. Click "Edit Profile" on dashboard
2. Update avatar, bio, location, social links
3. Changes save automatically
4. Public profile is viewable by anyone

## Database Structure

### Key Tables
- **profiles**: Your profile information
- **experiences**: Work history entries
- **skills**: Your technical and soft skills
- **projects**: Portfolio projects
- **education**: Educational background
- **resume_templates**: Saved resume layouts

All data is private by default. Only public profiles are viewable.

## Environment Variables

Create `.env.local` with these values:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...

# App (required)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# File Storage (optional)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx
```

## Troubleshooting

### "Can't sign up"
- Check email is valid
- Verify email inbox for confirmation
- Check Supabase auth settings

### "Dashboard shows empty"
- Ensure you verified your email
- Try logging out and back in
- Check browser console for errors

### "AI skill analysis not working"
- Verify OpenAI API access
- Check internet connection
- Ensure experiences are filled in

### "Styles look broken"
- Clear browser cache (Cmd+Shift+Delete)
- Restart dev server (npm run dev)
- Check Tailwind CSS is building

## Deployment

### Deploy to Vercel

```bash
# 1. Push code to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Connect to Vercel
# - Go to vercel.com
# - Select this repository
# - Add environment variables
# - Deploy!

# Or use Vercel CLI
vercel deploy
```

## Getting Help

- Check DEVELOPMENT.md for architecture details
- Review component examples in components/
- Check API routes in app/api/
- Look at database schema in scripts/

## Next Steps

1. Customize colors in `tailwind.config.js` and `app/globals.css`
2. Add more experience entries and skills
3. Upload project screenshots
4. Generate your first resume
5. Share your profile with others

Happy coding! 🚀
