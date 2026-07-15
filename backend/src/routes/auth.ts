import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import prisma from '../config/db'
import { authMiddleware } from '../middleware/auth'

const router = Router()

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body)

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'Conflict', message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'ADMIN' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({ user, token })
  } catch (err: any) {
    if (err.issues) {
      return res.status(400).json({ error: 'Validation Error', details: err.issues })
    }
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    })
  } catch (err: any) {
    if (err.issues) {
      return res.status(400).json({ error: 'Validation Error', details: err.issues })
    }
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Get current user
router.get('/me', authMiddleware, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, role: true, avatar: true, phone: true, createdAt: true },
    })
    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found' })
    }
    res.json({ user })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
