import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function Blog() {
  return (
    <section className="blog-page">
      <div className="contact-hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">Blog</span>
          <h1 className="contact-hero__title">Nos perspectives de blog</h1>
          <p className="contact-hero__subtitle">
            Réflexions sur le design, le développement et la création de
            logiciels sur mesure.
          </p>
        </div>
      </div>

      <div className="container blog-grid">
        {blogPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
            <span className="blog-card__category">{post.category}</span>
            <h2 className="blog-card__title">{post.title}</h2>
            <p className="blog-card__excerpt">{post.excerpt}</p>
            <div className="blog-card__meta">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} de lecture</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Blog
