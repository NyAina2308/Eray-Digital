import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 jours

/** Hash a password as `scrypt$<salt>$<hash>` (hex). */
export function hashPassword(password: string) {
  const salt = randomBytes(16)
  const hash = scryptSync(password, salt, 64)
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

/** Constant-time check of a password against a `hashPassword` result. */
export function verifyPassword(password: string, stored: string) {
  const [scheme, saltHex, hashHex] = stored.split('$')
  if (scheme !== 'scrypt' || !saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, 'hex')
  const actual = scryptSync(password, Buffer.from(saltHex, 'hex'), expected.length)
  return timingSafeEqual(actual, expected)
}

function secret() {
  const s = process.env.SESSION_SECRET
  if (!s) throw new Error('SESSION_SECRET is not configured on the server.')
  return s
}

function sign(data: string) {
  return createHmac('sha256', secret()).update(data).digest('base64url')
}

/** Stateless session token: base64url(payload).signature */
export function createSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + SESSION_TTL_MS })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

/** Returns the session's email if the token is authentic and not expired. */
export function readSession(token: string): string | null {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expected = Buffer.from(sign(payload))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null

  try {
    const { email, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'))
    if (typeof email !== 'string' || typeof exp !== 'number' || exp < Date.now()) return null
    // A session stays valid only for the currently configured admin account
    if (email.toLowerCase() !== (process.env.ADMIN_EMAIL ?? '').toLowerCase()) return null
    return email
  } catch {
    return null
  }
}
