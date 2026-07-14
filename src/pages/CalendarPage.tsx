import { useState } from 'react'
import {
  ChevronRight, ChevronLeft, Plus, Clock, Monitor, Smartphone,
  X, Calendar as CalendarIcon, List, Grid3x3, Trash2, Edit2,
  Play, Pause, Repeat,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']

interface ScheduleItem {
  id: number
  day: number
  title: string
  screen: string
  time: string
  type: 'once' | 'daily' | 'weekly'
  color: string
}

const initialSchedules: ScheduleItem[] = [
  { id: 1, day: 3, title: 'عرض الصباح', screen: 'شاشة الاستقبال', time: '08:00', type: 'daily', color: 'royal' },
  { id: 2, day: 3, title: 'العروض الأسبوعية', screen: 'شاشة الكافيه', time: '14:00', type: 'weekly', color: 'emerald' },
  { id: 3, day: 7, title: 'إعلان نهاية الشهر', screen: 'الشاشة الرئيسية', time: '18:00', type: 'once', color: 'gold' },
  { id: 4, day: 12, title: 'عرض المساء', screen: 'شاشة الممر', time: '20:00', type: 'daily', color: 'blue' },
  { id: 5, day: 15, title: 'عرض خاص', screen: 'شاشة الاستقبال', time: '10:00', type: 'once', color: 'royal' },
  { id: 6, day: 18, title: 'ترويج الأسبوع', screen: 'شاشة الكافيه', time: '12:00', type: 'weekly', color: 'emerald' },
  { id: 7, day: 22, title: 'محتوى جديد', screen: 'الشاشة الرئيسية', time: '16:00', type: 'once', color: 'gold' },
  { id: 8, day: 25, title: 'عرض نهاية الأسبوع', screen: 'شاشة الممر', time: '19:00', type: 'weekly', color: 'blue' },
]

const colorClasses: Record<string, string> = {
  royal: 'bg-royal-50 border-royal-300 text-royal-700',
  emerald: 'bg-emerald-50 border-emerald-300 text-emerald-700',
  gold: 'bg-gold-50 border-gold-300 text-gold-700',
  blue: 'bg-blue-50 border-blue-300 text-blue-700',
}

const typeLabels: Record<string, string> = {
  once: 'مرة واحدة',
  daily: 'يومي',
  weekly: 'أسبوعي',
}

const typeIcons: Record<string, typeof Play> = {
  once: Play,
  daily: Repeat,
  weekly: CalendarIcon,
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(5) // June (0-indexed)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [schedules, setSchedules] = useState(initialSchedules)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [newSchedule, setNewSchedule] = useState<{ title: string; screen: string; time: string; type: 'once' | 'daily' | 'weekly' }>({ title: '', screen: '', time: '12:00', type: 'once' })

  const year = 2024
  const firstDay = new Date(year, currentMonth, 1).getDay()
  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate()
  const today = 14

  const prevMonth = () => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
  const nextMonth = () => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))

  const handleAddSchedule = () => {
    if (!selectedDay || !newSchedule.title) return
    const colors = ['royal', 'emerald', 'gold', 'blue']
    setSchedules((prev) => [...prev, {
      id: Date.now(),
      day: selectedDay,
      title: newSchedule.title,
      screen: newSchedule.screen || 'شاشة الاستقبال',
      time: newSchedule.time,
      type: newSchedule.type,
      color: colors[Math.floor(Math.random() * colors.length)],
    }])
    setShowAddModal(false)
    setNewSchedule({ title: '', screen: '', time: '12:00', type: 'once' })
    setSelectedDay(null)
  }

  const handleDeleteSchedule = (id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id))
  }

  const getSchedulesForDay = (day: number) => schedules.filter((s) => s.day === day)

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">جدولة المحتوى</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة وعرض جدول المحتوى على الشاشات</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setView('calendar')}
              className={cn('p-1.5 rounded-lg transition-all', view === 'calendar' ? 'bg-white text-royal-600 shadow-sm' : 'text-slate-400')}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn('p-1.5 rounded-lg transition-all', view === 'list' ? 'bg-white text-royal-600 shadow-sm' : 'text-slate-400')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => { setSelectedDay(today); setShowAddModal(true) }}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            جدولة جديدة
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'جدول نشط', value: schedules.length, icon: Play, color: 'royal' },
          { label: 'جدول يومي', value: schedules.filter((s) => s.type === 'daily').length, icon: Repeat, color: 'emerald' },
          { label: 'جدول أسبوعي', value: schedules.filter((s) => s.type === 'weekly').length, icon: CalendarIcon, color: 'gold' },
          { label: 'جدول لمرة واحدة', value: schedules.filter((s) => s.type === 'once').length, icon: Clock, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', colorClasses[stat.color])}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {view === 'calendar' ? (
        /* Calendar View */
        <div className="glass-card p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">{months[currentMonth]} {year}</h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {days.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={i} className="aspect-square" />
              const daySchedules = getSchedulesForDay(day)
              const isToday = day === today
              return (
                <div
                  key={i}
                  onClick={() => { setSelectedDay(day); setShowAddModal(true) }}
                  className={cn(
                    'aspect-square p-1.5 rounded-xl border cursor-pointer transition-all hover:shadow-md',
                    isToday ? 'border-royal-500 bg-royal-50/30' : 'border-slate-100 hover:border-royal-200',
                    daySchedules.length > 0 && !isToday && 'bg-slate-50/50'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      'text-xs font-semibold',
                      isToday ? 'text-royal-600' : 'text-slate-600'
                    )}>
                      {day}
                    </span>
                    {daySchedules.length > 0 && (
                      <span className="text-[9px] bg-royal-500 text-white rounded-full px-1.5 py-0.5 font-bold">
                        {daySchedules.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    {daySchedules.slice(0, 2).map((s) => (
                      <div
                        key={s.id}
                        className={cn('text-[9px] px-1.5 py-0.5 rounded-md border truncate', colorClasses[s.color])}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {s.time} {s.title}
                      </div>
                    ))}
                    {daySchedules.length > 2 && (
                      <div className="text-[9px] text-slate-400 px-1.5">+{daySchedules.length - 2} المزيد</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-right">
                  <th className="p-4 text-sm font-semibold text-slate-500">العنوان</th>
                  <th className="p-4 text-sm font-semibold text-slate-500">الشاشة</th>
                  <th className="p-4 text-sm font-semibold text-slate-500">الوقت</th>
                  <th className="p-4 text-sm font-semibold text-slate-500">التاريخ</th>
                  <th className="p-4 text-sm font-semibold text-slate-500">التكرار</th>
                  <th className="p-4 text-sm font-semibold text-slate-500">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {schedules.sort((a, b) => a.day - b.day).map((s) => {
                  const TypeIcon = typeIcons[s.type]
                  return (
                    <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={cn('w-2 h-2 rounded-full', `bg-${s.color}-500`)} />
                          <span className="text-sm font-medium text-slate-900">{s.title}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-600">{s.screen}</span>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {s.time}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-600">{s.day} {months[currentMonth]}</span>
                      </td>
                      <td className="p-4">
                        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border', colorClasses[s.color])}>
                          <TypeIcon className="w-3 h-3" />
                          {typeLabels[s.type]}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(s.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">جدولة جديدة</h2>
                <p className="text-xs text-slate-400 mt-0.5">{selectedDay} {months[currentMonth]} {year}</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">عنوان الجدولة</label>
                <input
                  type="text"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                  placeholder="مثال: عرض الصباح"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">الشاشة</label>
                <select
                  value={newSchedule.screen}
                  onChange={(e) => setNewSchedule({ ...newSchedule, screen: e.target.value })}
                  className="input-field"
                >
                  <option value="">اختر شاشة</option>
                  <option value="شاشة الاستقبال">شاشة الاستقبال</option>
                  <option value="شاشة الكافيه">شاشة الكافيه</option>
                  <option value="الشاشة الرئيسية">الشاشة الرئيسية</option>
                  <option value="شاشة الممر">شاشة الممر</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">الوقت</label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">نوع التكرار</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: 'once' as const, label: 'مرة واحدة', icon: Play },
                    { key: 'daily' as const, label: 'يومي', icon: Repeat },
                    { key: 'weekly' as const, label: 'أسبوعي', icon: CalendarIcon },
                  ]).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setNewSchedule({ ...newSchedule, type: opt.key })}
                      className={cn(
                        'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all',
                        newSchedule.type === opt.key
                          ? 'bg-royal-50 border-royal-500 text-royal-700'
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-royal-200'
                      )}
                    >
                      <opt.icon className="w-4 h-4" />
                      <span className="text-[10px] font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="btn-ghost flex-1">إلغاء</button>
                <button onClick={handleAddSchedule} className="btn-primary flex-1">حفظ الجدولة</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
