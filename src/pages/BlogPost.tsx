import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { Shapes, decor } from '../components/Decor'
import { tw, Arrow } from '../components/ui'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const back = 'mb-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#2f3bb8] transition hover:text-violet'

function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className={`${tw.page} pt-[160px] pb-32 text-center`}>
        <h1 className={tw.h2}>Article introuvable</h1>
        <Link to="/blog" className={`${tw.btn} mt-4`}>← Retour au blog</Link>
      </section>
    )
  }

  return (
    <article className={`${tw.page} isolate pt-[130px] pb-24`}>
      <Shapes items={decor.soft} />
      <div className={`${tw.wrap} max-w-[780px]`}>
        <Link to="/blog" className={back}>← Retour au blog</Link>

        <span className="mb-4 block w-fit rounded-full border border-royal/35 bg-white px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-[#2f3bb8] uppercase">{post.category}</span>
        <h1 className="mb-4 font-sora text-[clamp(30px,3.6vw,46px)] leading-[1.1] font-bold tracking-[-0.035em] text-ink">{post.title}</h1>
        <p className="mb-10 text-[13px] text-mute">{formatDate(post.date)} · {post.readTime} de lecture</p>

        <div className="grid gap-5 text-[16px] leading-[1.85] text-body">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="glass mt-14 flex flex-col items-start justify-between gap-5 rounded-[26px] p-7 sm:flex-row sm:items-center">
          <p className="font-sora text-lg font-semibold text-ink">Un projet similaire en tête ?</p>
          <Link to="/contact" className={tw.btn}>Contactez-nous <Arrow /></Link>
        </div>
      </div>
    </article>
  )
}

export default BlogPost
