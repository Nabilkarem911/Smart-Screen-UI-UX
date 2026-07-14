import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Search, Globe, User, LogOut, ChevronDown, KeyRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

export default function TopBar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-slate-200/40">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="بحث سريع..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all text-sm"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'ar' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-400 ring-2 ring-white" />
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-royal-gradient flex items-center justify-center text-white font-bold text-sm">
                {user?.username?.charAt(0).toUpperCase() || 'ب'}
              </div>
              <div className="hidden md:block text-right">
                <p className="text-slate-900 text-sm font-semibold leading-tight">{user?.username || 'bshml'}</p>
                <p className="text-slate-400 text-xs">{user?.role || 'مدير النظام'}</p>
              </div>
              <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', userMenuOpen && 'rotate-180')} />
            </button>

            {userMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 glass-card p-2 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-200/40 mb-1">
                  <p className="text-slate-900 text-sm font-semibold">{user?.username || 'bshml'}</p>
                  <p className="text-slate-400 text-xs">{user?.email || 'admin@smartscreen.com'}</p>
                </div>
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm">
                  <User className="w-4 h-4" />
                  <span>الملف الشخصي</span>
                </button>
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm">
                  <KeyRound className="w-4 h-4" />
                  <span>تغيير كلمة المرور</span>
                </button>
                <div className="border-t border-slate-200/40 mt-1 pt-1">
                  <button
                    onClick={() => { logout(); navigate('/login') }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 transition-all text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
