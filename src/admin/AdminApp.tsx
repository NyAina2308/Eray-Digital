import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminAuthProvider } from './AdminAuthContext'
import AdminRoute from './AdminRoute'
import AdminLayout from './AdminLayout'
import AdminLogin from './AdminLogin'
import AdminMessages from './AdminMessages'
import AdminProjects from './AdminProjects'
import AdminTestimonials from './AdminTestimonials'

/**
 * Tout le back-office, monté sous /admin/*. Chargé à la demande depuis App.tsx :
 * les visiteurs du site ne téléchargent jamais ce code.
 */
function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminMessages />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  )
}

export default AdminApp
