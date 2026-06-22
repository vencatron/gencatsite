/**
 * LearnSlugPage
 *
 * Single entry point for /learn/:slug.
 * Routes to LearnCategoryPage for topic index pages (basics, california, etc.)
 * or to LearnArticlePage for article detail pages.
 */
import { useParams, Navigate } from 'react-router-dom'
import LearnCategoryPage from './LearnCategoryPage'
import LearnArticlePage from './LearnArticlePage'

const CATEGORY_SLUGS = new Set([
  'basics',
  'wills-vs-trusts',
  'funding',
  'california',
  'glossary',
])

const LearnSlugPage = () => {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return <Navigate to="/learn" replace />
  }

  if (CATEGORY_SLUGS.has(slug)) {
    return <LearnCategoryPage />
  }

  return <LearnArticlePage />
}

export default LearnSlugPage
