import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import prisma from '../config/db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
router.use(authMiddleware)

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
})

// List
router.get('/', async (req: AuthRequest, res) => {
  try {
    const media = await prisma.mediaItem.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ media })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Upload
router.post('/upload', upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Bad Request', message: 'No file uploaded' })

    const ext = path.extname(req.file.originalname).toLowerCase()
    let type = 'DOCUMENT'
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) type = 'IMAGE'
    else if (['.mp4', '.webm', '.mov', '.avi', '.mkv'].includes(ext)) type = 'VIDEO'
    else if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) type = 'AUDIO'

    const media = await prisma.mediaItem.create({
      data: {
        name: req.file.originalname,
        type: type as any,
        url: `/uploads/${req.file.filename}`,
        size: req.file.size,
        mimeType: req.file.mimetype,
        userId: req.userId!,
      },
    })
    res.status(201).json({ media })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

// Delete
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const media = await prisma.mediaItem.findUnique({ where: { id: req.params.id } })
    if (!media) return res.status(404).json({ error: 'Not Found', message: 'Media not found' })

    const filePath = path.join(uploadDir, path.basename(media.url))
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await prisma.mediaItem.delete({ where: { id: req.params.id } })
    res.json({ message: 'Media deleted successfully' })
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
})

export default router
