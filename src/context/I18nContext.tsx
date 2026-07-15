import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Lang = 'ar' | 'en'

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
  dir: 'rtl' | 'ltr'
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

const translations: Record<string, Record<Lang, string>> = {
  // Navigation
  'nav.dashboard': { ar: 'الرئيسية', en: 'Dashboard' },
  'nav.screens': { ar: 'الشاشات', en: 'Screens' },
  'nav.devices': { ar: 'الأجهزة', en: 'Devices' },
  'nav.media': { ar: 'مكتبة الميديا', en: 'Media Library' },
  'nav.groups': { ar: 'المجموعات', en: 'Groups' },
  'nav.analytics': { ar: 'التحليلات', en: 'Analytics' },
  'nav.aiGenerator': { ar: 'مولد المحتوى AI', en: 'AI Content Generator' },
  'nav.aiRecommendations': { ar: 'اقتراحات ذكية', en: 'Smart Recommendations' },
  'nav.autoTagging': { ar: 'تصنيف تلقائي', en: 'Auto-Tagging' },
  'nav.abTesting': { ar: 'اختبارات A/B', en: 'A/B Testing' },
  'nav.heatmaps': { ar: 'خرائط حرارية', en: 'Heatmaps' },
  'nav.qrAnalytics': { ar: 'تحليلات QR', en: 'QR Analytics' },
  'nav.roiCalculator': { ar: 'حاسبة ROI', en: 'ROI Calculator' },
  'nav.templates': { ar: 'متجر القوالب', en: 'Templates' },
  'nav.screenBuilder': { ar: 'منشئ الشاشات', en: 'Screen Builder' },
  'nav.multiZone': { ar: 'تخطيطات متعددة', en: 'Multi-Zone Layouts' },
  'nav.widgets': { ar: 'ودجت ديناميكية', en: 'Dynamic Widgets' },
  'nav.bulkOperations': { ar: 'عمليات مجمعة', en: 'Bulk Operations' },
  'nav.approvalWorkflow': { ar: 'سير الموافقات', en: 'Approval Workflow' },
  'nav.emergencyBroadcast': { ar: 'بث الطوارئ', en: 'Emergency Broadcast' },
  'nav.healthMonitoring': { ar: 'مراقبة الصحة', en: 'Health Monitoring' },
  'nav.calendar': { ar: 'الجدولة', en: 'Calendar' },
  'nav.users': { ar: 'المستخدمين', en: 'Users' },
  'nav.notifications': { ar: 'الإشعارات', en: 'Notifications' },
  'nav.auditLogs': { ar: 'سجل العمليات', en: 'Audit Logs' },
  'nav.timeline': { ar: 'الجدول الزمني', en: 'Activity Timeline' },
  'nav.exportImport': { ar: 'تصدير/استيراد', en: 'Export/Import' },
  'nav.webhooks': { ar: 'التكاملات', en: 'Webhooks' },
  'nav.subscriptions': { ar: 'الاشتراكات', en: 'Subscriptions' },
  'nav.profile': { ar: 'الملف الشخصي', en: 'Profile' },
  'nav.settings': { ar: 'الإعدادات', en: 'Settings' },
  'nav.help': { ar: 'المساعدة', en: 'Help & Support' },
  'nav.tutorials': { ar: 'الشروحات', en: 'Tutorials' },

  // Common
  'common.search': { ar: 'بحث شامل...', en: 'Search...' },
  'common.save': { ar: 'حفظ', en: 'Save' },
  'common.cancel': { ar: 'إلغاء', en: 'Cancel' },
  'common.delete': { ar: 'حذف', en: 'Delete' },
  'common.edit': { ar: 'تعديل', en: 'Edit' },
  'common.add': { ar: 'إضافة', en: 'Add' },
  'common.confirm': { ar: 'تأكيد', en: 'Confirm' },
  'common.close': { ar: 'إغلاق', en: 'Close' },
  'common.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
  'common.all': { ar: 'الكل', en: 'All' },
  'common.actions': { ar: 'إجراءات', en: 'Actions' },
  'common.status': { ar: 'الحالة', en: 'Status' },
  'common.name': { ar: 'الاسم', en: 'Name' },
  'common.date': { ar: 'التاريخ', en: 'Date' },
  'common.time': { ar: 'الوقت', en: 'Time' },
  'common.export': { ar: 'تصدير', en: 'Export' },
  'common.import': { ar: 'استيراد', en: 'Import' },

  // Dashboard
  'dashboard.title': { ar: 'لوحة التحكم', en: 'Dashboard' },
  'dashboard.subtitle': { ar: 'نظرة عامة على نظام الشاشات الذكية', en: 'Smart Screen system overview' },

  // Auth
  'auth.welcome': { ar: 'أهلاً بعودتك 👋', en: 'Welcome back 👋' },
  'auth.login': { ar: 'تسجيل الدخول', en: 'Sign in' },
  'auth.username': { ar: 'اسم المستخدم', en: 'Username' },
  'auth.password': { ar: 'كلمة المرور', en: 'Password' },
  'auth.remember': { ar: 'تذكرني', en: 'Remember me' },
  'auth.forgot': { ar: 'نسيت كلمة المرور؟', en: 'Forgot password?' },
  'auth.createAccount': { ar: 'إنشاء حساب جديد', en: 'Create new account' },
  'auth.noAccount': { ar: 'ليس لديك حساب؟', en: "Don't have an account?" },

  // System
  'system.name': { ar: 'SmartScreen', en: 'SmartScreen' },
  'system.tagline': { ar: 'نظام إدارة الشاشات الذكية', en: 'Smart Screen Management System' },
  'system.trial': { ar: 'النسخة التجريبية', en: 'Trial Version' },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('app_lang')
    return (saved === 'en' || saved === 'ar') ? saved : 'ar'
  })

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    localStorage.setItem('app_lang', lang)
  }, [lang, dir])

  const setLang = (newLang: Lang) => setLangState(newLang)

  const t = (key: string): string => {
    const entry = translations[key]
    if (!entry) return key
    return entry[lang]
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}
