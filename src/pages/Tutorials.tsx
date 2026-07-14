import { useState } from 'react'
import {
  BookOpen, Video, Lightbulb, Monitor, Settings, Users, CreditCard,
  Image, Tablet, FolderTree, Play, X, CheckCircle2, ArrowLeft,
  LayoutDashboard, Globe, Clock, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tutorial {
  title: string
  icon: typeof Monitor
  duration: string
  desc: string
  steps: { title: string; detail: string }[]
}

const tutorials: { category: string; items: Tutorial[] }[] = [
  {
    category: 'شرح المزايا',
    items: [
      {
        title: 'كيفية إنشاء شاشة جديدة',
        icon: Monitor,
        duration: '5 دقائق',
        desc: 'تعلم كيف تضيف شاشة جديدة وتختار التصميم المناسب',
        steps: [
          { title: 'افتح صفحة الشاشات', detail: 'من القائمة الجانبية، اضغط على "الشاشات" للوصول إلى قائمة جميع الشاشات الموجودة.' },
          { title: 'اضغط "إضافة شاشة"', detail: 'في أعلى الصفحة، اضغط على زر "إضافة شاشة" الأخضر. ستفتح نافذة منبثقة لإدخال بيانات الشاشة.' },
          { title: 'أدخل اسم الشاشة', detail: 'اكتب اسماً واضحاً للشاشة، مثل "شاشة الاستقبال" أو "شاشة الكافيه". هذا الاسم يساعدك في التعرف عليها لاحقاً.' },
          { title: 'اختر المجموعة', detail: 'حدد المجموعة التي تنتمي لها الشاشة (مثل: شاشات الفرع الرئيسي). إذا لم توجد مجموعة، يمكنك تركها فارغة.' },
          { title: 'حدد اتجاه الشاشة', detail: 'اختر "عرضي" للشاشات الأفقية (TV) أو "طولي" للشاشات العمودية (كشك/ستاند). هذا يؤثر على القوالب المتاحة.' },
          { title: 'اضغط "حفظ"', detail: 'بعد إدخال كل البيانات، اضغط "حفظ". ستظهر الشاشة الجديدة في القائمة ويمكنك الضغط عليها للدخول إلى المحرر.' },
          { title: 'اختر القالب في المحرر', detail: 'داخل محرر الشاشة، اختر أحد القوالب الـ 22 المتاحة. كل قالب يمثل تخطيطاً مختلفاً لعرض المحتوى.' },
          { title: 'أضف الصفحات والمحتوى', detail: 'اضغط "إضافة صفحة"، حدد نوع المحتوى (صورة، فيديو، يوتيوب، نص)، واضبط مدة العرض والجدولة.' },
        ],
      },
      {
        title: 'إدارة الأجهزة المتصلة',
        icon: Tablet,
        duration: '4 دقائق',
        desc: 'ربط وفصل الأجهزة بالشاشات',
        steps: [
          { title: 'افتح صفحة الأجهزة', detail: 'من القائمة الجانبية، اضغط على "الأجهزة" لعرض جميع الأجهزة المسجلة في النظام.' },
          { title: 'سجل جهاز جديد', detail: 'اضغط "إضافة جهاز"، أدخل اسم الجهاز ورقمه التسلسلي. يمكن ربطه بشاشة محددة أو تركه غير مرتبط.' },
          { title: 'راقب حالة الجهاز', detail: 'كل جهاز يظهر بحالة: "متصل" (أخضر)، "غير متصل" (أحمر)، أو "في الانتظار" (أصفر). تتحدث الحالة تلقائياً.' },
          { title: 'أعد تشغيل الجهاز', detail: 'من قائمة الإجراءات بجانب كل جهاز، يمكنك إعادة التشغيل أو تحديث المحتوى عن بُعد.' },
          { title: 'افصل الجهاز', detail: 'إذا لم تعد بحاجة للجهاز، اضغط "فصل" لإزالته من النظام. يمكن إعادة ربطه لاحقاً.' },
        ],
      },
      {
        title: 'رفع الصور والفيديوهات',
        icon: Image,
        duration: '3 دقائق',
        desc: 'كيفية استخدام مكتبة الميديا',
        steps: [
          { title: 'افتح مكتبة الميديا', detail: 'من القائمة الجانبية، اضغط "مكتبة الميديا". ستجد تبويبين: الصور والفيديوهات.' },
          { title: 'اضغط "رفع ملف"', detail: 'اضغط على منطقة الرفع أو اسحب الملفات إليها. يدعم النظام صيغ: JPG, PNG, GIF, MP4, WebM.' },
          { title: 'انتظر اكتمال الرفع', detail: 'سيظهر شريط تقدم لكل ملف. بعد الاكتمال، سيظهر الملف في المعرض مع معاينة.' },
          { title: 'استخدم الملف في الشاشة', detail: 'في محرر الشاشة، عند إضافة صفحة من نوع "صورة" أو "فيديو"، اختر الملف من المكتبة مباشرة.' },
          { title: 'احذف الملفات غير الضرورية', detail: 'اضغط على أي ملف ثم "حذف" لإزالته. تأكد من عدم استخدامه في أي شاشة نشطة.' },
        ],
      },
      {
        title: 'إنشاء وإدارة المجموعات',
        icon: FolderTree,
        duration: '6 دقائق',
        desc: 'تنظيم الشاشات في مجموعات',
        steps: [
          { title: 'افتح صفحة المجموعات', detail: 'من القائمة الجانبية، اضغط "المجموعات" لعرض جميع المجموعات.' },
          { title: 'أنشئ مجموعة جديدة', detail: 'اضغط "إضافة مجموعة"، أدخل اسم المجموعة (مثل: "فروع الرياض") ووصفاً مختصراً.' },
          { title: 'أضف شاشات للمجموعة', detail: 'عند إنشاء أو تعديل شاشة، اختر المجموعة من القائمة المنسدلة. يمكن لشاشة واحدة أن تنتمي لمجموعة واحدة.' },
          { title: 'عدّل أو احذف المجموعة', detail: 'اضغط على أي مجموعة لتعديل اسمها أو وصفها. للحذف، اضغط "حذف" — يجب نقل الشاشات لمجموعة أخرى أولاً.' },
          { title: 'استخدم المجموعات للجدولة', detail: 'الجدولة على مستوى المجموعة تتيح عرض نفس المحتوى على كل شاشات المجموعة في وقت واحد.' },
        ],
      },
      {
        title: 'إدارة المستخدمين والصلاحيات',
        icon: Users,
        duration: '7 دقائق',
        desc: 'إضافة مستخدمين وتوزيع الأدوار',
        steps: [
          { title: 'افتح صفحة المستخدمين', detail: 'من القائمة الجانبية، اضغط "المستخدمين" لعرض جميع المستخدمين المسجلين.' },
          { title: 'أضف مستخدم جديد', detail: 'اضغط "إضافة مستخدم"، أدخل الاسم، البريد الإلكتروني، وكلمة المرور المؤقتة.' },
          { title: 'حدد دور المستخدم', detail: 'الأدوار المتاحة: "مدير النظام" (صلاحيات كاملة)، "محرر" (تعديل المحتوى فقط)، "مشاهد" (عرض فقط).' },
          { title: 'فعّل أو عطّل الحساب', detail: 'من قائمة الإجراءات، يمكنك تفعيل أو تعطيل حساب أي مستخدم دون حذفه.' },
          { title: 'عدّل الصلاحيات', detail: 'يمكن تغيير دور المستخدم في أي وقت. التغييرات تُطبق فوراً عند تسجيل دخول المستخدم التالي.' },
        ],
      },
      {
        title: 'إعدادات الحساب والعلامة التجارية',
        icon: Settings,
        duration: '5 دقائق',
        desc: 'تخصيص الشعار والألوان',
        steps: [
          { title: 'افتح صفحة الإعدادات', detail: 'من القائمة الجانبية، اضغط "الإعدادات". ستجد ثلاثة أقسام: العلامة التجارية، تويتر، انستقرام.' },
          { title: 'ارفع شعارك', detail: 'في قسم "العلامة التجارية"، اضغط "رفع شعار" واختر صورة بصيغة PNG خلفية شفافة.' },
          { title: 'خصص الألوان', detail: 'استخدم منتقي الألوان لتغيير اللون الأساسي والثانوي. التغييرات تظهر على كل الشاشات فوراً.' },
          { title: 'احفظ الإعدادات', detail: 'بعد التعديل، اضغط "حفظ التغييرات". يمكن التراجع في أي وقت بإعادة الرفع.' },
        ],
      },
      {
        title: 'إدارة الاشتراكات والباقات',
        icon: CreditCard,
        duration: '4 دقائق',
        desc: 'ترقية وتمديد الباقة',
        steps: [
          { title: 'افتح صفحة الاشتراكات', detail: 'من القائمة الجانبية، اضغط "الاشتراكات" لعرض باقتك الحالية والاستخدام.' },
          { title: 'راجع الاستخدام الحالي', detail: 'ستجد إحصائيات: عدد الشاشات المستخدمة، المساحة المستهلكة، وعدد المستخدمين.' },
          { title: 'اختر باقة أعلى', detail: 'إذا اقتربت من الحد الأقصى، اضغط "ترقية" على الباقة الأعلى لفتح مزايا إضافية.' },
          { title: 'أكمل الدفع', detail: 'أدخل بيانات الدفع واختبر الباقة الجديدة لمدة 14 يوماً قبل التفعيل الكامل.' },
        ],
      },
    ],
  },
  {
    category: 'شرح البرنامج',
    items: [
      {
        title: 'مقدمة عن SmartScreen',
        icon: BookOpen,
        duration: '10 دقائق',
        desc: 'نظرة شاملة على النظام وكيفية استخدامه',
        steps: [
          { title: 'ما هو SmartScreen؟', detail: 'SmartScreen منصة متكاملة لإدارة الشاشات الإعلانية والرقمية. تتيح لك إنشاء وجدولة وعرض المحتوى على شاشات متعددة من مكان واحد.' },
          { title: 'المكونات الأساسية', detail: 'النظام يتكون من: لوحة تحكم (إدارة)، شاشات (محتوى)، أجهزة (عرض)، مكتبة ميديا (ملفات)، ومجموعات (تنظيم).' },
          { title: 'كيف يعمل النظام', detail: 'تنشئ شاشة → تختار قالب → تضيف صفحات بمحتوى → تربط الشاشة بجهاز → الجهاز يعرض المحتوى تلقائياً.' },
          { title: 'الذكاء الاصطناعي', detail: 'يدعم النظام توليد المحتوى بالـ AI، اقتراحات ذكية للأوقات، تحليل أداء، ومساعد دردشة للمساعدة.' },
          { title: 'ابدأ الآن', detail: 'أنشئ شاشتك الأولى من صفحة "الشاشات"، أضف محتوى من "المكتبة"، واربطها بجهاز من صفحة "الأجهزة".' },
        ],
      },
      {
        title: 'دليل المحتوى والجدولة',
        icon: Lightbulb,
        duration: '8 دقائق',
        desc: 'كيفية جدولة المحتوى حسب الأيام والأوقات',
        steps: [
          { title: 'افتح محرر الشاشة', detail: 'من صفحة الشاشات، اضغط على أي شاشة للدخول إلى المحرر. ستجد قائمة الصفحات على اليسار.' },
          { title: 'أضف صفحة جديدة', detail: 'اضغط "إضافة صفحة". كل صفحة تمثل محتوى يظهر لمدة محددة قبل الانتقال للصفحة التالية.' },
          { title: 'اختر نوع المحتوى', detail: 'الأنواع المتاحة: صورة، فيديو، يوتيوب، رابط، نص، كود HTML، معرض صور. اختر النوع المناسب لرسالتك.' },
          { title: 'حدد مدة العرض', detail: 'لكل صفحة، حدد المدة بالثواني (مثلاً: 10 ثوانٍ للصور، 30 للفيديو). المدة الافتراضية 15 ثانية.' },
          { title: 'اختر أيام العرض', detail: 'حدد أيام الأسبوع التي تظهر فيها الصفحة. يمكنك اختيار أيام محددة (مثل: الجمعة والسبت فقط).' },
          { title: 'حدد وقت العرض', detail: 'اختر وقت البداية والنهاية (مثل: 9 صباحاً إلى 11 مساءً). الصفحة لن تظهر خارج هذا النطاق.' },
          { title: 'احفظ وراجع', detail: 'اضغط "حفظ" ثم "معاينة" لرؤية كيف ستظهر الشاشة. يمكنك تعديل الترتيب بالسحب والإفلات.' },
        ],
      },
      {
        title: 'ربط حسابات التواصل الاجتماعي',
        icon: Play,
        duration: '6 دقائق',
        desc: 'ربط تويتر وانستقرام لعرض المحتوى',
        steps: [
          { title: 'افتح صفحة الإعدادات', detail: 'من القائمة الجانبية، اضغط "الإعدادات" ثم اختر تبويب "تويتر" أو "انستقرام".' },
          { title: 'اربط حساب تويتر', detail: 'أدخل اسم المستخدم أو الـ API Key. سيقوم النظام بجلب أحدث التغريدات وعرضها على الشاشات.' },
          { title: 'اربط حساب انستقرام', detail: 'أدخل بيانات الدخول أو الـ Access Token. سيتم عرض أحدث المنشورات والصور تلقائياً.' },
          { title: 'حدد معدل التحديث', detail: 'اختر كل كم دقيقة يتم تحديث المحتوى من تويتر/انستقرام (كل 5، 10، 15، أو 30 دقيقة).' },
          { title: 'احفظ وفعّل', detail: 'اضغط "حفظ" ثم فعّل الربط. سيظهر المحتوى الاجتماعي كصفحة تلقائية في شاشاتك.' },
        ],
      },
      {
        title: 'استخدام الذكاء الاصطناعي',
        icon: Sparkles,
        duration: '8 دقائق',
        desc: 'توليد المحتوى والاقتراحات الذكية بالـ AI',
        steps: [
          { title: 'توليد الصور', detail: 'في محرر الشاشة، اختر نوع محتوى "صورة AI". اكتب وصفاً للصورة المطلوبة (مثل: "صورة كوب قهوة بخلفية دافئة") وسيقوم النظام بتوليدها.' },
          { title: 'توليد النصوص', detail: 'اختر "نص AI" واكتب الموضوع. سيقوم النظام بإنشاء نص إعلاني احترافي مناسب للعرض على الشاشات.' },
          { title: 'الاقتراحات الذكية', detail: 'يحلل النظام بيانات جمهورك ويقترح أفضل الأوقات والمحتوى للعرض. راجع الاقتراحات في صفحة "الرئيسية".' },
          { title: 'تحليل الأداء', detail: 'يوفر النظام تقارير ذكية عن أداء كل شاشة، مع توصيات لتحسين المشاهدات وزيادة التفاعل.' },
          { title: 'المساعد الذكي', detail: 'اضغط على أيقونة المساعد في أسفل الشاشة لطرح أي سؤال عن النظام أو طلب مساعدة في إنشاء محتوى.' },
        ],
      },
    ],
  },
]

export default function Tutorials() {
  const [selected, setSelected] = useState<Tutorial | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الشروحات</h1>
        <p className="text-slate-400 text-sm mt-1">دليل استخدام النظام — اضغط على أي شرح لعرض الخطوات التفصيلية</p>
      </div>

      {tutorials.map((section) => (
        <div key={section.category}>
          <h2 className="text-lg font-bold text-slate-900 mb-4">{section.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(item)}
                className="glass-card-hover p-5 text-right group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-royal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-all">
                    <item.icon className="w-6 h-6 text-royal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">{item.desc}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.steps.length} خطوات
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Tutorial Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-royal-50 flex items-center justify-center flex-shrink-0">
                  <selected.icon className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selected.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{selected.duration} — {selected.steps.length} خطوات</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selected.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-royal-gradient text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    {i < selected.steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="text-slate-900 font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">هل كان هذا الشرح مفيداً؟</span>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-all">
                  غير مفيد
                </button>
                <button className="px-4 py-2 rounded-xl bg-royal-gradient text-white text-sm font-semibold hover:shadow-glow-purple transition-all flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  مفيد جداً
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
