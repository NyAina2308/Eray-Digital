import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/admin/verify — used by the backoffice login screen to check a token
router.get('/verify', requireAdmin, (_req, res) => {
  res.json({ ok: true })
})

export default router
