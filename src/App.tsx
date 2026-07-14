import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
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

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="screens" element={<Screens />} />
        <Route path="screens/edit/:id" element={<ScreenEditor />} />
        <Route path="devices" element={<Devices />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="settings" element={<Settings />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="groups" element={<Groups />} />
        <Route path="users" element={<Users />} />
        <Route path="tutorials" element={<Tutorials />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
