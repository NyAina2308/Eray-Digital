import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="blog-post blog-post--empty">
        <div className="container">
          <h1>Article introuvable</h1>
          <Link to="/blog" className="btn btn-primary">
            ← Retour au blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="blog-post">
      <div className="container">
        <Link to="/blog" className="blog-post__back">
          ← Retour au blog
        </Link>

        <span className="blog-card__category">{post.category}</span>
        <h1 className="blog-post__title">{post.title}</h1>
        <div className="blog-card__meta">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} de lecture</span>
        </div>

        <div className="blog-post__content">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-post__cta">
          <p>Un projet similaire en tête ?</p>
          <Link to="/contact" className="btn btn-primary">
            Contactez-nous →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogPost
