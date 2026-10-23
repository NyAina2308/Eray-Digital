import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'

// Chaque page (et tout le back-office) devient un fichier JS séparé, chargé à la visite.
// L'accueil reste dans le bundle principal : c'est la page d'arrivée la plus fréquente.
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const TechnologiesPage = lazy(() => import('./pages/TechnologiesPage'))
const Contact = lazy(() => import('./pages/Contact'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const AdminApp = lazy(() => import('./admin/AdminApp'))

/** Affiché le temps de télécharger une page (souvent imperceptible). */
function PageLoader() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-label="Chargement">
      <span className="size-9 animate-spin rounded-full border-[3px] border-violet/15 border-t-[#5a3cff]" />
    </div>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/technologies" element={<TechnologiesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Route>

          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
