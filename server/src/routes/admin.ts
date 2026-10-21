import { Router } from 'express'
import { createSession, verifyPassword } from '../auth.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

// Basic brute-force protection: 5 failed attempts per IP → locked for 15 minutes
const MAX_FAILS = 5
const LOCK_MS = 15 * 60 * 1000
const failures = new Map<string, { count: number; until: number }>()

// POST /api/admin/login — email + password → session token
router.post('/login', (req, res) => {
  const ip = req.ip ?? 'unknown'
  const entry = failures.get(ip)
  if (entry && entry.until > Date.now()) {
    const minutes = Math.ceil((entry.until - Date.now()) / 60000)
    res.status(429).json({ error: `Trop de tentatives. Réessayez dans ${minutes} min.` })
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const adminHash = process.env.ADMIN_PASSWORD_HASH
  if (!adminEmail || !adminHash || !process.env.SESSION_SECRET) {
    res.status(500).json({ error: 'Compte admin non configuré : lancez `npm run set-admin` dans server/.' })
    return
  }

  const { email, password } = req.body ?? {}
  const ok =
    typeof email === 'string' &&
    typeof password === 'string' &&
    email.trim().toLowerCase() === adminEmail.toLowerCase() &&
    verifyPassword(password, adminHash)

  if (!ok) {
    // A lock that has run out starts a fresh count
    const lockExpired = entry !== undefined && entry.until !== 0 && entry.until <= Date.now()
    const count = (entry && !lockExpired ? entry.count : 0) + 1
    failures.set(ip, { count, until: count >= MAX_FAILS ? Date.now() + LOCK_MS : 0 })
    res.status(401).json({ error: 'E-mail ou mot de passe incorrect.' })
    return
  }

  failures.delete(ip)
  res.json({ token: createSession(adminEmail), email: adminEmail })
})

// GET /api/admin/verify — used by the backoffice to check a stored session
router.get('/verify', requireAdmin, (_req, res) => {
  res.json({ ok: true, email: res.locals.adminEmail })
})

export default router
