import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'Eray Digital'

const DEFAULT_DESCRIPTION =
  'Eray Digital, agence digitale à Madagascar : sites web, logiciels sur mesure, design graphique, IoT & systèmes embarqués, automatisation et community management.'

/** Titre et description de chaque page publique (référencement + titre de l'onglet). */
const PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE} · Agence digitale à Madagascar`,
    description: DEFAULT_DESCRIPTION,
  },
  '/a-propos': {
    title: `À propos · ${SITE}`,
    description: "Découvrez l'équipe Eray Digital, nos valeurs et notre manière de travailler : comprendre avant de créer.",
  },
  '/services': {
    title: `Nos services · ${SITE}`,
    description: 'Développement web, logiciels sur mesure, design graphique, IoT, automatisation et community management : des solutions numériques adaptées à votre activité.',
  },
  '/projets': {
    title: `Nos réalisations · ${SITE}`,
    description: 'Sites web et solutions digitales réalisés par Eray Digital pour des entreprises, organisations et marques à Madagascar.',
  },
  '/technologies': {
    title: `Technologies · ${SITE}`,
    description: 'Les technologies et outils que nous utilisons : React, Node.js, Laravel, WordPress, Figma et plus.',
  },
  '/contact': {
    title: `Contact · ${SITE}`,
    description: 'Parlons de votre projet : contactez Eray Digital pour un devis personnalisé. Réponse sous 24 h.',
  },
  '/blog': {
    title: `Blog · ${SITE}`,
    description: 'Conseils, actualités et retours d’expérience sur le web, le design et la transformation digitale.',
  },
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute(attr, value)
}

/** Met à jour <title>, la description et les balises Open Graph à chaque changement de page. */
export function usePageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Les sous-pages (/services/:slug, /blog/:slug) héritent de leur section
    const section = Object.keys(PAGES).find((p) => p !== '/' && pathname.startsWith(`${p}/`))
    const meta = PAGES[pathname] ?? (section ? PAGES[section] : PAGES['/'])

    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', window.location.origin + pathname)
  }, [pathname])
}
