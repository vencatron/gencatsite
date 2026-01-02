import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    'All',
    'Estate Planning',
    'Tax Planning',
    'Family Planning',
    'Business Planning'
  ]

  const blogPosts = [
    {
      title: '2024 Estate Planning Changes: What You Need to Know',
      excerpt: 'Important updates to estate tax laws and planning strategies for the new year. Learn how recent legislative changes may affect your existing estate plan and what steps you should take to stay compliant.',
      date: 'December 15, 2024',
      category: 'Tax Planning',
      readTime: '5 min read',
      slug: '2024-estate-planning-changes',
      author: 'Sarah Mitchell',
      featured: true
    },
    {
      title: 'Protecting Your Digital Assets in Your Estate Plan',
      excerpt: 'How to include cryptocurrency, online accounts, and digital files in your estate plan. A comprehensive guide to ensuring your digital legacy is properly managed and transferred.',
      date: 'December 10, 2024',
      category: 'Estate Planning',
      readTime: '7 min read',
      slug: 'protecting-digital-assets',
      author: 'Michael Chen',
      featured: true
    },
    {
      title: 'Planning for Blended Families: Special Considerations',
      excerpt: 'Estate planning strategies for families with children from previous relationships. Navigate the complexities of providing for your current spouse while protecting your children\'s inheritance.',
      date: 'December 5, 2024',
      category: 'Family Planning',
      readTime: '6 min read',
      slug: 'blended-family-planning',
      author: 'Jennifer Rodriguez',
      featured: false
    },
    {
      title: 'Business Succession Planning: Ensuring Your Legacy Lives On',
      excerpt: 'Key strategies for transferring your business to the next generation or selling to partners. Learn about buy-sell agreements, valuation methods, and tax-efficient transfer strategies.',
      date: 'November 28, 2024',
      category: 'Business Planning',
      readTime: '8 min read',
      slug: 'business-succession-planning',
      author: 'David Thompson',
      featured: false
    },
    {
      title: 'The Gift Tax Annual Exclusion: Maximizing Your Giving',
      excerpt: 'Understanding how to use the annual gift tax exclusion effectively in your estate plan. Strategies for reducing your taxable estate while supporting loved ones during your lifetime.',
      date: 'November 20, 2024',
      category: 'Tax Planning',
      readTime: '5 min read',
      slug: 'gift-tax-annual-exclusion',
      author: 'Sarah Mitchell',
      featured: false
    },
    {
      title: 'Special Needs Trusts: Protecting Vulnerable Family Members',
      excerpt: 'How to provide for a family member with disabilities without jeopardizing their government benefits. A guide to first-party and third-party special needs trusts.',
      date: 'November 15, 2024',
      category: 'Family Planning',
      readTime: '9 min read',
      slug: 'special-needs-trusts',
      author: 'Jennifer Rodriguez',
      featured: false
    },
    {
      title: 'Key-Person Insurance in Estate Planning',
      excerpt: 'Protecting your business from the loss of critical team members. How to structure key-person life insurance policies and integrate them into your overall business plan.',
      date: 'November 8, 2024',
      category: 'Business Planning',
      readTime: '6 min read',
      slug: 'key-person-insurance',
      author: 'David Thompson',
      featured: false
    },
    {
      title: 'Understanding the Step-Up in Basis: A Powerful Planning Tool',
      excerpt: 'How the step-up in basis works and why it matters for your estate plan. Learn strategies to maximize this tax benefit for your heirs.',
      date: 'November 1, 2024',
      category: 'Tax Planning',
      readTime: '7 min read',
      slug: 'step-up-in-basis',
      author: 'Michael Chen',
      featured: false
    }
  ]

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !activeCategory || activeCategory === 'All' || post.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">
              Expert Insights
            </span>
            <h1 className="heading-xl mb-6">
              Estate Planning <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Stay informed with our latest articles on estate planning, tax strategies,
              family protection, and business succession planning from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category === 'All' ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    (category === 'All' && !activeCategory) || activeCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-padding">
          <div className="container-width">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-2">
                Featured <span className="text-gradient">Articles</span>
              </h2>
              <p className="text-neutral-600">Our most important and popular content</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  className="card card-hover bg-gradient-to-br from-primary-50 to-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge-primary">
                      {post.category}
                    </span>
                    <span className="text-neutral-500 text-sm">
                      {post.readTime}
                    </span>
                    <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded">
                      Featured
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-3 text-xl">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-semibold text-sm">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{post.author}</p>
                        <p className="text-xs text-neutral-500">{post.date}</p>
                      </div>
                    </div>
                    <Link
                      to={`/resources/blog/${post.slug}`}
                      className="text-primary-600 hover:text-primary-500 font-medium flex items-center gap-1"
                    >
                      Read Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className={`section-padding ${featuredPosts.length > 0 ? 'bg-neutral-50' : ''}`}>
        <div className="container-width">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-2">
              {activeCategory && activeCategory !== 'All' ? activeCategory : 'All'} <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-neutral-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  className="card card-hover"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge-primary">
                      {post.category}
                    </span>
                    <span className="text-neutral-500 text-sm">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-3 text-lg">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-xs">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-neutral-500 text-xs">
                        {post.date}
                      </span>
                    </div>
                    <Link
                      to={`/resources/blog/${post.slug}`}
                      className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-neutral-700 mb-2">No articles found</h3>
              <p className="text-neutral-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div
            className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8 lg:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-4">
              Stay Updated on Estate Planning
            </h2>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, tax law updates,
              and estate planning tips directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-width">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Estate Plan?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Our experienced estate planning specialists can help you create a comprehensive
              plan tailored to your unique situation. Schedule your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                Schedule a Consultation
              </Link>
              <Link to="/resources" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200">
                View All Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default BlogPage
