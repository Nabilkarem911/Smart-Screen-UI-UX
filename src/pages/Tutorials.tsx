import { BookOpen, Video, Lightbulb, Monitor, Settings, Users, CreditCard, Image, Tablet, FolderTree, Play } from 'lucide-react'

const tutorials = [
  {
    category: 'شرح المزايا',
    items: [
      { title: 'كيفية إنشاء شاشة جديدة', icon: Monitor, duration: '5 دقائق', desc: 'تعلم كيف تضيف شاشة جديدة وتختار التصميم المناسب' },
      { title: 'إدارة الأجهزة المتصلة', icon: Tablet, duration: '4 دقائق', desc: 'ربط وفصل الأجهزة بالشاشات' },
      { title: 'رفع الصور والفيديوهات', icon: Image, duration: '3 دقائق', desc: 'كيفية استخدام مكتبة الميديا' },
      { title: 'إنشاء وإدارة المجموعات', icon: FolderTree, duration: '6 دقائق', desc: 'تنظيم الشاشات في مجموعات' },
      { title: 'إدارة المستخدمين والصلاحيات', icon: Users, duration: '7 دقائق', desc: 'إضافة مستخدمين وتوزيع الأدوار' },
      { title: 'إعدادات الحساب والعلامة التجارية', icon: Settings, duration: '5 دقائق', desc: 'تخصيص الشعار والألوان' },
      { title: 'إدارة الاشتراكات والباقات', icon: CreditCard, duration: '4 دقائق', desc: 'ترقية وتمديد الباقة' },
    ],
  },
  {
    category: 'شرح البرنامج',
    items: [
      { title: 'مقدمة عن SmartScreen', icon: BookOpen, duration: '10 دقائق', desc: 'نظرة شاملة على النظام وكيفية استخدامه' },
      { title: 'دليل المحتوى والجدولة', icon: Lightbulb, duration: '8 دقائق', desc: 'كيفية جدولة المحتوى حسب الأيام والأوقات' },
      { title: 'ربط حسابات التواصل الاجتماعي', icon: Play, duration: '6 دقائق', desc: 'ربط تويتر وانستقرام لعرض المحتوى' },
    ],
  },
]

export default function Tutorials() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الشروحات</h1>
        <p className="text-slate-400 text-sm mt-1">دليل استخدام النظام</p>
      </div>

      {tutorials.map((section) => (
        <div key={section.category}>
          <h2 className="text-lg font-bold text-slate-900 mb-4">{section.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item, i) => (
              <div key={i} className="glass-card-hover p-5 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-royal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-all">
                    <item.icon className="w-6 h-6 text-royal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">{item.desc}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Video className="w-3.5 h-3.5" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
