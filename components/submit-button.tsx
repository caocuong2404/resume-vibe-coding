'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pendingText?: string
}

export function SubmitButton({
  children,
  pendingText,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      {...props}
      disabled={pending || props.disabled}
      type="submit"
      isLoading={pending}
    >
      {pending ? pendingText : children}
    </Button>
  )
}
