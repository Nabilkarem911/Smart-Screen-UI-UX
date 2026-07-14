import { useState } from 'react'
import {
  Webhook, Plus, X, Check, Copy, Trash2, RefreshCw, ExternalLink,
  Zap, Bell, MessageCircle, Mail, Slack, Github, Chrome,
  Activity, Code, Settings as SettingsIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

const integrations = [
  { id: 'slack', name: 'Slack', desc: 'إشعارات في قنوات Slack', icon: Slack, color: 'bg-violet-50 text-violet-600', connected: true, category: 'إشعارات' },
  { id: 'whatsapp', name: 'WhatsApp Business', desc: 'رسائل واتساب للعملاء', icon: MessageCircle, color: 'bg-emerald-50 text-emerald-600', connected: true, category: 'مراسلة' },
  { id: 'email', name: 'Email (SMTP)', desc: 'إرسال بريد إلكتروني', icon: Mail, color: 'bg-blue-50 text-blue-600', connected: true, category: 'إشعارات' },
  { id: 'chrome', name: 'Chrome Extension', desc: 'إدارة من المتصفح', icon: Chrome, color: 'bg-red-50 text-red-600', connected: false, category: 'أدوات' },
  { id: 'github', name: 'GitHub', desc: 'مزامنة المحتوى مع Git', icon: Github, color: 'bg-slate-100 text-slate-700', connected: false, category: 'تطوير' },
  { id: 'zapier', name: 'Zapier', desc: 'أتمتة سير العمل', icon: Zap, color: 'bg-gold-50 text-gold-600', connected: false, category: 'أتمتة' },
]

const webhooks = [
  { id: 1, url: 'https://api.example.com/hooks/screen-update', event: 'screen.updated', active: true, lastTriggered: 'منذ 5 دقائق' },
  { id: 2, url: 'https://api.example.com/hooks/device-online', event: 'device.online', active: true, lastTriggered: 'منذ ساعة' },
  { id: 3, url: 'https://api.example.com/hooks/device-offline', event: 'device.offline', active: true, lastTriggered: 'منذ 3 ساعات' },
  { id: 4, url: 'https://api.example.com/hooks/user-created', event: 'user.created', active: false, lastTriggered: 'منذ يوم' },
]

const events = [
  { value: 'screen.created', label: 'شاشة جديدة' },
  { value: 'screen.updated', label: 'تحديث شاشة' },
  { value: 'screen.deleted', label: 'حذف شاشة' },
  { value: 'device.online', label: 'جهاز متصل' },
  { value: 'device.offline', label: 'جهاز غير متصل' },
  { value: 'user.created', label: 'مستخدم جديد' },
  { value: 'user.updated', label: 'تحديث مستخدم' },
  { value: 'content.published', label: 'نشر محتوى' },
]

export default function WebhooksIntegrations() {
  const { toast } = useToast()
  const [showWebhookModal, setShowWebhookModal] = useState(false)
  const [webhookList, setWebhookList] = useState(webhooks)
  const [newWebhook, setNewWebhook] = useState({ url: '', event: 'screen.updated' })

  const handleAddWebhook = () => {
    if (!newWebhook.url) {
      toast('أدخل رابط الـ webhook', 'warning')
      return
    }
    setWebhookList((prev) => [...prev, {
      id: Date.now(),
      url: newWebhook.url,
      event: newWebhook.event,
      active: true,
      lastTriggered: 'لم يتم بعد',
    }])
    setShowWebhookModal(false)
    setNewWebhook({ url: '', event: 'screen.updated' })
    toast('تم إضافة الـ webhook بنجاح', 'success')
  }

  const toggleWebhook = (id: number) => {
    setWebhookList((prev) => prev.map((w) => w.id === id ? { ...w, active: !w.active } : w))
  }

  const deleteWebhook = (id: number) => {
    setWebhookList((prev) => prev.filter((w) => w.id !== id))
    toast('تم حذف الـ webhook', 'info')
  }

  const copyUrl = (url: string) => {
    navigator.clipboard?.writeText(url)
    toast('تم نسخ الرابط', 'success')
  }

  const toggleIntegration = (id: string) => {
    const integ = integrations.find((i) => i.id === id)
    if (!integ) return
    if (integ.connected) {
      toast(`تم فصل ${integ.name}`, 'info')
    } else {
      toast(`تم ربط ${integ.name} بنجاح`, 'success')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">التكاملات و Webhooks</h1>
          <p className="text-slate-400 text-sm mt-1">ربط النظام مع خدمات خارجية وأتمتة العمليات</p>
        </div>
        <button
          onClick={() => setShowWebhookModal(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          إضافة Webhook
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'تكاملات نشطة', value: integrations.filter((i) => i.connected).length, icon: Zap, color: 'royal' },
          { label: 'Webhooks نشطة', value: webhookList.filter((w) => w.active).length, icon: Webhook, color: 'emerald' },
          { label: 'أحداث متاحة', value: events.length, icon: Activity, color: 'gold' },
          { label: 'آخر استدعاء', value: '5 دقائق', icon: RefreshCw, color: 'blue' },
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

      {/* Integrations */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">التكاملات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integ) => (
            <div key={integ.id} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', integ.color)}>
                  <integ.icon className="w-6 h-6" />
                </div>
                {integ.connected ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 px-2 py-1 rounded-lg bg-emerald-50">
                    <Check className="w-3 h-3" /> متصل
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 px-2 py-1 rounded-lg bg-slate-100">غير متصل</span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{integ.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{integ.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">{integ.category}</span>
                <button
                  onClick={() => toggleIntegration(integ.id)}
                  className={cn(
                    'text-xs font-semibold px-3 py-1.5 rounded-lg transition-all',
                    integ.connected
                      ? 'bg-red-50 text-red-500 hover:bg-red-100'
                      : 'bg-royal-50 text-royal-600 hover:bg-royal-100'
                  )}
                >
                  {integ.connected ? 'فصل' : 'ربط'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Webhook className="w-5 h-5 text-royal-600" />
            <h2 className="text-lg font-bold text-slate-900">Webhooks</h2>
          </div>
          <span className="text-xs text-slate-400">{webhookList.length} webhook</span>
        </div>
        <div className="divide-y divide-slate-100">
          {webhookList.map((webhook) => (
            <div key={webhook.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                webhook.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
              )}>
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-slate-700 truncate" dir="ltr">{webhook.url}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-semibold text-royal-600 px-2 py-0.5 rounded-md bg-royal-50">{webhook.event}</span>
                  <span className="text-xs text-slate-400">{webhook.lastTriggered}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleWebhook(webhook.id)}
                  className={cn(
                    'relative w-10 h-5.5 rounded-full transition-all',
                    webhook.active ? 'bg-royal-500' : 'bg-slate-200'
                  )}
                  style={{ width: 40, height: 22 }}
                >
                  <span className={cn(
                    'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all',
                    webhook.active ? 'left-0.5' : 'right-0.5'
                  )} />
                </button>
                <button
                  onClick={() => copyUrl(webhook.url)}
                  className="p-2 rounded-lg text-slate-400 hover:text-royal-600 hover:bg-royal-50 transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteWebhook(webhook.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {webhookList.length === 0 && (
            <div className="text-center py-12">
              <Webhook className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">لا توجد webhooks. اضغط "إضافة Webhook" للبدء</p>
            </div>
          )}
        </div>
      </div>

      {/* Available Events */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-royal-600" />
          <h2 className="text-lg font-bold text-slate-900">الأحداث المتاحة</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {events.map((event, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50">
              <Zap className="w-3.5 h-3.5 text-royal-500 flex-shrink-0" />
              <div>
                <code className="text-xs font-mono text-slate-700" dir="ltr">{event.value}</code>
                <p className="text-[10px] text-slate-400">{event.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook Modal */}
      {showWebhookModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowWebhookModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">إضافة Webhook</h2>
              <button
                onClick={() => setShowWebhookModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">رابط الـ Webhook</label>
                <input
                  type="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                  placeholder="https://api.example.com/hooks/..."
                  className="input-field"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">الحدث</label>
                <select
                  value={newWebhook.event}
                  onChange={(e) => setNewWebhook({ ...newWebhook, event: e.target.value })}
                  className="input-field"
                >
                  {events.map((event) => (
                    <option key={event.value} value={event.value}>{event.label} ({event.value})</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowWebhookModal(false)} className="btn-ghost flex-1">إلغاء</button>
                <button onClick={handleAddWebhook} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
