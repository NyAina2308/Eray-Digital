import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import adminRouter from './routes/admin.js'
import contactRouter from './routes/contact.js'
import projectsRouter from './routes/projects.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 4000
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5183'

const app = express()

app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(express.json())
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/admin', adminRouter)
app.use('/api/contact', contactRouter)
app.use('/api/projects', projectsRouter)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Erreur serveur.' })
})

app.listen(PORT, () => {
  console.log(`ErayDigital API listening on http://localhost:${PORT}`)
})
