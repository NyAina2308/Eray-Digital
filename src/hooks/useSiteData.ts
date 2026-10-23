import { useEffect, useState } from 'react'
import { API_URL } from '../lib/api'
import { projects as localProjects, type Project } from '../data/projects'

export type PublicTestimonial = { id: string; name: string; role: string; text: string; rating: number }

/** Avis affiché tant que le serveur n'a pas répondu (ou s'il est injoignable). */
const localTestimonials: PublicTestimonial[] = [
  {
    id: 'local-1',
    name: 'Miora R.',
    role: 'Cliente',
    text: 'L’équipe d’Eray Digital a su transformer notre idée en une solution digitale performante. Professionnalisme, réactivité et créativité au top !',
    rating: 5,
  },
]

const resolveImage = (url: string) => (!url || url.startsWith('http') ? url : `${API_URL}${url}`)

/**
 * Charge une ressource publique de l'API ; garde `fallback` si le serveur
 * est injoignable ou renvoie une liste vide, pour que le site reste complet.
 */
function useApiList<T, R>(path: string, fallback: T[], map: (raw: R) => T): T[] {
  const [items, setItems] = useState<T[]>(fallback)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${API_URL}${path}`, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: R[]) => {
        if (Array.isArray(data) && data.length) setItems(data.map(map))
      })
      .catch(() => {
        // Serveur indisponible : on garde les données locales.
      })
    return () => ctrl.abort()
    // `map` et `fallback` sont des constantes au niveau module chez les appelants.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return items
}

type RawProject = { name: string; category: string; description: string; imageUrl: string; url?: string }

const mapProject = (p: RawProject): Project => ({
  name: p.name,
  category: p.category,
  description: p.description,
  image: resolveImage(p.imageUrl),
  url: p.url || undefined,
})

const mapTestimonial = (t: PublicTestimonial): PublicTestimonial => t

/** Projets gérés dans le back-office (repli : src/data/projects.ts). */
export function useProjects() {
  return useApiList<Project, RawProject>('/api/projects', localProjects, mapProject)
}

/** Avis clients publiés depuis le back-office. */
export function useTestimonials() {
  return useApiList<PublicTestimonial, PublicTestimonial>('/api/testimonials', localTestimonials, mapTestimonial)
}
