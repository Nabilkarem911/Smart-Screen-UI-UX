import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: number
  type: ToastType
  message: string
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const toastConfig: Record<ToastType, { icon: typeof CheckCircle2; bg: string; border: string; text: string }> = {
  success: { icon: CheckCircle2, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  warning: { icon: AlertCircle, bg: 'bg-gold-50', border: 'border-gold-200', text: 'text-gold-700' },
  info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => remove(id), 4000)
  }, [remove])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 left-6 z-[200] space-y-2 pointer-events-none">
        {toasts.map((t) => {
          const config = toastConfig[t.type]
          const Icon = config.icon
          return (
            <div
              key={t.id}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg backdrop-blur-sm min-w-[280px] max-w-sm pointer-events-auto animate-slide-in',
                config.bg, config.border
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', config.text)} />
              <span className={cn('text-sm font-medium flex-1', config.text)}>{t.message}</span>
              <button
                onClick={() => remove(t.id)}
                className={cn('p-1 rounded-lg hover:bg-black/5 transition-all', config.text)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
