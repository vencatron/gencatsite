import { useEffect } from 'react'

const SITE_URL = 'https://iamatrust.com'

interface SeoProps {
  title: string
  description: string
  path?: string
  /** JSON-LD structured data objects injected for this page */
  schema?: Record<string, unknown>[]
}

function upsertMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-page SEO: title, meta description, canonical URL, and optional
 * JSON-LD schema (Article, FAQPage, etc.).
 */
const Seo = ({ title, description, path, schema }: SeoProps) => {
  useEffect(() => {
    document.title = title
    upsertMeta('description', description)
    if (path !== undefined) {
      upsertCanonical(`${SITE_URL}${path}`)
    }

    const scripts: HTMLScriptElement[] = []
    if (schema) {
      for (const obj of schema) {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.dataset.pageSchema = 'true'
        script.textContent = JSON.stringify(obj)
        document.head.appendChild(script)
        scripts.push(script)
      }
    }
    return () => {
      scripts.forEach((s) => s.remove())
    }
  }, [title, description, path, schema])

  return null
}

export default Seo
