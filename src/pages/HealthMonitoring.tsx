import { useState } from 'react'
import {
  Activity, Heart, Cpu, HardDrive, Wifi, Battery, Zap,
  AlertCircle, CheckCircle2, Clock, TrendingUp, TrendingDown,
  RefreshCw, Eye, ChevronRight, Server, Database, Globe,
  Bell, Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface HealthMetric {
  id: number
  name: string
  value: number
  unit: string
  status: 'healthy' | 'warning' | 'critical'
  icon: any
  color: string
  max: number
  history: number[]
}

interface DeviceHealth {
  id: number
  name: string
  type: 'server' | 'screen' | 'player' | 'network'
  status: 'online' | 'degraded' | 'offline'
  uptime: string
  cpu: number
  ram: number
  temp: number
  lastCheck: string
}

interface Alert {
  id: number
  severity: 'critical' | 'warning' | 'info'
  message: string
  device: string
  time: string
  resolved: boolean
}

const metrics: HealthMetric[] = [
  { id: 1, name: 'CPU', value: 42, unit: '%', status: 'healthy', icon: Cpu, color: 'royal', max: 100, history: [35, 40, 38, 45, 42, 48, 42] },
  { id: 2, name: 'الذاكرة', value: 68, unit: '%', status: 'warning', icon: HardDrive, color: 'gold', max: 100, history: [55, 60, 58, 65, 62, 68, 68] },
  { id: 3, name: 'التخزين', value: 81, unit: '%', status: 'warning', icon: Database, color: 'gold', max: 100, history: [70, 72, 75, 78, 79, 80, 81] },
  { id: 4, name: 'الشبكة', value: 95, unit: '%', status: 'healthy', icon: Wifi, color: 'emerald', max: 100, history: [90, 92, 88, 94, 95, 93, 95] },
  { id: 5, name: 'البطارية', value: 87, unit: '%', status: 'healthy', icon: Battery, color: 'emerald', max: 100, history: [100, 98, 95, 92, 90, 88, 87] },
  { id: 6, name: 'درجة الحرارة', value: 72, unit: '°C', status: 'warning', icon: Activity, color: 'gold', max: 100, history: [60, 65, 68, 70, 71, 72, 72] },
]

const devices: DeviceHealth[] = [
  { id: 1, name: 'الخادم الرئيسي', type: 'server', status: 'online', uptime: '99.9%', cpu: 42, ram: 68, temp: 72, lastCheck: 'منذ ثانية' },
  { id: 2, name: 'شاشة الاستقبال', type: 'screen', status: 'online', uptime: '99.5%', cpu: 25, ram: 45, temp: 55, lastCheck: 'منذ 5 ثواني' },
  { id: 3, name: 'شاشة الكافيه', type: 'screen', status: 'degraded', uptime: '97.2%', cpu: 78, ram: 85, temp: 80, lastCheck: 'منذ 10 ثواني' },
  { id: 4, name: 'مشغل المطعم', type: 'player', status: 'online', uptime: '99.8%', cpu: 35, ram: 52, temp: 60, lastCheck: 'منذ ثانية' },
  { id: 5, name: 'شاشة الخروج', type: 'screen', status: 'offline', uptime: '0%', cpu: 0, ram: 0, temp: 0, lastCheck: 'منذ ساعة' },
  { id: 6, name: 'موجه الشبكة', type: 'network', status: 'online', uptime: '100%', cpu: 15, ram: 30, temp: 45, lastCheck: 'منذ ثانية' },
  { id: 7, name: 'مشغل قاعة الاجتماعات', type: 'player', status: 'degraded', uptime: '95.5%', cpu: 82, ram: 90, temp: 85, lastCheck: 'منذ 15 ثانية' },
  { id: 8, name: 'شاشة المصعد', type: 'screen', status: 'online', uptime: '99.3%', cpu: 20, ram: 40, temp: 50, lastCheck: 'منذ 3 ثواني' },
]

const alerts: Alert[] = [
  { id: 1, severity: 'critical', message: 'شاشة الخروج غير متصلة', device: 'شاشة الخروج', time: 'منذ ساعة', resolved: false },
  { id: 2, severity: 'warning', message: 'استخدام CPU مرتفع على مشغل قاعة الاجتماعات', device: 'مشغل قاعة الاجتماعات', time: 'منذ 15 دقيقة', resolved: false },
  { id: 3, severity: 'warning', message: 'درجة حرارة عالية على شاشة الكافيه', device: 'شاشة الكافيه', time: 'منذ 30 دقيقة', resolved: false },
  { id: 4, severity: 'warning', message: 'مساحة التخزين تنفد (81%)', device: 'الخادم الرئيسي', time: 'منذ ساعة', resolved: false },
  { id: 5, severity: 'info', message: 'تم تحديث مشغل المطعم بنجاح', device: 'مشغل المطعم', time: 'منذ 3 ساعات', resolved: true },
  { id: 6, severity: 'info', message: 'نسخة احتياطية مكتملة', device: 'الخادم الرئيسي', time: 'منذ 5 ساعات', resolved: true },
]

const statusConfig = {
  healthy: { label: 'سليم', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', icon: CheckCircle2 },
  warning: { label: 'تحذير', bg: 'bg-gold-50', text: 'text-gold-600', dot: 'bg-gold-500', icon: AlertCircle },
  critical: { label: 'حرج', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-500', icon: AlertCircle },
}

const deviceStatusConfig = {
  online: { label: 'متصل', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  degraded: { label: 'أداء ضعيف', bg: 'bg-gold-50', text: 'text-gold-600', dot: 'bg-gold-500' },
  offline: { label: 'غير متصل', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-500' },
}

const deviceIcons = { server: Server, screen: Activity, player: Cpu, network: Globe }

const severityConfig = {
  critical: { bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200', icon: AlertCircle },
  warning: { bg: 'bg-gold-50', text: 'text-gold-600', border: 'border-gold-200', icon: AlertCircle },
  info: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: CheckCircle2 },
}

export default function HealthMonitoring() {
  const { toast } = useToast()
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState('all')

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      toast('تم تحديث الحالة', 'success')
    }, 1500)
  }

  const filteredDevices = devices.filter((d) => filter === 'all' || d.status === filter)
  const activeAlerts = alerts.filter((a) => !a.resolved)

  const overallHealth = Math.round(
    (devices.filter((d) => d.status === 'online').length / devices.length) * 100
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">مراقبة صحة النظام</h1>
            <p className="text-slate-400 text-sm mt-1">تتبع حالة الأجهزة والموارد في الوقت الفعلي</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="btn-ghost flex items-center gap-2 text-sm"
          >
            <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
            تحديث
          </button>
        </div>
      </div>

      {/* Overall Health */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-100" />
                <circle
                  cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6"
                  className={cn(
                    overallHealth >= 80 ? 'text-emerald-500' : overallHealth >= 60 ? 'text-gold-500' : 'text-red-500'
                  )}
                  strokeDasharray={`${(overallHealth / 100) * 213.6} 213.6`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">{overallHealth}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">الصحة العامة للنظام</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {devices.filter((d) => d.status === 'online').length} متصل •
                {' '}{devices.filter((d) => d.status === 'degraded').length} أداء ضعيف •
                {' '}{devices.filter((d) => d.status === 'offline').length} غير متصل
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md',
                  overallHealth >= 80 ? 'bg-emerald-50 text-emerald-600' : overallHealth >= 60 ? 'bg-gold-50 text-gold-600' : 'bg-red-50 text-red-500')}>
                  <span className={cn('w-1.5 h-1.5 rounded-full',
                    overallHealth >= 80 ? 'bg-emerald-500' : overallHealth >= 60 ? 'bg-gold-500' : 'bg-red-500')} />
                  {overallHealth >= 80 ? 'سليم' : overallHealth >= 60 ? 'تحذير' : 'حرج'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeAlerts.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-semibold">
                <Bell className="w-4 h-4 animate-pulse" />
                {activeAlerts.length} تنبيه نشط
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const status = statusConfig[metric.status]
          const StatusIcon = status.icon
          const pct = (metric.value / metric.max) * 100
          return (
            <div key={metric.id} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', `bg-${metric.color}-50 text-${metric.color}-600`)}>
                    <metric.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{metric.name}</p>
                    <p className="text-lg font-bold text-slate-900">{metric.value}{metric.unit}</p>
                  </div>
                </div>
                <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md', status.bg, status.text)}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-1 h-8 mb-2">
                {metric.history.map((v, i) => (
                  <div
                    key={i}
                    className={cn('flex-1 rounded-t', metric.status === 'healthy' ? 'bg-emerald-300' : metric.status === 'warning' ? 'bg-gold-300' : 'bg-red-300')}
                    style={{ height: `${(v / metric.max) * 100}%` }}
                  />
                ))}
              </div>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={cn('h-full rounded-full', metric.status === 'healthy' ? 'bg-emerald-500' : metric.status === 'warning' ? 'bg-gold-500' : 'bg-red-500')}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Devices */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">حالة الأجهزة</h3>
              <div className="flex items-center gap-1.5">
                {['all', 'online', 'degraded', 'offline'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all',
                      filter === f ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {f === 'all' ? 'الكل' : deviceStatusConfig[f as keyof typeof deviceStatusConfig].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {filteredDevices.map((device) => {
                const status = deviceStatusConfig[device.status]
                const Icon = deviceIcons[device.type]
                return (
                  <div key={device.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all">
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', status.bg, status.text)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 truncate">{device.name}</p>
                        <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded', status.bg, status.text)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {device.uptime}</span>
                        {device.status !== 'offline' && (
                          <>
                            <span className="flex items-center gap-0.5">
                              <Cpu className="w-3 h-3" /> {device.cpu}%
                            </span>
                            <span className="flex items-center gap-0.5">
                              <HardDrive className="w-3 h-3" /> {device.ram}%
                            </span>
                            <span className={cn('flex items-center gap-0.5', device.temp > 75 ? 'text-red-500 font-semibold' : '')}>
                              <Activity className="w-3 h-3" /> {device.temp}°C
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-300 flex-shrink-0">{device.lastCheck}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-400" />
              التنبيهات ({activeAlerts.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {alerts.map((alert) => {
                const sev = severityConfig[alert.severity]
                const SevIcon = sev.icon
                return (
                  <div
                    key={alert.id}
                    className={cn(
                      'rounded-xl p-3 border',
                      alert.resolved ? 'bg-slate-50 border-slate-100 opacity-60' : `${sev.bg} ${sev.border}`
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <SevIcon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', sev.text)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 leading-snug">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span>{alert.device}</span>
                          <span>•</span>
                          <span>{alert.time}</span>
                        </div>
                      </div>
                      {alert.resolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                    </div>
                    {!alert.resolved && (
                      <button
                        onClick={() => toast('تم حل التنبيه', 'success')}
                        className="mt-2 text-[10px] text-royal-600 font-semibold hover:text-royal-700"
                      >
                        تحديد كمحلول
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* System Info */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" />
              معلومات النظام
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'إصدار النظام', value: 'v2.4.1' },
                { label: 'آخر تحديث', value: 'منذ 3 أيام' },
                { label: 'النسخ الاحتياطي', value: 'تلقائي - يومي' },
                { label: 'آخر نسخة', value: 'اليوم 3:00 ص' },
                { label: 'الشهادات', value: 'سارية' },
              ].map((info, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-400">{info.label}</span>
                  <span className="font-semibold text-slate-700">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
