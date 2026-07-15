import { Router } from 'express'
import prisma from '../config/db'
import { authMiddleware } from '../middleware/auth'

const router = Router()
router.use(authMiddleware)

// Get analytics for a screen
router.get('/screen/:id', async (req, res) => {
  try {
    const analytics = await prisma.screenAnalytics.findMany({
      where: { screenId: req.params.id },
      orderBy: { date: 'desc' },
      take: 30,
    })
    res.json({ analytics })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Get overall stats
router.get('/stats', async (_req, res) => {
  try {
    const [screens, devices, media, content] = await Promise.all([
      prisma.screen.count(),
      prisma.device.count(),
      prisma.mediaItem.count(),
      prisma.content.count(),
    ])

    const onlineScreens = await prisma.screen.count({ where: { status: 'ONLINE' } })
    const onlineDevices = await prisma.device.count({ where: { status: 'ONLINE' } })

    res.json({
      stats: {
        screens,
        devices,
        media,
        content,
        onlineScreens,
        onlineDevices,
        offlineScreens: screens - onlineScreens,
        offlineDevices: devices - onlineDevices,
      },
    })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
