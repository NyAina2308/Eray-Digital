/**
 * Creates or updates the backoffice admin account in server/.env.
 *
 *   npm run set-admin -- <email> <password>
 *
 * Stores the e-mail, a scrypt hash of the password (never the password itself)
 * and generates SESSION_SECRET if it is missing. Restart the server afterwards.
 */
import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { hashPassword } from './auth.js'

const ENV_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', '.env')
const [email, password] = process.argv.slice(2)

if (!email || !/^\S+@\S+\.\S+$/.test(email) || !password) {
  console.error('Usage : npm run set-admin -- <email> <mot-de-passe>')
  process.exit(1)
}
if (password.length < 8) {
  console.error('Le mot de passe doit contenir au moins 8 caractères.')
  process.exit(1)
}

let env = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf-8') : ''

function setVar(key: string, value: string) {
  const line = `${key}=${value}`
  const re = new RegExp(`^${key}=.*$`, 'm')
  env = re.test(env) ? env.replace(re, line) : `${env.trimEnd()}\n${line}\n`
}

setVar('ADMIN_EMAIL', email.trim())
setVar('ADMIN_PASSWORD_HASH', hashPassword(password))
if (!/^SESSION_SECRET=.+$/m.test(env)) setVar('SESSION_SECRET', randomBytes(32).toString('hex'))
// Old single-token login is no longer used
env = env.replace(/^ADMIN_TOKEN=.*\n?/m, '')

writeFileSync(ENV_PATH, env)
console.log(`Compte admin enregistré pour ${email.trim()}. Redémarrez le serveur pour l'appliquer.`)
