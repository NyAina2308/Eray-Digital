import associationAnalasoa from '../assets/projects/Association-Analasoa-BPdyBL6x.jpg'
import terrela from '../assets/projects/Terrela-D-c9KETz.jpg'
import matezaTole from '../assets/projects/Matezatole-BxF3xFUf.jpg'
import bataer from '../assets/projects/bataer-loop-CzkZRZ9A.jpg'
import djMimie from '../assets/projects/djette-loop-CsULJtGe.jpg'
import radiataExplorer from '../assets/projects/radiata-explorer-W3y1EQWJ.jpg'

export type Project = {
  name: string
  category: string
  description: string
  image: string
}

export const projects: Project[] = [
  {
    name: 'Association Analasoa',
    category: 'Site associatif',
    description: "Plateforme vitrine pour une ONG environnementale malgache, pensée pour la sensibilisation et la collecte de dons.",
    image: associationAnalasoa,
  },
  {
    name: 'Terrela MDG',
    category: 'E-commerce',
    description: "Boutique en ligne d'artisanat malgache : mise en avant produit, catalogue et tunnel d'achat sur mesure.",
    image: terrela,
  },
  {
    name: 'Mateza Tôle',
    category: 'Site vitrine',
    description: 'Catalogue de matériaux de construction avec demande de devis en ligne pour un acteur du BTP à Tana.',
    image: matezaTole,
  },
  {
    name: 'B.A.T',
    category: 'BTP & Construction',
    description: "Site vitrine présentant les réalisations et services d'une entreprise de construction, avant/après compris.",
    image: bataer,
  },
  {
    name: 'Dj Mimie',
    category: 'Portfolio artiste',
    description: "Site portfolio pour une DJ : univers visuel fort, réservations et présentation des prestations.",
    image: djMimie,
  },
  {
    name: 'Radiata Explorer',
    category: 'Tourisme & écotourisme',
    description: "Site de circuits touristiques axés nature, avec mise en avant des destinations et devis en ligne.",
    image: radiataExplorer,
  },
]
