import { useEffect, useState } from 'react'
import { useAdminAuth } from './AdminAuthContext'
import { deleteMessage, fetchMessages, setMessageRead, type ContactMessage } from './adminApi'
import { MESSAGES_ARRIVED, notifyMessagesChanged } from './useMessageNotifications'

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

  // Recharge la liste quand une notification signale de nouveaux messages
  useEffect(() => {
    if (!token) return
    const reload = () => fetchMessages(token).then(setMessages).catch(() => {})
    window.addEventListener(MESSAGES_ARRIVED, reload)
    return () => window.removeEventListener(MESSAGES_ARRIVED, reload)
  }, [token])

  async function toggleRead(msg: ContactMessage) {
    if (!token) return
    const updated = await setMessageRead(token, msg.id, !msg.read)
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? updated : m)))
    notifyMessagesChanged()
  }

  async function handleDelete(id: string) {
    if (!token) return
    if (!confirm('Supprimer ce message ?')) return
    await deleteMessage(token, id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
    notifyMessagesChanged()
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-sora text-[28px] font-bold tracking-[-0.02em] text-ink">Messages de contact</h1>
          <p className="text-sm text-mute">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
            {unreadCount > 0 && ` · ${unreadCount} non lu${unreadCount !== 1 ? 's' : ''}`}
          </p>
        </div>
      </header>

      {error && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]">{error}</p>}
      {loading && <p className="py-10 text-center text-sm text-mute">Chargement...</p>}
      {!loading && messages.length === 0 && !error && (
        <p className="py-10 text-center text-sm text-mute">Aucun message pour l&apos;instant.</p>
      )}

      <div className="grid gap-4">
        {messages.map((msg) => (
          <article key={msg.id} className={`grid gap-3 rounded-2xl border bg-white p-5 shadow-[0_14px_40px_-30px_rgba(70,50,200,.5)] ${msg.read ? 'border-violet/10' : 'border-l-4 border-violet/25 border-l-violet'}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-sora text-base font-semibold text-ink">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-[13px] text-[#2f3bb8] hover:underline">{msg.email}</a>
              </div>
              <span className="text-xs text-mute">{formatDate(msg.createdAt)}</span>
            </div>

            <div className="flex flex-wrap gap-2 [&>span]:rounded-full [&>span]:bg-violet/8 [&>span]:px-3 [&>span]:py-1 [&>span]:text-[11px] [&>span]:font-medium [&>span]:text-[#3a2bd8]">
              {msg.service && <span>{msg.service}</span>}
              {msg.delay && <span>{msg.delay}</span>}
            </div>

            <p className="text-sm leading-[1.7] whitespace-pre-line text-body">{msg.message}</p>

            <div className="flex flex-wrap gap-2">
              <button className="cursor-pointer rounded-lg border border-violet/15 bg-white px-3 py-1.5 font-sora text-xs font-medium text-ink-2 transition hover:border-violet/40 hover:text-violet" onClick={() => toggleRead(msg)}>
                {msg.read ? 'Marquer non lu' : 'Marquer lu'}
              </button>
              <button className="cursor-pointer rounded-lg border border-[#f3c0cc] bg-white px-3 py-1.5 font-sora text-xs font-medium text-[#c2244a] transition hover:bg-[#ffe9ee]" onClick={() => handleDelete(msg.id)}>
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
