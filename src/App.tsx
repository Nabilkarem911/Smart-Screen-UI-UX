import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import { ToastProvider } from '@/components/ToastProvider'
import { I18nProvider } from '@/context/I18nContext'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Screens from '@/pages/Screens'
import ScreenEditor from '@/pages/ScreenEditor'
import Devices from '@/pages/Devices'
import MediaLibrary from '@/pages/MediaLibrary'
import Settings from '@/pages/Settings'
import Subscriptions from '@/pages/Subscriptions'
import Groups from '@/pages/Groups'
import Users from '@/pages/Users'
import Tutorials from '@/pages/Tutorials'
import Analytics from '@/pages/Analytics'
import CalendarPage from '@/pages/CalendarPage'
import Profile from '@/pages/Profile'
import Notifications from '@/pages/Notifications'
import AuditLogs from '@/pages/AuditLogs'
import HelpSupport from '@/pages/HelpSupport'
import ExportImport from '@/pages/ExportImport'
import WebhooksIntegrations from '@/pages/WebhooksIntegrations'
import ActivityTimeline from '@/pages/ActivityTimeline'
import AIContentGenerator from '@/pages/AIContentGenerator'
import SmartRecommendations from '@/pages/SmartRecommendations'
import AutoTagging from '@/pages/AutoTagging'
import ABTesting from '@/pages/ABTesting'
import Heatmaps from '@/pages/Heatmaps'
import QRAnalytics from '@/pages/QRAnalytics'
import ROICalculator from '@/pages/ROICalculator'
import TemplatesMarketplace from '@/pages/TemplatesMarketplace'
import VisualScreenBuilder from '@/pages/VisualScreenBuilder'
import MultiZoneLayouts from '@/pages/MultiZoneLayouts'
import DynamicWidgets from '@/pages/DynamicWidgets'

export default function App() {
  return (
    <I18nProvider>
    <ToastProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="screens" element={<Screens />} />
        <Route path="screens/edit/:id" element={<ScreenEditor />} />
        <Route path="devices" element={<Devices />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="settings" element={<Settings />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="groups" element={<Groups />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="help" element={<HelpSupport />} />
        <Route path="export-import" element={<ExportImport />} />
        <Route path="webhooks" element={<WebhooksIntegrations />} />
        <Route path="timeline" element={<ActivityTimeline />} />
        <Route path="ai-generator" element={<AIContentGenerator />} />
        <Route path="ai-recommendations" element={<SmartRecommendations />} />
        <Route path="auto-tagging" element={<AutoTagging />} />
        <Route path="ab-testing" element={<ABTesting />} />
        <Route path="heatmaps" element={<Heatmaps />} />
        <Route path="qr-analytics" element={<QRAnalytics />} />
        <Route path="roi-calculator" element={<ROICalculator />} />
        <Route path="templates" element={<TemplatesMarketplace />} />
        <Route path="screen-builder" element={<VisualScreenBuilder />} />
        <Route path="multi-zone" element={<MultiZoneLayouts />} />
        <Route path="widgets" element={<DynamicWidgets />} />
        <Route path="tutorials" element={<Tutorials />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </ToastProvider>
    </I18nProvider>
  )
}
