import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'

import authRouter from './routes/auth'
import screensRouter from './routes/screens'
import mediaRouter from './routes/media'
import contentRouter from './routes/content'
import groupsRouter from './routes/groups'
import devicesRouter from './routes/devices'
import approvalsRouter from './routes/approvals'
import broadcastsRouter from './routes/broadcasts'
import analyticsRouter from './routes/analytics'
import notificationsRouter from './routes/notifications'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Static files for uploads
app.use('/uploads', express.static('uploads'))

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/screens', screensRouter)
app.use('/api/media', mediaRouter)
app.use('/api/content', contentRouter)
app.use('/api/groups', groupsRouter)
app.use('/api/devices', devicesRouter)
app.use('/api/approvals', approvalsRouter)
app.use('/api/broadcasts', broadcastsRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/notifications', notificationsRouter)

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[ERROR]', err.message)
  res.status(500).json({ error: 'Internal Server Error', message: err.message })
})

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Smart Screen API running on http://localhost:${PORT}`)
  console.log(`📊 Health: http://localhost:${PORT}/api/health\n`)
})
