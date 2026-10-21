import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import adminRouter from './routes/admin.js'
import contactRouter from './routes/contact.js'
import projectsRouter from './routes/projects.js'
import testimonialsRouter from './routes/testimonials.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 4000
// One or more comma-separated origins (Vite dev server, preview, production domain…)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const app = express()

app.use(cors({ origin: ALLOWED_ORIGINS }))
app.use(express.json())
// Uploaded files get a unique (uuid) name and are never overwritten → safe to cache for a long time
app.use('/uploads', express.static(join(__dirname, '..', 'uploads'), { maxAge: '30d', immutable: true }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/admin', adminRouter)
app.use('/api/contact', contactRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/testimonials', testimonialsRouter)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Erreur serveur.' })
})

app.listen(PORT, () => {
  console.log(`ErayDigital API listening on http://localhost:${PORT}`)
})
