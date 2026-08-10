export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'micro-interactions-detail-qui-fait-la-difference',
    title: 'Les micro-interactions : le détail qui fait toute la différence',
    excerpt:
      'Un bouton qui réagit au survol, une transition fluide entre deux écrans : ces petits détails façonnent la perception de qualité de votre site.',
    date: '2026-05-12',
    category: 'Design',
    readTime: '4 min',
    content: [
      "Une micro-interaction est un petit moment d'échange entre l'utilisateur et l'interface : un bouton qui change de couleur au survol, un champ de formulaire qui vibre légèrement en cas d'erreur, une icône qui s'anime lors d'un clic. Prises individuellement, ces animations semblent anecdotiques. Mises bout à bout, elles définissent la sensation de qualité et de fluidité d'un produit digital.",
      "Chez ErayDigital, nous intégrons ces détails dès la phase de design, et non en dernière minute. Une transition trop lente frustre l'utilisateur, une animation trop rapide passe inaperçue : trouver le bon timing demande des itérations et des tests réels sur différents appareils.",
      "Au-delà de l'esthétique, les micro-interactions ont un rôle fonctionnel : elles confirment qu'une action a bien été prise en compte, guident l'attention vers l'information importante et réduisent la charge cognitive. C'est cette attention au détail qui distingue un site 'qui fonctionne' d'un site agréable à utiliser.",
    ],
  },
  {
    slug: 'du-brief-au-lancement-comment-on-construit-votre-site',
    title: 'Du brief au lancement : comment on construit votre site de A à Z',
    excerpt:
      "De la première prise de contact à la mise en ligne, voici comment se déroule concrètement un projet avec notre équipe.",
    date: '2026-04-02',
    category: 'Méthode',
    readTime: '5 min',
    content: [
      "Beaucoup de porteurs de projet hésitent à se lancer parce que le processus de création d'un site ou d'un logiciel leur semble flou. Voici, étape par étape, comment nous construisons un projet chez ErayDigital.",
      "Tout commence par une prise de contact et un cadrage : nous échangeons sur vos objectifs, votre cible et les contraintes techniques ou budgétaires. Cette étape permet de poser un périmètre clair avant même de parler de design.",
      "Vient ensuite la proposition : devis détaillé, premières maquettes et planning. Rien ne démarre en développement tant que le client n'a pas validé cette base. Puis nous entrons en phase de réalisation, avec des points d'étape réguliers pour ajuster le tir si besoin.",
      "Enfin, la livraison ne marque pas la fin de la relation : formation à la prise en main, puis support technique et maintenance corrective pour que votre solution reste fiable dans la durée.",
    ],
  },
  {
    slug: 'logiciel-sur-mesure-vs-solution-generique',
    title: 'Logiciel sur mesure ou solution générique : comment choisir ?',
    excerpt:
      "Un outil du marché est rarement pensé pour vos process exacts. Voici les questions à se poser avant de faire développer un logiciel sur mesure.",
    date: '2026-02-18',
    category: 'Logiciel',
    readTime: '6 min',
    content: [
      "Les solutions génériques (CRM, ERP, outils de gestion) ont l'avantage d'être rapides à mettre en place et peu coûteuses au démarrage. Mais elles imposent souvent d'adapter vos process métier à l'outil, plutôt que l'inverse.",
      "Un logiciel sur mesure devient pertinent dès que vos besoins sortent du cadre standard : un workflow spécifique, une intégration particulière avec vos outils existants, ou une volumétrie qui rend les licences génériques coûteuses à l'usage.",
      "La bonne approche consiste souvent à commencer petit : automatiser une seule tâche répétitive et chronophage, mesurer le gain de temps réel, puis étendre le logiciel au reste de l'activité. C'est cette logique itérative que nous appliquons à chaque projet logiciel.",
    ],
  },
]
