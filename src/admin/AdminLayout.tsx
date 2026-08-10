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
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <Logo variant="light" />
        </div>
        <nav className="admin__nav">
          <NavLink to="/admin/messages" className={({ isActive }) => (isActive ? 'active' : '')}>
            Messages
          </NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
            Projets
          </NavLink>
        </nav>
        <button className="admin__logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </aside>

      <main className="admin__content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
