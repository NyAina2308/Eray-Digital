import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { readDb, writeDb } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'
import type { Testimonial } from '../types.js'

const router = Router()

function clampRating(value: unknown) {
  const n = Number(value)
  return Number.isFinite(n) ? Math.min(5, Math.max(1, Math.round(n))) : 5
}

// GET /api/testimonials — public, only published testimonials (newest first)
router.get('/', (_req, res) => {
  const db = readDb()
  res.json(db.testimonials.filter((t) => t.published))
})

// GET /api/testimonials/all — admin only, every testimonial including drafts
router.get('/all', requireAdmin, (_req, res) => {
  const db = readDb()
  res.json(db.testimonials)
})

// POST /api/testimonials — admin only
router.post('/', requireAdmin, (req, res) => {
  const { name, role, text, rating, published } = req.body ?? {}

  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Le nom est requis.' })
    return
  }
  if (typeof text !== 'string' || !text.trim()) {
    res.status(400).json({ error: "Le texte de l'avis est requis." })
    return
  }

  const entry: Testimonial = {
    id: uuid(),
    name: name.trim(),
    role: typeof role === 'string' ? role.trim() : '',
    text: text.trim(),
    rating: clampRating(rating),
    published: published !== false,
    createdAt: new Date().toISOString(),
  }

  const db = readDb()
  db.testimonials.unshift(entry)
  writeDb(db)
  res.status(201).json(entry)
})

// PUT /api/testimonials/:id — admin only
router.put('/:id', requireAdmin, (req, res) => {
  const db = readDb()
  const entry = db.testimonials.find((t) => t.id === req.params.id)

  if (!entry) {
    res.status(404).json({ error: 'Avis introuvable.' })
    return
  }

  const { name, role, text, rating, published } = req.body ?? {}
  if (typeof name === 'string' && name.trim()) entry.name = name.trim()
  if (typeof role === 'string') entry.role = role.trim()
  if (typeof text === 'string' && text.trim()) entry.text = text.trim()
  if (rating !== undefined) entry.rating = clampRating(rating)
  if (typeof published === 'boolean') entry.published = published

  writeDb(db)
  res.json(entry)
})

// DELETE /api/testimonials/:id — admin only
router.delete('/:id', requireAdmin, (req, res) => {
  const db = readDb()
  const before = db.testimonials.length
  db.testimonials = db.testimonials.filter((t) => t.id !== req.params.id)

  if (db.testimonials.length === before) {
    res.status(404).json({ error: 'Avis introuvable.' })
    return
  }

  writeDb(db)
  res.status(204).end()
})

export default router
