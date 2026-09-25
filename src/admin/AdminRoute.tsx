import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'

function AdminRoute() {
  const { status } = useAdminAuth()

  if (status === 'checking') {
    return <div className="grid min-h-screen place-items-center font-sora text-sm text-mute">Chargement...</div>
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default AdminRoute
