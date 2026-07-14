import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Chatbot from '@/components/Chatbot'
import CommandPalette from '@/components/CommandPalette'
import OnboardingWizard from '@/components/OnboardingWizard'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import { cn } from '@/lib/utils'

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem('onboarding_complete')
    if (!done) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_complete', 'true')
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className={cn('transition-all duration-300', sidebarCollapsed ? 'lg:mr-20' : 'lg:mr-72')}>
        <TopBar onMobileMenu={() => setMobileSidebarOpen(true)} />
        <main className="p-4 sm:p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
      <Chatbot />
      <CommandPalette />
      <KeyboardShortcuts />
      {showOnboarding && <OnboardingWizard onComplete={handleOnboardingComplete} />}
    </div>
  )
}
