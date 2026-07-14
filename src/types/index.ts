export interface Screen {
  id: number
  name: string
  group: string
  orientation: 'landscape' | 'portrait'
  enabled: boolean
  pages: number
  status: 'online' | 'offline'
}

export interface Device {
  id: number
  name: string
  screenName: string
  type: string
  status: 'online' | 'offline'
  lastSeen: string
}

export interface Group {
  id: number
  name: string
  code: string
  screens: number
}

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive'
  lastLogin: string
}

export interface MediaItem {
  id: number
  name: string
  type: 'image' | 'video'
  size: string
  url: string
  uploadedAt: string
}

export interface Subscription {
  plan: string
  screens: number
  usedScreens: number
  devices: number
  usedDevices: number
  price: number
  daysLeft: number
}

export interface PageContent {
  id: number
  title: string
  duration: number
  template: number
  days: string[]
  timeStart: string
  timeEnd: string
  dateStart: string
  dateEnd: string
}
