import { Router } from 'express'
import prisma from '../config/db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(authMiddleware)

// List
router.get('/', async (req: AuthRequest, res) => {
  try {
    const devices = await prisma.device.findMany({
      include: { screen: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ devices })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Create
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { name, type, screenId, os, version, ipAddress, macAddress } = req.body
    const device = await prisma.device.create({
      data: { name, type, screenId, os, version, ipAddress, macAddress },
      include: { screen: true },
    })
    res.status(201).json({ device })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Update
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { name, type, status, screenId, os, version, cpu, ram, temperature, uptime } = req.body
    const device = await prisma.device.update({
      where: { id: req.params.id },
      data: { name, type, status, screenId, os, version, cpu, ram, temperature, uptime, lastSeen: new Date() },
      include: { screen: true },
    })
    res.json({ device })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Delete
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    await prisma.device.delete({ where: { id: req.params.id } })
    res.json({ message: 'Device deleted successfully' })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
