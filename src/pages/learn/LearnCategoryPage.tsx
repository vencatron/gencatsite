import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import ArticleCard from '@/components/common/ArticleCard'
import CtaSection from '@/components/common/CtaSection'
import { CategoryId, getArticlesByCategory, getCategory } from '@/data/articles'

const LearnCategoryPage = ({ categoryId }: { categoryId: CategoryId }) => {
  const category = getCategory(categoryId)
  const articles = getArticlesByCategory(categoryId)

  if (!category) return null

  return (
    <div>
      <Seo
        title={`${category.title} | Learn | Generation Catalyst`}
        description={category.description}
        path={`/learn/${category.id}`}
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <Link to="/learn" className="text-sm font-medium text-accent-700 hover:text-accent-800">
              ← All topics
            </Link>
            <h1 className="heading-lg mt-4 mb-5">{category.title}</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">{category.description}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-neutral-600">
              Articles for this topic are coming soon.{' '}
              <Link to="/learn" className="text-primary-700 underline">
                Browse all articles
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <CtaSection />
    </div>
  )
}

export default LearnCategoryPage
