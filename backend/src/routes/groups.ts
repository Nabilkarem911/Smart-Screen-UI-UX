import { Router } from 'express'
import prisma from '../config/db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

// List
router.get('/', async (_req, res) => {
  try {
    const groups = await prisma.group.findMany({
      include: { _count: { select: { screens: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ groups })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Create
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { name, description, color } = req.body
    const group = await prisma.group.create({ data: { name, description, color } })
    res.status(201).json({ group })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Update
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { name, description, color } = req.body
    const group = await prisma.group.update({
      where: { id: req.params.id },
      data: { name, description, color },
    })
    res.json({ group })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Delete
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    await prisma.group.delete({ where: { id: req.params.id } })
    res.json({ message: 'Group deleted successfully' })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
