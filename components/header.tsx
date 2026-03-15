'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Sparkles className="h-6 w-6" />
          <span>ResumeVibe</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#timeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Timeline
          </Link>
          <Link href="#ai-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            AI Analysis
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-accent/10 rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-card p-4 space-y-3">
          <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#timeline" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Timeline
          </Link>
          <Link href="#ai-analysis" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
            AI Analysis
          </Link>
          <Link href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" asChild className="flex-1">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button variant="default" size="sm" asChild className="flex-1">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
