import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'
import Logo from '../components/Logo'

function AdminLayout() {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

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
          <NavLink to="/admin/messages" className={({ isActive }) => `rounded-xl px-4 py-2.5 text-sm font-medium transition ${isActive ? 'bg-[linear-gradient(120deg,#7b3cff,#2f5bff)] text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'}`}>
            Messages
          </NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => `rounded-xl px-4 py-2.5 text-sm font-medium transition ${isActive ? 'bg-[linear-gradient(120deg,#7b3cff,#2f5bff)] text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'}`}>
            Projets
          </NavLink>
        </nav>
        <button className="mt-auto cursor-pointer rounded-xl border border-white/15 bg-transparent px-4 py-2.5 font-sora text-sm text-white/70 transition hover:bg-white/8 hover:text-white max-md:mt-0 max-md:ml-auto" onClick={handleLogout}>
          Déconnexion
        </button>
      </aside>

      <main className="min-w-0 flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
