import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Chatbot from '@/components/Chatbot'
import { cn } from '@/lib/utils'

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-ink-950">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={cn('transition-all duration-300', sidebarCollapsed ? 'mr-20' : 'mr-72')}>
        <TopBar />
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  )
}
