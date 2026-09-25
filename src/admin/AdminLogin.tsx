import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'

function AdminLogin() {
  const { login, status } = useAdminAuth()
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (status === 'authenticated') {
    return <Navigate to="/admin/messages" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const ok = await login(token.trim())
    setSubmitting(false)
    if (ok) {
      navigate('/admin/messages')
    } else {
      setError('Token invalide. Vérifiez ADMIN_TOKEN dans server/.env.')
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-night bg-[radial-gradient(600px_400px_at_50%_0%,rgba(106,60,255,.35),transparent_70%)] p-6 font-sora">
      <form className="glass grid w-full max-w-[420px] gap-4 rounded-[28px] p-8" onSubmit={handleSubmit}>
        <span className="w-fit rounded-full border border-violet/35 bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#3a2bd8] uppercase">ErayDigital · Backoffice</span>
        <h1 className="font-sora text-2xl font-bold text-ink">Connexion</h1>
        <p className="text-sm text-body">Entrez le token administrateur pour accéder au backoffice.</p>

        <label className="block text-[12.5px] font-semibold text-ink-2">
          Token
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ADMIN_TOKEN"
            className="mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50"
            autoFocus
            required
          />
        </label>

        {error && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]">{error}</p>}

        <button type="submit" className="btn-blue inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-5 py-2.5 font-sora text-[13px] font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting || !token.trim()}>
          {submitting ? 'Vérification...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
