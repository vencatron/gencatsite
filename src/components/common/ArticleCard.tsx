import { Link } from 'react-router-dom'
import { Article, getCategory } from '@/data/articles'

const ArticleCard = ({ article }: { article: Article }) => {
  const category = getCategory(article.category)

  return (
    <Link
      to={`/learn/${article.slug}`}
      className="card card-hover flex flex-col h-full group focus-visible"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="badge-primary">{category?.name ?? 'Article'}</span>
        <span className="text-xs text-neutral-500">{article.readingMinutes} min read</span>
      </div>
      <h3 className="font-serif text-xl font-semibold text-primary-900 leading-snug mb-3 group-hover:text-primary-700 transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-neutral-600 leading-relaxed mb-4 flex-1">{article.description}</p>
      <span className="text-sm font-medium text-accent-700 group-hover:text-accent-800">
        Read article →
      </span>
    </Link>
  )
}

export default ArticleCard
