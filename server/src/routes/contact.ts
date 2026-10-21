import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { readDb, writeDb } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'
import { sendContactNotification } from '../mailer.js'
import type { ContactMessage } from '../types.js'

const router = Router()

// POST /api/contact — public, called from the site's contact form
router.post('/', async (req, res) => {
  const { name, email, service, delay, message } = req.body ?? {}

  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Le nom est requis.' })
    return
  }
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ error: "L'adresse email est invalide." })
    return
  }
  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Le message est requis.' })
    return
  }

  const entry: ContactMessage = {
    id: uuid(),
    name: name.trim(),
    email: email.trim(),
    service: typeof service === 'string' ? service : '',
    delay: typeof delay === 'string' ? delay : '',
    message: message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  }

  const db = readDb()
  db.messages.unshift(entry)
  writeDb(db)

  try {
    await sendContactNotification(entry)
  } catch (err) {
    console.error('[contact] Failed to send notification email:', err)
  }

  res.status(201).json({ ok: true })
})

// GET /api/contact — admin only, list submitted messages
router.get('/', requireAdmin, (_req, res) => {
  const db = readDb()
  res.json(db.messages)
})

// PATCH /api/contact/:id — admin only, mark a message as read/unread
router.patch('/:id', requireAdmin, (req, res) => {
  const db = readDb()
  const entry = db.messages.find((m) => m.id === req.params.id)

  if (!entry) {
    res.status(404).json({ error: 'Message introuvable.' })
    return
  }

  if (typeof req.body?.read === 'boolean') {
    entry.read = req.body.read
  }

  writeDb(db)
  res.json(entry)
})

// DELETE /api/contact/:id — admin only
router.delete('/:id', requireAdmin, (req, res) => {
  const db = readDb()
  const before = db.messages.length
  db.messages = db.messages.filter((m) => m.id !== req.params.id)

  if (db.messages.length === before) {
    res.status(404).json({ error: 'Message introuvable.' })
    return
  }

  writeDb(db)
  res.status(204).end()
})

export default router
