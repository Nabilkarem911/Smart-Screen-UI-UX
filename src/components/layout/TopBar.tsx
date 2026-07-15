import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Search, Globe, User, LogOut, ChevronDown, KeyRound, Moon, Sun, Monitor, AlertCircle, CheckCircle2, Clock, Tablet, Image as ImageIcon, Settings, Users as UsersIcon, BarChart3, Calendar, FileText, CornerDownLeft, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { useI18n } from '@/context/I18nContext'

const notifications = [
  { id: 1, icon: AlertCircle, title: 'شاشة "الخارج" متوقفة', desc: 'الجهاز غير متصل منذ 3 ساعات', time: 'منذ 5 د', color: 'red', unread: true },
  { id: 2, icon: CheckCircle2, title: 'تم حفظ شاشة الاستقبال', desc: 'تم تحديث المحتوى بنجاح', time: 'منذ 15 د', color: 'emerald', unread: true },
  { id: 3, icon: Monitor, title: 'جهاز جديد متصل', desc: 'جهاز "خميس" تم ربطه بنجاح', time: 'منذ ساعة', color: 'blue', unread: true },
  { id: 4, icon: Clock, title: 'الاشتراك ينتهي قريباً', desc: 'باقي 23 يوم على انتهاء الباقة', time: 'منذ يوم', color: 'gold', unread: false },
]

const notifColorMap: Record<string, string> = {
  red: 'bg-red-50 text-red-500',
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  gold: 'bg-gold-50 text-gold-600',
}

export default function TopBar({ onMobileMenu }: { onMobileMenu?: () => void }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { lang, setLang, t } = useI18n()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchActiveIndex, setSearchActiveIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    const pages = [
      { type: 'page', label: 'لوحة التحكم', path: '/', icon: Monitor, category: 'صفحات' },
      { type: 'page', label: 'الشاشات', path: '/screens', icon: Monitor, category: 'صفحات' },
      { type: 'page', label: 'الأجهزة', path: '/devices', icon: Tablet, category: 'صفحات' },
      { type: 'page', label: 'مكتبة الوسائط', path: '/media', icon: ImageIcon, category: 'صفحات' },
      { type: 'page', label: 'التحليلات', path: '/analytics', icon: BarChart3, category: 'صفحات' },
      { type: 'page', label: 'الجدولة', path: '/calendar', icon: Calendar, category: 'صفحات' },
      { type: 'page', label: 'المستخدمين', path: '/users', icon: UsersIcon, category: 'صفحات' },
      { type: 'page', label: 'الإشعارات', path: '/notifications', icon: Bell, category: 'صفحات' },
      { type: 'page', label: 'الملف الشخصي', path: '/profile', icon: User, category: 'صفحات' },
      { type: 'page', label: 'الإعدادات', path: '/settings', icon: Settings, category: 'صفحات' },
    ]
    const screens = [
      { type: 'screen', label: 'شاشة الاستقبال', path: '/screens', icon: Monitor, category: 'شاشات' },
      { type: 'screen', label: 'شاشة الكافيه', path: '/screens', icon: Monitor, category: 'شاشات' },
      { type: 'screen', label: 'شاشة الممر', path: '/screens', icon: Monitor, category: 'شاشات' },
      { type: 'screen', label: 'الشاشة الرئيسية', path: '/screens', icon: Monitor, category: 'شاشات' },
    ]
    const devices = [
      { type: 'device', label: 'iPad-Pro', path: '/devices', icon: Tablet, category: 'أجهزة' },
      { type: 'device', label: 'Samsung TV', path: '/devices', icon: Monitor, category: 'أجهزة' },
      { type: 'device', label: 'Android Tablet', path: '/devices', icon: Tablet, category: 'أجهزة' },
    ]
    const users = [
      { type: 'user', label: 'نبيل كريم', path: '/users', icon: User, category: 'مستخدمين' },
      { type: 'user', label: 'أحمد محمد', path: '/users', icon: User, category: 'مستخدمين' },
    ]
    const all = [...pages, ...screens, ...devices, ...users]
    return all.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8)
  }, [searchQuery])

  useEffect(() => {
    setSearchActiveIndex(0)
  }, [searchQuery])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSearchActiveIndex((prev) => Math.min(prev + 1, searchResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSearchActiveIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && searchResults[searchActiveIndex]) {
      e.preventDefault()
      navigate(searchResults[searchActiveIndex].path)
      setSearchOpen(false)
      setSearchQuery('')
    } else if (e.key === 'Escape') {
      setSearchOpen(false)
    }
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-slate-200/40">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Mobile Menu + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onMobileMenu}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        {/* Search */}
        <div className="relative flex-1" ref={searchRef}>
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true) }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={handleSearchKeyDown}
            placeholder={t('common.search')}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all"
          />
          {searchOpen && searchQuery && (
            <div className="absolute top-full mt-2 w-full glass-card p-2 animate-fade-in max-h-96 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="text-center py-6">
                  <Search className="w-6 h-6 text-slate-200 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">لا توجد نتائج لـ "ـ{searchQuery}"</p>
                </div>
              ) : (
                <>
                  {searchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => { navigate(result.path); setSearchOpen(false); setSearchQuery('') }}
                      onMouseEnter={() => setSearchActiveIndex(i)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-right',
                        searchActiveIndex === i ? 'bg-royal-50' : 'hover:bg-slate-50'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                        searchActiveIndex === i ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500'
                      )}>
                        <result.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-medium truncate', searchActiveIndex === i ? 'text-royal-700' : 'text-slate-700')}>
                          {result.label}
                        </p>
                        <p className="text-[10px] text-slate-400">{result.category}</p>
                      </div>
                      {searchActiveIndex === i && <CornerDownLeft className="w-3.5 h-3.5 text-royal-400" />}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all text-sm"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-gold-400 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute left-0 mt-2 w-80 glass-card p-0 animate-fade-in overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/40">
                  <h3 className="text-sm font-bold text-slate-900">التنبيهات</h3>
                  <span className="text-xs text-royal-600 font-medium cursor-pointer hover:text-royal-700">تعليم الكل كمقروء</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100/50',
                        n.unread && 'bg-royal-50/30'
                      )}
                    >
                      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', notifColorMap[n.color])}>
                        <n.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 font-medium truncate">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{n.desc}</p>
                        <p className="text-[10px] text-slate-300 mt-1">{n.time}</p>
                      </div>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-royal-500 flex-shrink-0 mt-1.5" />}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-200/40 text-center">
                  <button className="text-xs text-royal-600 font-medium hover:text-royal-700">عرض كل التنبيهات</button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-royal-gradient flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'م'}
              </div>
              <div className="hidden md:block text-right">
                <p className="text-slate-900 text-sm font-semibold leading-tight">{user?.name || 'مدير النظام'}</p>
                <p className="text-slate-400 text-xs">{user?.role || 'ADMIN'}</p>
              </div>
              <ChevronDown className={cn('hidden md:block w-4 h-4 text-slate-400 transition-transform', userMenuOpen && 'rotate-180')} />
            </button>

            {userMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 glass-card p-2 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-200/40 mb-1">
                  <p className="text-slate-900 text-sm font-semibold">{user?.name || 'مدير النظام'}</p>
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
