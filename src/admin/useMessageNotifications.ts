import { useEffect, useRef, useState } from 'react'
import { fetchMessages, type ContactMessage } from './adminApi'

const POLL_MS = 20_000

/** Événement à déclencher quand on lit / supprime un message, pour mettre le badge à jour tout de suite. */
export const MESSAGES_CHANGED = 'admin:messages-changed'

export function notifyMessagesChanged() {
  window.dispatchEvent(new Event(MESSAGES_CHANGED))
}

/** Déclenché quand de nouveaux messages arrivent, pour rafraîchir la page Messages ouverte. */
export const MESSAGES_ARRIVED = 'admin:messages-arrived'

/**
 * Surveille les messages de contact : nombre de non lus (badge) et liste des
 * messages arrivés depuis l'ouverture du back-office (notifications).
 */
export function useMessageNotifications(token: string | null) {
  const [unread, setUnread] = useState(0)
  const [incoming, setIncoming] = useState<ContactMessage[]>([])
  // Ids déjà vus ; null tant que le premier chargement n'a pas eu lieu (pas de notification au démarrage)
  const seen = useRef<Set<string> | null>(null)

  useEffect(() => {
    if (!token) return
    let cancelled = false

    async function check() {
      try {
        const messages = await fetchMessages(token!)
        if (cancelled) return
        setUnread(messages.filter((m) => !m.read).length)

        if (seen.current) {
          const fresh = messages.filter((m) => !seen.current!.has(m.id) && !m.read)
          if (fresh.length) {
            setIncoming((prev) => [...fresh, ...prev].slice(0, 3))
            window.dispatchEvent(new Event(MESSAGES_ARRIVED))
          }
        }
        seen.current = new Set(messages.map((m) => m.id))
      } catch {
        // Serveur momentanément injoignable : on réessaiera au prochain tour.
      }
    }

    check()
    const id = setInterval(check, POLL_MS)
    window.addEventListener(MESSAGES_CHANGED, check)
    // Revérifie dès qu'on revient sur l'onglet
    const onVisible = () => document.visibilityState === 'visible' && check()
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      clearInterval(id)
      window.removeEventListener(MESSAGES_CHANGED, check)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [token])

  // Compteur dans le titre de l'onglet : « (2) Backoffice · Eray Digital »
  useEffect(() => {
    const previous = document.title
    document.title = `${unread ? `(${unread}) ` : ''}Backoffice · Eray Digital`
    return () => {
      document.title = previous
    }
  }, [unread])

  function dismiss(id: string) {
    setIncoming((prev) => prev.filter((m) => m.id !== id))
  }

  return { unread, incoming, dismiss }
}
