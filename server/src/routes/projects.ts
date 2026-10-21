import { unlink } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Router } from 'express'
import multer from 'multer'
import { v4 as uuid } from 'uuid'
import { readDb, writeDb } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'
import type { Project } from '../types.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = join(__dirname, '..', '..', 'uploads', 'projects')

// Removes a previously uploaded project image from disk. Only ever touches
// files under our own uploads/projects folder — external image URLs are left alone.
async function removeUploadedImage(imageUrl: string) {
  if (!imageUrl.startsWith('/uploads/projects/')) return
  const filePath = join(UPLOADS_DIR, basename(imageUrl))
  try {
    await unlink(filePath)
  } catch {
    // File already gone or never existed — nothing to clean up.
  }
}

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
    filename: (_req, file, cb) => cb(null, `${uuid()}${extname(file.originalname)}`),
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      cb(new Error('Format de fichier non supporté (jpg, png, webp, avif uniquement).'))
      return
    }
    cb(null, true)
  },
})

/**
 * Normalises the project's website link: '' stays '' (no link), a missing
 * scheme gets https://, and anything that isn't an http(s) URL is rejected.
 */
function normalizeSiteUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return ''
  const raw = value.trim()
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`
  try {
    const url = new URL(withScheme)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    if (!url.hostname.includes('.') && url.hostname !== 'localhost') return null
    return url.toString()
  } catch {
    return null
  }
}

const router = Router()

// GET /api/projects — public, used by the site's Projects section
router.get('/', (_req, res) => {
  const db = readDb()
  res.json(db.projects)
})

// POST /api/projects — admin only, create a project (with optional image upload)
router.post('/', requireAdmin, upload.single('image'), (req, res) => {
  const { name, category, description, imageUrl, url } = req.body ?? {}

  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Le nom du projet est requis.' })
    return
  }
  const siteUrl = normalizeSiteUrl(url)
  if (siteUrl === null) {
    // Drop the image multer already saved for this rejected request
    if (req.file) void removeUploadedImage(`/uploads/projects/${req.file.filename}`)
    res.status(400).json({ error: 'Le lien du site est invalide (ex : https://monsite.com).' })
    return
  }

  const resolvedImageUrl = req.file
    ? `/uploads/projects/${req.file.filename}`
    : typeof imageUrl === 'string'
      ? imageUrl
      : ''

  const project: Project = {
    id: uuid(),
    name: name.trim(),
    category: typeof category === 'string' ? category : '',
    description: typeof description === 'string' ? description : '',
    imageUrl: resolvedImageUrl,
    url: siteUrl,
    createdAt: new Date().toISOString(),
  }

  const db = readDb()
  db.projects.push(project)
  writeDb(db)

  res.status(201).json(project)
})

// PUT /api/projects/:id — admin only, update a project (with optional new image)
router.put('/:id', requireAdmin, upload.single('image'), async (req, res) => {
  const db = readDb()
  const project = db.projects.find((p) => p.id === req.params.id)

  if (!project) {
    res.status(404).json({ error: 'Projet introuvable.' })
    return
  }

  const { name, category, description, imageUrl, url } = req.body ?? {}

  if (url !== undefined) {
    const siteUrl = normalizeSiteUrl(url)
    if (siteUrl === null) {
      // Drop the image multer already saved for this rejected request
      if (req.file) void removeUploadedImage(`/uploads/projects/${req.file.filename}`)
      res.status(400).json({ error: 'Le lien du site est invalide (ex : https://monsite.com).' })
      return
    }
    project.url = siteUrl
  }
  if (typeof name === 'string' && name.trim()) project.name = name.trim()
  if (typeof category === 'string') project.category = category
  if (typeof description === 'string') project.description = description
  if (req.file) {
    await removeUploadedImage(project.imageUrl)
    project.imageUrl = `/uploads/projects/${req.file.filename}`
  } else if (typeof imageUrl === 'string' && imageUrl.trim()) {
    project.imageUrl = imageUrl.trim()
  }

  writeDb(db)
  res.json(project)
})

// DELETE /api/projects/:id — admin only
router.delete('/:id', requireAdmin, async (req, res) => {
  const db = readDb()
  const project = db.projects.find((p) => p.id === req.params.id)

  if (!project) {
    res.status(404).json({ error: 'Projet introuvable.' })
    return
  }

  db.projects = db.projects.filter((p) => p.id !== req.params.id)
  writeDb(db)
  await removeUploadedImage(project.imageUrl)

  res.status(204).end()
})

export default router
