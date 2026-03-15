export type Message = 'error' | 'success' | string | null | boolean

interface FormMessageProps {
  message?: Message
}

export function FormMessage({ message }: FormMessageProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md px-4">
      {typeof message === 'string' && (
        <div className="text-sm px-4 py-2.5 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {message}
        </div>
      )}
    </div>
  )
}
