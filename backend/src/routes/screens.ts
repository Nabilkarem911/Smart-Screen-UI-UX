import { Router } from 'express'
import { z } from 'zod'
import prisma from '../config/db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

const screenSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  orientation: z.enum(['LANDSCAPE', 'PORTRAIT', 'SQUARE']).default('LANDSCAPE'),
  location: z.string().optional(),
  groupId: z.string().optional(),
  resolution: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

// List
router.get('/', async (req: AuthRequest, res) => {
  try {
    const screens = await prisma.screen.findMany({
      include: { group: true, _count: { select: { devices: true, contents: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ screens })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Get by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const screen = await prisma.screen.findUnique({
      where: { id: req.params.id },
      include: { group: true, devices: true, contents: true, analytics: true },
    })
    if (!screen) return res.status(404).json({ error: 'Not Found', message: 'Screen not found' })
    res.json({ screen })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Create
router.post('/', async (req: AuthRequest, res) => {
  try {
    const data = screenSchema.parse(req.body)
    const screen = await prisma.screen.create({
      data: { ...data, userId: req.userId },
      include: { group: true },
    })
    res.status(201).json({ screen })
  } catch (err: any) {
    if (err.issues) return res.status(400).json({ error: 'Validation Error', details: err.issues })
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Update
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const data = screenSchema.partial().parse(req.body)
    const screen = await prisma.screen.update({
      where: { id: req.params.id },
      data,
      include: { group: true },
    })
    res.json({ screen })
  } catch (err: any) {
    if (err.issues) return res.status(400).json({ error: 'Validation Error', details: err.issues })
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Delete
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    await prisma.screen.delete({ where: { id: req.params.id } })
    res.json({ message: 'Screen deleted successfully' })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
