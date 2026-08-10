import { useEffect, useState } from 'react'
import { useAdminAuth } from './AdminAuthContext'
import { deleteMessage, fetchMessages, setMessageRead, type ContactMessage } from './adminApi'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function AdminMessages() {
  const { token } = useAdminAuth()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function load() {
    if (!token) return
    setLoading(true)
    fetchMessages(token)
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [token])

  async function toggleRead(msg: ContactMessage) {
    if (!token) return
    const updated = await setMessageRead(token, msg.id, !msg.read)
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? updated : m)))
  }

  async function handleDelete(id: string) {
    if (!token) return
    if (!confirm('Supprimer ce message ?')) return
    await deleteMessage(token, id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <div>
          <h1>Messages de contact</h1>
          <p>
            {messages.length} message{messages.length !== 1 ? 's' : ''}
            {unreadCount > 0 && ` · ${unreadCount} non lu${unreadCount !== 1 ? 's' : ''}`}
          </p>
        </div>
      </header>

      {error && <p className="contact-form__error">{error}</p>}
      {loading && <p className="admin-empty">Chargement...</p>}
      {!loading && messages.length === 0 && !error && (
        <p className="admin-empty">Aucun message pour l&apos;instant.</p>
      )}

      <div className="admin-messages">
        {messages.map((msg) => (
          <article key={msg.id} className={`admin-message ${msg.read ? '' : 'admin-message--unread'}`}>
            <div className="admin-message__top">
              <div>
                <h3>{msg.name}</h3>
                <a href={`mailto:${msg.email}`}>{msg.email}</a>
              </div>
              <span className="admin-message__date">{formatDate(msg.createdAt)}</span>
            </div>

            <div className="admin-message__tags">
              {msg.service && <span>{msg.service}</span>}
              {msg.delay && <span>{msg.delay}</span>}
            </div>

            <p className="admin-message__body">{msg.message}</p>

            <div className="admin-message__actions">
              <button onClick={() => toggleRead(msg)}>
                {msg.read ? 'Marquer non lu' : 'Marquer lu'}
              </button>
              <button className="admin-message__delete" onClick={() => handleDelete(msg.id)}>
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default AdminMessages
