import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'
import Logo from '../components/Logo'

const field = 'mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50'

function AdminLogin() {
  const { login, status } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (status === 'authenticated') {
    return <Navigate to="/admin/messages" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/admin/messages')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connexion impossible.')
      setPassword('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-night bg-[radial-gradient(600px_400px_at_50%_0%,rgba(106,60,255,.35),transparent_70%)] p-6 font-sora">
      <div className="grid w-full max-w-[420px] gap-6">
        <div className="justify-self-center"><Logo variant="light" /></div>
        <form className="glass grid gap-4 rounded-[28px] p-8" onSubmit={handleSubmit}>
          <span className="w-fit rounded-full border border-violet/35 bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#3a2bd8] uppercase">Backoffice</span>
          <h1 className="font-sora text-2xl font-bold text-ink">Connexion</h1>
          <p className="text-sm text-body">Connectez-vous avec votre compte administrateur.</p>

          <label className="block text-[12.5px] font-semibold text-ink-2">
            E-mail
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@eraydigital.tech"
              className={field}
              autoFocus
              required
            />
          </label>

          <label className="block text-[12.5px] font-semibold text-ink-2">
            Mot de passe
            <span className="relative block">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${field} pr-20`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-2 mt-[3px] -translate-y-1/2 cursor-pointer rounded-lg border-0 bg-transparent px-2.5 py-1 text-[11.5px] font-semibold text-[#3a4bff] hover:bg-violet/8"
              >
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </span>
          </label>

          {error && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]" role="alert">{error}</p>}

          <button
            type="submit"
            className="btn-blue mt-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-5 py-3 font-sora text-[13px] font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting || !email.trim() || !password}
          >
            {submitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
