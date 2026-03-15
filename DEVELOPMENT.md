# ResumeVibe - Modern Resume Platform 2026

A futuristic, AI-powered resume platform built with cutting-edge web technologies for 2026.

## Architecture & Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Custom component library with shadcn/ui patterns
- **Authentication**: Supabase Auth (native)

### Backend
- **Database**: Supabase PostgreSQL
- **ORM**: Direct SQL with Row Level Security (RLS)
- **API**: Next.js API Routes + Server Actions
- **AI**: Vercel AI SDK 6 with OpenAI integration

### Infrastructure
- **Hosting**: Vercel
- **File Storage**: Vercel Blob (for multimedia)
- **Real-time**: Supabase Real-time subscriptions ready

## Project Structure

```
app/
├── api/
│   ├── experiences/          # Experience CRUD endpoints
│   ├── skills/
│   │   ├── route.ts         # Skill CRUD
│   │   └── analyze/route.ts # AI skill analysis
│   └── ...other endpoints
├── auth/                      # Authentication pages
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── callback/route.ts
│   └── layout.tsx
├── dashboard/                 # Protected dashboard
│   ├── page.tsx              # Profile overview
│   ├── experience/page.tsx    # Experience timeline
│   ├── skills/page.tsx        # Skills with AI analysis
│   ├── projects/page.tsx      # Project showcase
│   ├── education/page.tsx     # Education history
│   ├── resume/page.tsx        # Resume builder
│   └── layout.tsx             # Dashboard layout
├── globals.css                # Design system & tokens
├── layout.tsx                 # Root layout
└── page.tsx                   # Landing page

components/
├── ui/                        # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── input.tsx
│   └── ...
├── profile/                   # Profile section components
│   ├── profile-section.tsx   # Profile edit/view
│   ├── stats-grid.tsx        # Stats cards
│   └── quick-links.tsx       # Quick action links
├── experience/                # Experience components
│   ├── timeline.tsx          # Interactive timeline
│   └── add-form.tsx          # Experience form
├── skills/                    # Skills components
│   ├── skill-analysis.tsx    # AI analysis widget
│   ├── add-form.tsx          # Add skill form
│   └── skills-list.tsx       # Display skills
├── dashboard-nav.tsx          # Dashboard navigation
├── user-menu.tsx              # User profile menu
└── header.tsx                 # Landing page header

lib/
├── supabase/
│   ├── client.ts             # Browser client
│   ├── server.ts             # Server client
│   └── proxy.ts              # Session proxy
├── utils.ts                   # Utility functions
└── auth-context.tsx           # Auth context (optional)

scripts/
├── 01_create_tables.sql       # Database schema
└── 02_profile_trigger.sql     # Auto-profile creation

middleware.ts                  # Session management
```

## Database Schema

### Tables
- **profiles**: User profile information with social links
- **experiences**: Work experience with timeline data
- **skills**: Technical and soft skills with proficiency levels
- **projects**: Portfolio projects with media
- **education**: Educational background
- **resume_templates**: Saved resume configurations

### Key Features
- Row Level Security (RLS) for data privacy
- Foreign key constraints with CASCADE deletion
- Indexes for performance optimization
- Timestamps for audit trails

## Core Features

### 1. Authentication
- Email/password signup with verification
- Secure session management with HTTP-only cookies
- Auto-profile creation on signup via database trigger
- Middleware-based route protection

### 2. Dynamic Profile Section
- Avatar generation from initials
- Editable profile information
- Social links (GitHub, LinkedIn, website)
- Location-based filtering ready

### 3. Interactive Experience Timeline
- Visual timeline with connected dots
- Current role highlighting
- Duration calculation
- Media integration support
- Inline edit capability

### 4. AI-Driven Skill Analysis
- Automatic skill extraction from experiences
- Confidence scoring (0-1 scale)
- Category classification
- One-click skill addition
- Smart proficiency level assignment

### 5. Multi-Section Dashboard
- Experience management
- Skills tracking with AI insights
- Project showcase
- Education history
- Resume builder (template selection)
- Real-time stats

### 6. Responsive Design
- Mobile-first approach
- Sidebar navigation (hidden on mobile)
- Adaptive layouts
- Touch-friendly interactions

## Development Workflow

### Environment Setup

1. **Clone and install**:
   ```bash
   git clone <repo>
   cd resume-vibe-coding
   npm install
   ```

2. **Environment variables** (set in Vercel UI):
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_key>
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

### Key Development Patterns

#### API Routes
```ts
// /app/api/experiences/route.ts
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  // Implement endpoint with RLS protection
}
```

#### Server Components with Data Fetching
```tsx
// /app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()
  // Return JSX with server-side data
}
```

#### Client Components with Forms
```tsx
// /components/experience/add-form.tsx
'use client'
export function AddExperienceForm() {
  // Handle form submission to /api/experiences
}
```

#### AI Integration
```ts
// /app/api/skills/analyze/route.ts
import { generateText } from 'ai'

export async function POST(request: NextRequest) {
  const result = await generateText({
    model: 'openai/gpt-4-mini',
    system: 'You are a career analyst...',
    prompt: `Analyze experiences: ${experienceText}`
  })
}
```

## Design System

### Colors
- **Primary**: Electric blue (#3B82F6)
- **Accent**: Purple/Pink gradient
- **Neutral**: Dark grays (#1F2937, #374151, #D1D5DB)
- **Background**: Dark mode by default

### Typography
- **Sans Serif**: Default font for body and headers
- **Spacing**: 4px base unit (Tailwind scale)
- **Breakpoints**: Mobile-first (sm, md, lg, xl)

### Components
- Consistent shadow and border styling
- Focus states for accessibility
- Loading states with spinners
- Error messaging patterns

## Deployment

### Vercel Deployment
```bash
# Push to main branch to auto-deploy
git push origin main

# Or use Vercel CLI
vercel deploy
```

### Database Migrations
1. Run SQL scripts via Supabase dashboard
2. Or execute via API during setup

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting via dynamic imports
- Server-side rendering where possible
- Database indexes on foreign keys
- Memoization of expensive computations

## Security Considerations

- Row Level Security (RLS) enforces user isolation
- Secure password hashing via Supabase Auth
- CSRF protection built-in (Next.js)
- XSS prevention through React's auto-escaping
- SQL injection prevention via parameterized queries

## Future Enhancements

1. **Real-time Collaboration**: Supabase realtime for live edits
2. **Export Formats**: PDF, DOCX, JSON resume exports
3. **Template System**: Multiple resume designs
4. **Analytics**: Track resume views and engagement
5. **Integration**: ATS optimization suggestions
6. **Mobile App**: React Native version

## Troubleshooting

### Supabase Connection Issues
- Verify environment variables in Vercel UI
- Check network tab for 401 errors
- Ensure email verification for new users

### Authentication Issues
- Check browser cookies are enabled
- Verify redirect URL matches env config
- Clear browser cache and retry

### AI Skill Analysis Fails
- Ensure OpenAI API key is valid
- Check experience data is provided
- Review AI Gateway configuration

## Contributing

1. Create feature branch from `main`
2. Follow TypeScript and naming conventions
3. Test locally with `npm run dev`
4. Create PR with description
5. Deploy to staging for review

## License

MIT License - See LICENSE file for details
