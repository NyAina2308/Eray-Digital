import cgaAvema from '../assets/projects/cga-avema.jpg'
import asfifo from '../assets/projects/asfifo.jpg'
import camoi from '../assets/projects/camoi.jpg'
import rekany from '../assets/projects/rekany.jpg'
import holidayBeach from '../assets/projects/holiday-beach.jpg'
import matezaTole from '../assets/projects/mateza-tole.jpg'

export type Project = {
  name: string
  category: string
  description: string
  image: string
  /** Lien du site en ligne, saisi dans le back-office */
  url?: string
}

/**
 * Copie locale des réalisations, affichée si l'API est injoignable.
 * La liste de référence se gère dans le back-office (Projets).
 */
export const projects: Project[] = [
  {
    name: 'CGA AVEMA',
    category: 'Site institutionnel',
    description: "Site du Centre de Gestion Agréé AVEMA à Antsirabe : présentation de l'accompagnement comptable, fiscal, juridique et social, adhésion en ligne et blog.",
    image: cgaAvema,
    url: 'https://cga-avema.mg/',
  },
  {
    name: 'ASFIFO',
    category: 'Formation professionnelle',
    description: "Site de l'organisme de formation ASFIFO, agréé par l'État depuis 2016 : alternance, recrutement, formation et intégration en entreprise, incubation et parcours dirigeants.",
    image: asfifo,
    url: 'https://asfifo.mg/',
  },
  {
    name: 'CAMOI 3.0',
    category: 'Expertise comptable',
    description: "Site du cabinet CAMOI 3.0 : expertise comptable, audit, conseil en stratégie d'entreprise et centre de formation professionnelle à Madagascar.",
    image: camoi,
    url: 'https://camoi.mg/',
  },
  {
    name: 'REKANY AGRI',
    category: 'Agriculture & E-commerce',
    description: "Site de REKANY AGRI, qui produit et commercialise avec les paysans malgaches des produits de qualité issus d'une agriculture respectueuse : catalogue et panier en ligne.",
    image: rekany,
    url: 'https://rekany.mg/',
  },
  {
    name: 'Holiday Beach Hotel',
    category: 'Hôtellerie & Tourisme',
    description: "Site de l'hôtel 3 étoiles Holiday Beach à Nosy Be : présentation des chambres, du restaurant et des activités, galerie photo, site bilingue et réservation en ligne.",
    image: holidayBeach,
    url: 'https://holidaybeachhotel-nosybe.com/',
  },
  {
    name: 'Mateza Tôle',
    category: 'Matériaux de construction',
    description: 'Site de Mateza Tôle, magasin de matériaux de construction à Antananarivo : catalogue de tôles et accessoires, actualités, demande de devis en ligne et espace client.',
    image: matezaTole,
    url: 'https://matezatole.com/',
  },
]
