import { signup } from '@/app/auth/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { SmtpMessage } from '@/components/smtp-message'

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center justify-center gap-2 px-4">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <Card className="w-full animate-in">
      <div className="p-8">
        <h1 className="text-2xl font-bold">Create Your Account</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>

        <form action={signup} className="flex flex-col gap-4 mt-8">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1.5">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              required
              className="h-10"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1.5">
              Username
            </label>
            <Input
              id="username"
              name="username"
              placeholder="johndoe"
              required
              className="h-10"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-10"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="h-10"
            />
          </div>

          <SubmitButton pendingText="Creating account..." className="mt-2 w-full">
            Sign Up
          </SubmitButton>

          <FormMessage message={searchParams} />
        </form>

        <SmtpMessage />
      </div>
    </Card>
  )
}
