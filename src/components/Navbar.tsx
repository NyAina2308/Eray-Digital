import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { tw, Arrow } from './ui'

const LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/projets', label: 'Réalisations' },
  { href: '/technologies', label: 'Technologies' },
  { href: '/contact', label: 'Contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  // Lien actif : même chemin (et même ancre pour les liens de section de l'accueil)
  const isActive = (href: string) => {
    const [path, anchor] = href.split('#')
    if (anchor) return pathname === path && hash === `#${anchor}`
    if (path === '/') return pathname === '/' && !hash
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`pointer-events-none fixed inset-x-0 z-[100] px-4 font-sora transition-[top] duration-400 ${scrolled ? 'top-2.5' : 'top-4'}`}>
      <div
        className={`pointer-events-auto mx-auto flex max-w-[1280px] items-center gap-6 rounded-[22px] border border-violet/10 py-2.5 pr-2.5 pl-4 backdrop-blur-[18px] backdrop-saturate-[1.4] transition duration-400 max-[1060px]:flex-wrap max-[1060px]:gap-3 ${
          scrolled ? 'bg-white/88 shadow-[0_18px_50px_-20px_rgba(40,30,120,.35)]' : 'bg-white/72 shadow-[0_10px_40px_-20px_rgba(40,30,120,.25)]'
        }`}
      >
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav
          className={`ml-auto flex items-center gap-1 max-[1060px]:order-3 max-[1060px]:m-0 max-[1060px]:w-full max-[1060px]:flex-col max-[1060px]:items-stretch max-[1060px]:gap-0.5 max-[1060px]:overflow-hidden max-[1060px]:transition-[max-height,padding] max-[1060px]:duration-500 ${
            open ? 'max-[1060px]:max-h-[520px] max-[1060px]:pt-2 max-[1060px]:pb-1.5' : 'max-[1060px]:max-h-0'
          }`}
        >
          {LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`relative rounded-full px-3 py-2 text-[13.5px] transition-colors duration-200 hover:bg-violet/7 hover:text-violet max-[1180px]:px-[9px] max-[1180px]:text-[13px] max-[1060px]:px-3.5 max-[1060px]:py-3 max-[1060px]:text-[15px]
                  after:absolute after:bottom-0.5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-sm after:bg-[linear-gradient(120deg,#7b3cff,#5a4bff_45%,#2f5bff)] after:transition-[width] after:duration-300 after:content-['']
                  max-[1060px]:after:bottom-1/2 max-[1060px]:after:left-1.5 max-[1060px]:after:translate-x-0 max-[1060px]:after:translate-y-1/2
                  ${active
                    ? 'font-semibold text-violet after:w-[calc(100%-24px)] max-[1060px]:bg-violet/8 max-[1060px]:after:h-[18px] max-[1060px]:after:w-[3px]'
                    : 'font-medium text-body after:w-0'}`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-blue group mt-2 hidden items-center justify-center gap-2.5 rounded-full px-6 py-3 font-sora text-[13px] font-semibold max-[1060px]:flex">
            Parlons de votre projet <Arrow />
          </Link>
        </nav>

        <Link to="/contact" className={`${tw.btn} whitespace-nowrap max-[1060px]:hidden`}>
          Parlons de votre projet <Arrow />
        </Link>

        <button
          className="relative ml-auto hidden size-11 cursor-pointer rounded-[14px] border-0 bg-[#f6f5ff] max-[1060px]:block"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute inset-x-[13px] top-[17px] h-0.5 rounded-sm bg-ink transition-transform duration-300 ${open ? 'translate-y-1 rotate-45' : ''}`} />
          <span className={`absolute inset-x-[13px] top-[25px] h-0.5 rounded-sm bg-ink transition-transform duration-300 ${open ? '-translate-y-1 -rotate-45' : ''}`} />
        </button>
      </div>
    </header>
  )
}

export default Navbar
