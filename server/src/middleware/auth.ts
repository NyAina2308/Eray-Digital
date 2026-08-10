import type { NextFunction, Request, Response } from 'express'

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization')?.replace('Bearer ', '')
  const expected = process.env.ADMIN_TOKEN

  if (!expected) {
    res.status(500).json({ error: 'ADMIN_TOKEN is not configured on the server.' })
    return
  }

  if (token !== expected) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  next()
}
