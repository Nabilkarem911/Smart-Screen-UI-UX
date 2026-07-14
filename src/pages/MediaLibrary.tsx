import { useState } from 'react'
import { Upload, Trash2, Image as ImageIcon, Video, Film } from 'lucide-react'
import { cn } from '@/lib/utils'

const imagesData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `image-${i + 1}.jpg`,
  size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
}))

const videosData = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `video-${i + 1}.mp4`,
  size: `${(Math.random() * 20 + 5).toFixed(1)} MB`,
  duration: `${Math.floor(Math.random() * 60 + 10)}s`,
}))

export default function MediaLibrary() {
  const [tab, setTab] = useState<'images' | 'videos'>('images')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">مكتبة الميديا</h1>
        <p className="text-slate-400 text-sm mt-1">إدارة الصور والفيديوهات</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('images')}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
            tab === 'images' ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
          )}
        >
          <ImageIcon className="w-4 h-4" />
          صور ({imagesData.length})
        </button>
        <button
          onClick={() => setTab('videos')}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
            tab === 'videos' ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
          )}
        >
          <Video className="w-4 h-4" />
          فيديوهات ({videosData.length})
        </button>
      </div>

      {/* Upload Zone */}
      <div className="glass-card p-8 border-2 border-dashed border-slate-200 hover:border-royal-400 transition-all cursor-pointer">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-royal-50 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-royal-600" />
          </div>
          <p className="text-slate-900 font-semibold mb-1">اسحب الملفات هنا للرفع</p>
          <p className="text-sm text-slate-400 mb-4">أو اضغط لاختيار ملفات من جهازك</p>
          <button className="btn-primary">رفع الملفات</button>
          <p className="text-xs text-slate-400 mt-3">
            {tab === 'images' ? 'JPG, PNG, GIF, WEBP — بحد أقصى 10MB' : 'MP4, WEBM, AVI — بحد أقصى 100MB'}
          </p>
        </div>
      </div>

      {/* Grid */}
      {tab === 'images' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {imagesData.map((img) => (
            <div key={img.id} className="glass-card-hover group relative overflow-hidden">
              <div className="aspect-square bg-slate-100 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-slate-300" />
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-900 font-medium truncate">{img.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{img.size}</p>
              </div>
              <button className="absolute top-2 left-2 p-2 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {videosData.map((vid) => (
            <div key={vid.id} className="glass-card-hover group relative overflow-hidden">
              <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
                <Film className="w-10 h-10 text-slate-300" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/60 text-xs text-white">
                  {vid.duration}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-900 font-medium truncate">{vid.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{vid.size}</p>
              </div>
              <button className="absolute top-2 left-2 p-2 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
