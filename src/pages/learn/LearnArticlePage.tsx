import { Link, Navigate, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import Seo from '@/components/common/Seo'
import ArticleCard from '@/components/common/ArticleCard'
import CtaSection from '@/components/common/CtaSection'
import { FOOTER_DISCLAIMER } from '@/utils/constants'
import {
  Article,
  ArticleBlock,
  getArticleBySlug,
  getArticlesByCategory,
  getCategory,
} from '@/data/articles'

const Block = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )
    case 'quote':
      return <blockquote>{block.text}</blockquote>
    case 'p':
      return <p>{block.text}</p>
  }
}

function buildSchema(article: Article): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      url: `https://iamatrust.com/learn/${article.slug}`,
      author: {
        '@type': 'Organization',
        name: 'Generation Catalyst LLC',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Generation Catalyst LLC',
        logo: { '@type': 'ImageObject', url: 'https://iamatrust.com/logo-GC.png' },
      },
    },
  ]
}

const LearnArticlePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined
  const schema = useMemo(() => (article ? buildSchema(article) : []), [article])

  if (!article) {
    return <Navigate to="/learn" replace />
  }

  const category = getCategory(article.category)
  const related = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  return (
    <div>
      <Seo
        title={`${article.title} | Generation Catalyst`}
        description={article.description}
        path={`/learn/${article.slug}`}
        schema={schema}
      />

      <article>
        {/* Article header */}
        <header className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
          <div className="container-width section-padding">
            <div className="max-w-prose-wide mx-auto">
              <div className="flex items-center gap-3 mb-5">
                {category && (
                  <Link to={`/learn/${category.id}`} className="badge-primary hover:bg-primary-200">
                    {category.name}
                  </Link>
                )}
                <span className="text-xs text-neutral-500">
                  {new Date(`${article.date}T12:00:00`).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  · {article.readingMinutes} min read
                </span>
              </div>
              <h1 className="heading-lg mb-5">{article.title}</h1>
              <p className="text-lg text-neutral-700 leading-relaxed">{article.description}</p>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="container-width py-12 lg:py-16">
          <div className="article-body max-w-prose-wide mx-auto">
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {/* Required "Next steps" box */}
            <aside className="not-prose mt-12 rounded-xl border-2 border-accent-300 bg-accent-50 p-7">
              <h2 className="!mt-0 !mb-3 font-serif text-xl font-semibold text-primary-900">
                Next steps
              </h2>
              <p className="!mb-0 text-base text-neutral-700 leading-relaxed">
                This article provides general information only. For advice specific to your
                situation, consult a licensed estate planning attorney. If you’d like help
                coordinating your estate plan or handling the tax and funding side,{' '}
                <Link
                  to="/services/family-conversation"
                  className="font-medium text-primary-700 underline hover:text-primary-800"
                >
                  book a Family Planning Conversation
                </Link>
                .
              </p>
            </aside>

            {/* Article-level disclaimer */}
            <p className="legal-disclaimer mt-8">{FOOTER_DISCLAIMER}</p>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-width pb-16">
          <h2 className="heading-sm mb-6">Keep learning</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <CtaSection />
    </div>
  )
}

export default LearnArticlePage
