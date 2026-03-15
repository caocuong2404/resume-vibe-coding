'use client'

import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { signout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-semibold">
          {getInitials(user.email || 'U')}
        </div>
        <span className="text-sm font-medium hidden sm:inline">{user.email}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-border">
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <div className="p-2">
            <form action={signout}>
              <button
                type="submit"
                className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-muted rounded transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
