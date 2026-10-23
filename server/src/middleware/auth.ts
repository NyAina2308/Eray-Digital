import type { NextFunction, Request, Response } from 'express'
import { readSession } from '../auth.js'

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!process.env.SESSION_SECRET || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
    res.status(500).json({ error: 'Compte admin non configuré : lancez `npm run set-admin` dans server/.' })
    return
  }

  const token = req.header('authorization')?.replace('Bearer ', '') ?? ''
  const email = readSession(token)

  if (!email) {
    res.status(401).json({ error: 'Session expirée ou invalide. Reconnectez-vous.' })
    return
  }

  res.locals.adminEmail = email
  next()
}
