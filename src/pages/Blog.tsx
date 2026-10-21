import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { tw, Arrow } from '../components/ui'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function Blog() {
  return (
    <div className={tw.page}>
      <PageHero kicker="Blog" title={<>Nos perspectives <span className="text-grad">de blog</span></>}>
        Réflexions sur le design, le développement et la création de logiciels sur mesure.
      </PageHero>

      <section className={`${tw.wrap} grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3`}>
        {blogPosts.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 90} className="min-w-0">
            <Link to={`/blog/${post.slug}`} className={`${tw.card} group flex h-full flex-col p-7`}>
              <span className="mb-4 w-fit rounded-full border border-royal/35 bg-white px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-[#2f3bb8] uppercase">{post.category}</span>
              <h2 className="mb-3 font-sora text-lg leading-[1.3] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-violet">{post.title}</h2>
              <p className="mb-6 flex-1 text-[13px] leading-[1.7] text-body">{post.excerpt}</p>
              <div className="flex items-center justify-between gap-3 text-[11.5px] text-mute">
                <span>{formatDate(post.date)} · {post.readTime} de lecture</span>
                <span className="grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,#2f8bff,#5a3cff)] text-white"><Arrow className="size-3.5 transition group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  )
}

export default Blog
