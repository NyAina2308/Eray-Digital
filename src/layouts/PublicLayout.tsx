import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageMeta } from '../hooks/usePageMeta'

function PublicLayout() {
  usePageMeta()

  return (
    <>
      <Navbar />
      <main>
        {/* Le menu et le pied de page restent affichés pendant le chargement d'une page */}
        <Suspense
          fallback={
            <div className="grid min-h-[80vh] place-items-center" role="status" aria-label="Chargement">
              <span className="size-9 animate-spin rounded-full border-[3px] border-violet/15 border-t-[#5a3cff]" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default PublicLayout
