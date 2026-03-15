import Link from 'next/link';

export const metadata = {
  title: 'Authentication - ResumeVibe',
  description: 'Sign in or create your account to showcase your resume',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border py-4 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground">RV</div>
          <span>ResumeVibe</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2026 ResumeVibe. All rights reserved.</p>
      </footer>
    </div>
  );
}
