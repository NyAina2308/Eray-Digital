import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'

function AdminRoute() {
  const { status } = useAdminAuth()

  if (status === 'checking') {
    return <div className="admin-loading">Chargement...</div>
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default AdminRoute
