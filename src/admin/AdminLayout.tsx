import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'
import { useMessageNotifications } from './useMessageNotifications'
import type { ContactMessage } from './adminApi'
import Logo from '../components/Logo'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${isActive ? 'bg-[linear-gradient(120deg,#7b3cff,#2f5bff)] text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'}`

/** Petite carte de notification en bas à droite ; se ferme seule après 8 s. */
function Toast({ message, onClose }: { message: ContactMessage; onClose: () => void }) {
  // Garde la dernière version de onClose sans relancer le minuteur à chaque rendu
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })
  useEffect(() => {
    const id = setTimeout(() => closeRef.current(), 8000)
    return () => clearTimeout(id)
  }, [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="pointer-events-auto flex w-[320px] items-start gap-3 rounded-2xl border border-violet/15 bg-white p-4 font-sora shadow-[0_24px_50px_-20px_rgba(40,30,160,.55)]"
      role="status"
    >
      <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#2f8bff,#7b3cff)] text-white">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 size-3 animate-ping rounded-full bg-[#ff4d6d]" />
        <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-[#ff4d6d]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold text-[#3a4bff]">Nouveau message</p>
        <p className="truncate text-[13.5px] font-semibold text-ink">{message.name}</p>
        <p className="line-clamp-2 text-[12px] leading-[1.45] text-mute">{message.message}</p>
        <Link to="/admin/messages" onClick={onClose} className="mt-1.5 inline-block text-[12px] font-semibold text-[#2f3bb8] hover:underline">
          Voir le message →
        </Link>
      </div>
      <button type="button" onClick={onClose} aria-label="Fermer" className="-mt-1 -mr-1 cursor-pointer rounded-lg border-0 bg-transparent px-1.5 text-lg leading-none text-mute hover:bg-violet/8 hover:text-ink">
        ×
      </button>
    </motion.div>
  )
}

function AdminLayout() {
  const { logout, token } = useAdminAuth()
  const navigate = useNavigate()
  const { unread, incoming, dismiss } = useMessageNotifications(token)

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#f6f5ff] font-sora max-md:flex-col">
      <aside className="flex w-60 shrink-0 flex-col gap-8 bg-night p-6 max-md:w-full max-md:flex-row max-md:flex-wrap max-md:items-center max-md:gap-4">
        <div>
          <Logo variant="light" />
        </div>
        <nav className="grid gap-1.5 max-md:flex">
          <NavLink to="/admin/messages" className={navLink}>
            Messages
            {unread > 0 && (
              <motion.span
                key={unread}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                className="grid h-5 min-w-5 place-items-center rounded-full bg-[#ff4d6d] px-1.5 text-[11px] leading-none font-bold text-white shadow-[0_0_0_3px_rgba(255,77,109,.25)]"
                aria-label={`${unread} message${unread > 1 ? 's' : ''} non lu${unread > 1 ? 's' : ''}`}
              >
                {unread > 99 ? '99+' : unread}
              </motion.span>
            )}
          </NavLink>
          <NavLink to="/admin/projects" className={navLink}>
            Projets
          </NavLink>
          <NavLink to="/admin/testimonials" className={navLink}>
            Avis clients
          </NavLink>
          <a href="/" target="_blank" rel="noreferrer" className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white">
            Voir le site ↗
          </a>
        </nav>
        <button className="mt-auto cursor-pointer rounded-xl border border-white/15 bg-transparent px-4 py-2.5 font-sora text-sm text-white/70 transition hover:bg-white/8 hover:text-white max-md:mt-0 max-md:ml-auto" onClick={handleLogout}>
          Déconnexion
        </button>
      </aside>

      <main className="min-w-0 flex-1 p-6 md:p-10">
        <Outlet />
      </main>

      {/* Notifications de nouveaux messages */}
      <div className="pointer-events-none fixed right-5 bottom-5 z-[300] grid gap-3" aria-live="polite">
        <AnimatePresence>
          {incoming.map((m) => (
            <Toast key={m.id} message={m} onClose={() => dismiss(m.id)} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdminLayout
