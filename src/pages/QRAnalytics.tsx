import { useState } from 'react'
import {
  QrCode, ScanLine, TrendingUp, Eye, Clock, Smartphone,
  MapPin, Download, Plus, Copy, BarChart3, Zap, Users,
  Globe, ChevronRight, CheckCircle2, AlertCircle, RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface QRCode {
  id: number
  name: string
  screen: string
  url: string
  scans: number
  uniqueScans: number
  status: 'active' | 'paused' | 'expired'
  createdAt: string
  topDevices: { device: string; percent: number }[]
  topLocations: { city: string; scans: number }[]
}

const qrCodes: QRCode[] = [
  {
    id: 1,
    name: 'عرض الكافيه الصباحي',
    screen: 'شاشة الكافيه',
    url: 'smartscreen.app/offer/cafe-morning',
    scans: 1240,
    uniqueScans: 980,
    status: 'active',
    createdAt: 'منذ 5 أيام',
    topDevices: [
      { device: 'iPhone', percent: 45 },
      { device: 'Android', percent: 38 },
      { device: 'iPad', percent: 12 },
      { device: 'أخرى', percent: 5 },
    ],
    topLocations: [
      { city: 'الرياض', scans: 520 },
      { city: 'جدة', scans: 340 },
      { city: 'الدمام', scans: 180 },
      { city: 'مكة', scans: 120 },
    ],
  },
  {
    id: 2,
    name: 'قائمة الطعام',
    screen: 'شاشة المطعم',
    url: 'smartscreen.app/menu/restaurant',
    scans: 890,
    uniqueScans: 720,
    status: 'active',
    createdAt: 'منذ أسبوع',
    topDevices: [
      { device: 'iPhone', percent: 52 },
      { device: 'Android', percent: 33 },
      { device: 'iPad', percent: 10 },
      { device: 'أخرى', percent: 5 },
    ],
    topLocations: [
      { city: 'الرياض', scans: 380 },
      { city: 'جدة', scans: 250 },
      { city: 'الدمام', scans: 140 },
      { city: 'أبها', scans: 80 },
    ],
  },
  {
    id: 3,
    name: 'حجز موعد',
    screen: 'شاشة الاستقبال',
    url: 'smartscreen.app/booking',
    scans: 567,
    uniqueScans: 445,
    status: 'active',
    createdAt: 'منذ 3 أيام',
    topDevices: [
      { device: 'iPhone', percent: 48 },
      { device: 'Android', percent: 42 },
      { device: 'iPad', percent: 7 },
      { device: 'أخرى', percent: 3 },
    ],
    topLocations: [
      { city: 'الرياض', scans: 230 },
      { city: 'جدة', scans: 165 },
      { city: 'الدمام', scans: 95 },
      { city: 'الطائف', scans: 50 },
    ],
  },
  {
    id: 4,
    name: 'عرض نهاية الأسبوع',
    screen: 'شاشة الخروج',
    url: 'smartscreen.app/offer/weekend',
    scans: 320,
    uniqueScans: 280,
    status: 'paused',
    createdAt: 'منذ أسبوعين',
    topDevices: [
      { device: 'iPhone', percent: 41 },
      { device: 'Android', percent: 44 },
      { device: 'iPad', percent: 11 },
      { device: 'أخرى', percent: 4 },
    ],
    topLocations: [
      { city: 'الرياض', scans: 140 },
      { city: 'جدة', scans: 90 },
      { city: 'الدمام', scans: 55 },
      { city: 'مكة', scans: 35 },
    ],
  },
]

const statusConfig = {
  active: { label: 'نشط', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  paused: { label: 'متوقف', bg: 'bg-gold-50', text: 'text-gold-600', dot: 'bg-gold-500' },
  expired: { label: 'منتهي', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-500' },
}

// Mock scan timeline data (last 7 days)
const scanTimeline = [
  { day: 'السبت', scans: 145 },
  { day: 'الأحد', scans: 180 },
  { day: 'الإثنين', scans: 210 },
  { day: 'الثلاثاء', scans: 175 },
  { day: 'الأربعاء', scans: 240 },
  { day: 'الخميس', scans: 290 },
  { day: 'الجمعة', scans: 165 },
]

export default function QRAnalytics() {
  const { toast } = useToast()
  const [selectedQR, setSelectedQR] = useState<QRCode>(qrCodes[0])
  const [showCreate, setShowCreate] = useState(false)

  const totalScans = qrCodes.reduce((sum, q) => sum + q.scans, 0)
  const totalUnique = qrCodes.reduce((sum, q) => sum + q.uniqueScans, 0)
  const activeCount = qrCodes.filter((q) => q.status === 'active').length
  const maxDayScans = Math.max(...scanTimeline.map((d) => d.scans))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">تحليلات QR Codes</h1>
            <p className="text-slate-400 text-sm mt-1">تتبع مسح رموز QR المعروضة على شاشاتك</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          QR Code جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي المسحات', value: totalScans.toLocaleString(), icon: ScanLine, color: 'royal' },
          { label: 'مسحات فريدة', value: totalUnique.toLocaleString(), icon: Users, color: 'emerald' },
          { label: 'QR Codes نشطة', value: activeCount, icon: CheckCircle2, color: 'gold' },
          { label: 'معدل التحويل', value: '24%', icon: TrendingUp, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', `bg-${stat.color}-50 text-${stat.color}-600`)}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Codes List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 px-1">الرموز النشطة</h3>
          {qrCodes.map((qr) => {
            const status = statusConfig[qr.status]
            return (
              <button
                key={qr.id}
                onClick={() => setSelectedQR(qr)}
                className={cn(
                  'w-full glass-card p-4 text-right transition-all',
                  selectedQR.id === qr.id ? 'ring-2 ring-royal-500 shadow-md' : 'hover:shadow-md'
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{qr.name}</p>
                      <p className="text-xs text-slate-400">{qr.screen}</p>
                    </div>
                  </div>
                  <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md flex-shrink-0', status.bg, status.text)}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <ScanLine className="w-3 h-3" />
                    {qr.scans.toLocaleString()} مسحة
                  </span>
                  <span className="text-slate-400">{qr.createdAt}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 space-y-4">
          {/* QR Preview + Info */}
          <div className="glass-card p-5">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                <QrCode className="w-14 h-14 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900">{selectedQR.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedQR.screen}</p>
                <div className="flex items-center gap-2 mt-2">
                  <code className="text-xs text-royal-600 bg-royal-50 px-2 py-1 rounded-md" dir="ltr">{selectedQR.url}</code>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(selectedQR.url); toast('تم نسخ الرابط', 'success') }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-royal-600 hover:bg-royal-50 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <button className="btn-ghost flex items-center gap-1.5 text-xs">
                    <Download className="w-3.5 h-3.5" />
                    تحميل QR
                  </button>
                  <button className="btn-ghost flex items-center gap-1.5 text-xs">
                    <RefreshCw className="w-3.5 h-3.5" />
                    إعادة توليد
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scan Timeline Chart */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">المسحات خلال الأسبوع</h3>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                آخر 7 أيام
              </span>
            </div>
            <div className="flex items-end justify-between gap-2 h-40">
              {scanTimeline.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">{day.scans}</span>
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full bg-royal-gradient rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${(day.scans / maxDayScans) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices + Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Devices */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-400" />
                الأجهزة
              </h3>
              <div className="space-y-3">
                {selectedQR.topDevices.map((device, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">{device.device}</span>
                      <span className="text-slate-400 font-bold">{device.percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', i === 0 ? 'bg-royal-gradient' : i === 1 ? 'bg-emerald-400' : i === 2 ? 'bg-gold-400' : 'bg-slate-300')}
                        style={{ width: `${device.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                المواقع
              </h3>
              <div className="space-y-2">
                {selectedQR.topLocations.map((loc, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold',
                        i === 0 ? 'bg-royal-gradient text-white' : 'bg-slate-200 text-slate-500')}>
                        {i + 1}
                      </div>
                      <span className="text-xs font-medium text-slate-700">{loc.city}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-600">{loc.scans}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'متوسط/يوم', value: Math.floor(selectedQR.scans / 7), icon: BarChart3, color: 'royal' },
              { label: 'معدل الإعادة', value: `${Math.round((1 - selectedQR.uniqueScans / selectedQR.scans) * 100)}%`, icon: RefreshCw, color: 'gold' },
              { label: 'معدل التحويل', value: '24%', icon: Zap, color: 'emerald' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2', `bg-${stat.color}-50 text-${stat.color}-600`)}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                <p className="text-[10px] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowCreate(false)}>
          <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">إنشاء QR Code</h3>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">الاسم</label>
                <input className="input-field text-sm" placeholder="مثال: عرض الصيف" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">الشاشة</label>
                <select className="input-field text-sm">
                  <option>شاشة الاستقبال</option>
                  <option>شاشة الكافيه</option>
                  <option>شاشة الخروج</option>
                  <option>شاشة المطعم</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">الرابط المستهدف</label>
                <input className="input-field text-sm" placeholder="https://..." dir="ltr" />
              </div>
              <button
                onClick={() => { setShowCreate(false); toast('تم إنشاء QR Code بنجاح', 'success') }}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                <QrCode className="w-4 h-4" />
                توليد QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
