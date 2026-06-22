import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="min-h-screen font-sans">

      {/* ── Hero ── */}
      <section className="w-full bg-gradient-to-br from-primary-50 to-neutral-50 border-b border-primary-100">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-4">
            About Generation Catalyst
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight max-w-3xl mb-6">
            The coordinator's seat at the estate planning table
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Generation Catalyst LLC is an education and coordination practice founded by a
            California-licensed CPA, based in Pomona and serving LA County, the San Gabriel
            Valley, and remote clients nationwide.
          </p>
        </motion.div>
      </section>

      {/* ── Body: 2-col prose + sidebar ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left: article prose */}
          <motion.article
            className="lg:col-span-2 space-y-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
                The path here
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  The founder's background runs through Big Four audit, corporate accounting,
                  interim controller work, and fractional CFO engagements with business owners
                  through Generation Catalyst LLC.
                </p>
                <p>
                  In CFO conversations, the same question surfaced repeatedly: <em>"What happens
                  to all of this when something happens to me?"</em> Every time it did, it exposed
                  the same gap — the attorney drafts documents, the financial advisor manages the
                  portfolio, the CPA files returns. But the work connecting them — funding the
                  trust, aligning beneficiary designations, projecting taxes, preparing heirs —
                  belonged to nobody.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
                Why this practice exists
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Generation Catalyst exists to own that gap — educating families, analyzing the
                  tax side with CPA rigor, coordinating the professional team, and
                  project-managing implementation until the work is verifiably done.
                </p>
                <p>
                  The result is not a binder on a shelf. It is a funded, current,
                  sensibly-taxed plan understood by the people it protects.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Right: credentials + scope cards */}
          <motion.aside
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Credentials card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-primary-900 mb-5">
                Credentials
              </h3>
              <ul className="space-y-3">
                {[
                  'Licensed CPA — State of California (active)',
                  'Big Four accounting firm alumni — audit practice',
                  'Corporate accounting and interim controller experience',
                  'Fractional CFO to business owners through Generation Catalyst LLC',
                  'Member, CalCPA and AICPA',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scope card — dark */}
            <div className="rounded-2xl bg-primary-900 border border-primary-800 p-6">
              <h3 className="font-serif text-lg font-semibold text-accent-200 mb-4">
                Our scope, plainly
              </h3>
              <p className="text-primary-100 text-sm leading-relaxed">
                As a CPA, I provide tax, financial, and coordination services. I do not draft
                legal documents or provide legal advice — for that, you need a licensed estate
                planning attorney. I work alongside attorneys to make sure your full estate plan,
                including the tax and implementation side, actually works.
              </p>
            </div>
          </motion.aside>

        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="w-full bg-neutral-100 border-y border-neutral-200 py-16 sm:py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-900 mb-10">
            How we work
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: 'Education before engagement',
                body:
                  'Families should understand the process before paying anyone. The Learn hub is free, general, and honest — because an informed client makes better decisions.',
              },
              {
                title: 'Stay in our lane, deeply',
                body:
                  'Tax, analysis, funding, and coordination are our lane. Legal advice and drafting belong to a licensed attorney. We are clear about where one ends and the other begins.',
              },
              {
                title: 'Follow-through is the product',
                body:
                  'Advice without implementation is decoration. Every engagement ends with completed, documented work — not a binder handed over and forgotten.',
              },
              {
                title: 'A team, coordinated',
                body:
                  'Attorneys, advisors, insurance professionals, and CPAs each see a slice of the picture. Someone must be accountable for the whole. That is the seat Generation Catalyst takes.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm"
              >
                <h3 className="font-serif text-xl font-semibold text-primary-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-neutral-700 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-700 px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              See how the services are structured
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="w-full bg-primary-900 py-16 sm:py-20">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Start with a conversation
          </h2>
          <p className="text-primary-200 text-lg mb-8 leading-relaxed">
            The Family Planning Conversation is how every relationship here begins: 90 minutes,
            a clear roadmap, and no obligation beyond it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-lg border border-primary-400 px-6 py-3 text-sm font-semibold text-primary-100 hover:bg-primary-800 transition-colors"
            >
              How it works
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary-700 hover:bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              Book a Family Planning Conversation
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}

export default AboutPage
