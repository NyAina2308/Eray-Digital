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
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <span className="admin-login__badge">ErayDigital · Backoffice</span>
        <h1>Connexion</h1>
        <p>Entrez le token administrateur pour accéder au backoffice.</p>

        <label>
          Token
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ADMIN_TOKEN"
            autoFocus
            required
          />
        </label>

        {error && <p className="admin-login__error">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={submitting || !token.trim()}>
          {submitting ? 'Vérification...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
