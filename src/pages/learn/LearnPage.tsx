import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import ArticleCard from '@/components/common/ArticleCard'
import CtaSection from '@/components/common/CtaSection'
import EmailCapture from '@/components/common/EmailCapture'
import { ARTICLES, ARTICLE_CATEGORIES, getFeaturedArticles } from '@/data/articles'

const LearnPage = () => {
  const featured = getFeaturedArticles(3)
  const featuredSlugs = new Set(featured.map((a) => a.slug))
  const rest = ARTICLES.filter((a) => !featuredSlugs.has(a.slug))

  return (
    <div>
      <Seo
        title="Learn | Estate Planning Education for Families | Generation Catalyst"
        description="Plain-language estate planning education: how the process works, wills vs. trusts frameworks, trust funding, California-specific concepts, and a glossary — general information, not legal advice."
        path="/learn"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">The Learn hub</p>
            <h1 className="heading-lg mb-5">Estate planning, explained in plain language</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              General frameworks for understanding how estate planning works — the documents, the
              professionals, the taxes, and the follow-through. Everything here is education for
              any reader, not advice for your specific situation; for that, you need a licensed
              attorney.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding pb-8">
        <div className="container-width">
          <h2 className="heading-sm mb-6">Browse by topic</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ARTICLE_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/learn/${cat.id}`}
                className="card card-hover py-5 group"
              >
                <h3 className="font-serif text-lg font-semibold text-primary-900 group-hover:text-primary-700 mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">{cat.description}</p>
              </Link>
            ))}
            <Link to="/learn/glossary" className="card card-hover py-5 group">
              <h3 className="font-serif text-lg font-semibold text-primary-900 group-hover:text-primary-700 mb-1">
                Glossary
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                The terms of estate planning, defined without the jargon.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-10">
        <div className="container-width">
          <h2 className="heading-sm mb-6">Featured</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* All articles */}
      <section className="py-10 pb-16">
        <div className="container-width">
          <h2 className="heading-sm mb-6">All articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="pb-16">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <EmailCapture
              source="learn-checklist"
              heading="Get the Estate Planning Readiness Checklist"
              description="The companion to these articles: a plain-language checklist for getting your family organized before engaging any professional."
              successContent={
                <a
                  href="/resources/downloads/estate-planning-readiness-checklist.html"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open your checklist
                </a>
              }
            />
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}

export default LearnPage
