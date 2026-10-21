import type { ReactNode } from 'react'

/** Contenu des pages détail de chaque service (/services/:slug). */
export type ServiceDetail = {
  slug: string
  chip: string
  /** Titre : première ligne en encre, le reste en dégradé. */
  title: [string, ReactNode]
  lead: string
  /** Variante du visuel du hero et de la section méthode. */
  visual: 'code' | 'web' | 'design' | 'cloud'
  heroNote: ReactNode
  method: { title: [string, string]; text: string; items: { title: string; text: string }[] }
  advantages: { title: string; text: string }[]
  steps: { title: string; text: string }[]
  cta: ReactNode
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'developpement-web',
    chip: 'Développement web',
    title: ['Des sites web', <>modernes pour<br />votre activité.</>],
    lead: 'Nous créons des sites rapides, élégants et faciles à gérer : sites vitrines, e-commerce, plateformes et applications web.',
    visual: 'web',
    heroNote: <>Votre site,<br />notre code !</>,
    method: {
      title: ['On étudie vos besoins', 'spécifiques.'],
      text: 'Nous analysons votre activité et vos objectifs pour concevoir un site qui attire, convainc et convertit vos visiteurs.',
      items: [
        { title: 'Analyse & conseil', text: 'Compréhension de vos besoins' },
        { title: 'Design sur mesure', text: 'Une interface à votre image' },
        { title: 'Support & évolutivité', text: 'Toujours à vos côtés' },
      ],
    },
    advantages: [
      { title: 'Maquette', text: 'validée avant développement' },
      { title: 'Accompagnement', text: 'personnalisé' },
      { title: 'Site rapide', text: 'et optimisé' },
      { title: 'Un résultat', text: '100% sur mesure' },
    ],
    steps: [
      { title: 'Échange & analyse', text: 'de vos besoins' },
      { title: 'Maquette', text: 'et design' },
      { title: 'Développement', text: 'et tests' },
      { title: 'Mise en ligne & suivi', text: 'de votre site' },
    ],
    cta: <>Transformons votre idée<br />en un site performant.</>,
  },
  {
    slug: 'developpement-logiciel',
    chip: 'Conception logiciel',
    title: ['Des logiciels', <>sur mesure pour<br />vos besoins.</>],
    lead: 'Nous développons des solutions logicielles performantes, sécurisées et adaptées à votre activité.',
    visual: 'code',
    heroNote: <>Votre idée,<br />notre code !</>,
    method: {
      title: ['On étudie vos besoins', 'spécifiques.'],
      text: 'Nous analysons votre activité pour concevoir un logiciel qui vous simplifie la vie et booste votre productivité.',
      items: [
        { title: 'Analyse & conseil', text: 'Compréhension de vos besoins' },
        { title: 'Développement sur mesure', text: 'Technologies modernes' },
        { title: 'Support & évolutivité', text: 'Toujours à vos côtés' },
      ],
    },
    advantages: [
      { title: 'Maquette', text: 'avec analyse' },
      { title: 'Accompagnement', text: 'personnalisé' },
      { title: 'Livraison rapide', text: 'et suivie' },
      { title: 'Un résultat', text: '100% sur mesure' },
    ],
    steps: [
      { title: 'Échange & analyse', text: 'de vos besoins' },
      { title: 'Conception', text: 'de la solution' },
      { title: 'Développement', text: 'et tests' },
      { title: 'Livraison & suivi', text: 'de votre projet' },
    ],
    cta: <>Transformons votre idée<br />en un logiciel performant.</>,
  },
  {
    slug: 'design-graphique',
    chip: 'Design graphique',
    title: ['Une identité', <>visuelle qui<br />vous ressemble.</>],
    lead: 'Logos, chartes graphiques, supports de communication et design UI/UX : nous donnons vie à votre marque.',
    visual: 'design',
    heroNote: <>Votre marque,<br />notre créativité !</>,
    method: {
      title: ['On étudie votre', 'univers de marque.'],
      text: 'Nous partons de vos valeurs et de votre public pour créer des visuels cohérents, percutants et mémorables.',
      items: [
        { title: 'Analyse & conseil', text: 'Votre marque, vos cibles' },
        { title: 'Création sur mesure', text: 'Des visuels originaux' },
        { title: 'Déclinaisons', text: 'Sur tous vos supports' },
      ],
    },
    advantages: [
      { title: 'Propositions', text: 'et échanges' },
      { title: 'Accompagnement', text: 'personnalisé' },
      { title: 'Fichiers prêts', text: 'print et web' },
      { title: 'Un résultat', text: '100% sur mesure' },
    ],
    steps: [
      { title: 'Échange & analyse', text: 'de votre marque' },
      { title: 'Pistes créatives', text: 'et choix' },
      { title: 'Création', text: 'et ajustements' },
      { title: 'Livraison', text: 'de vos fichiers' },
    ],
    cta: <>Donnons vie<br />à votre identité visuelle.</>,
  },
  {
    slug: 'solutions-digitales',
    chip: 'Solutions digitales',
    title: ['Automatisez,', <>connectez,<br />transformez.</>],
    lead: 'Automatisation, intégration d’outils et conseil : nous accompagnons la transformation digitale de votre activité.',
    visual: 'cloud',
    heroNote: <>Moins de tâches,<br />plus de résultats !</>,
    method: {
      title: ['On étudie vos', 'processus.'],
      text: 'Nous identifions les tâches répétitives et les outils à relier pour vous faire gagner du temps au quotidien.',
      items: [
        { title: 'Audit & conseil', text: 'Vos processus actuels' },
        { title: 'Intégration', text: 'De vos outils existants' },
        { title: 'Support & évolutivité', text: 'Toujours à vos côtés' },
      ],
    },
    advantages: [
      { title: 'Audit', text: 'de vos processus' },
      { title: 'Accompagnement', text: 'personnalisé' },
      { title: 'Gain de temps', text: 'mesurable' },
      { title: 'Un résultat', text: '100% sur mesure' },
    ],
    steps: [
      { title: 'Audit & analyse', text: 'de vos processus' },
      { title: 'Conception', text: 'de la solution' },
      { title: 'Mise en place', text: 'et tests' },
      { title: 'Formation & suivi', text: 'de vos équipes' },
    ],
    cta: <>Transformons vos processus<br />en solutions digitales.</>,
  },
]
