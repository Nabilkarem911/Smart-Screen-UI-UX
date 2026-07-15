import { Router } from 'express'
import prisma from '../config/db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(authMiddleware)

// List
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { status } = req.query
    const where: any = {}
    if (status) where.status = status

    const requests = await prisma.approvalRequest.findMany({
      where,
      include: {
        submittedBy: { select: { id: true, name: true, email: true } },
        reviewedBy: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ requests })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Create
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { title, type, description, priority, screenName } = req.body
    const request = await prisma.approvalRequest.create({
      data: {
        title, type, description,
        priority: priority || 'MEDIUM',
        screenName,
        submittedById: req.userId!,
      },
      include: { submittedBy: { select: { id: true, name: true } } },
    })
    res.status(201).json({ request })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Approve / Reject / Request Changes
router.put('/:id/review', async (req: AuthRequest, res) => {
  try {
    const { status, reviewNote } = req.body
    const validStatuses = ['APPROVED', 'REJECTED', 'CHANGES_REQUESTED']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid status' })
    }

    const request = await prisma.approvalRequest.update({
      where: { id: req.params.id },
      data: {
        status,
        reviewNote,
        reviewedById: req.userId,
        reviewedAt: new Date(),
      },
      include: {
        submittedBy: { select: { id: true, name: true } },
        reviewedBy: { select: { id: true, name: true } },
      },
    })
    res.json({ request })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
