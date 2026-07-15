import { Router } from 'express'
import prisma from '../config/db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(authMiddleware)

// List
router.get('/', async (_req, res) => {
  try {
    const broadcasts = await prisma.emergencyBroadcast.findMany({
      include: { sentBy: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ broadcasts })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Create / Send
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { message, type, priority, duration, screenIds } = req.body
    const broadcast = await prisma.emergencyBroadcast.create({
      data: {
        message, type, priority,
        duration: duration || 5,
        screenIds: screenIds || [],
        sentById: req.userId!,
      },
      include: { sentBy: { select: { id: true, name: true } } },
    })
    res.status(201).json({ broadcast })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
