import { Router } from 'express'
import { z } from 'zod'
import prisma from '../config/db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(authMiddleware)

const contentSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'SCHEDULE', 'WIDGET', 'TEMPLATE']),
  body: z.string().optional(),
  data: z.any().optional(),
  screenId: z.string().optional(),
  status: z.enum(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  priority: z.number().default(0),
  scheduledAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
})

// List
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { status, screenId } = req.query
    const where: any = {}
    if (status) where.status = status
    if (screenId) where.screenId = screenId

    const contents = await prisma.content.findMany({
      where,
      include: { screen: true, user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ contents })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Create
router.post('/', async (req: AuthRequest, res) => {
  try {
    const data = contentSchema.parse(req.body)
    const content = await prisma.content.create({
      data: {
        ...data,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        userId: req.userId!,
      },
      include: { screen: true },
    })
    res.status(201).json({ content })
  } catch (err: any) {
    if (err.issues) return res.status(400).json({ error: 'Validation Error', details: err.issues })
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Update
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const data = contentSchema.partial().parse(req.body)
    const content = await prisma.content.update({
      where: { id: req.params.id },
      data: {
        ...data,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      },
      include: { screen: true },
    })
    res.json({ content })
  } catch (err: any) {
    if (err.issues) return res.status(400).json({ error: 'Validation Error', details: err.issues })
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Delete
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    await prisma.content.delete({ where: { id: req.params.id } })
    res.json({ message: 'Content deleted successfully' })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
