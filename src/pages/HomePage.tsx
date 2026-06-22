import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '@/components/sections/HeroCentered'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

/* ─── "The Problem Nobody Coordinates" section ───────────────────── */
const ProblemSection = () => {
  return (
    <section className="section-dark py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="max-w-3xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-accent-400 mb-4">
            The problem nobody coordinates
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-5">
            Most estate plans don&rsquo;t fail on paper. They fail in execution.
          </h2>
          <p className="text-lg text-primary-200 leading-relaxed">
            You worked with an attorney, signed the documents, and filed them away.
            But who told you to fund the trust? Who helped you understand the tax
            implications? Who connected the dots between your will, your IRA
            beneficiaries, and your kids&rsquo; 529s? Generation Catalyst does.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {[
            {
              stat: '70%',
              body: 'of family wealth transfers fail — assets lost or family harmony broken — according to a widely cited 20-year study of 3,250 families by Roy Williams and Vic Preisser.',
            },
            {
              stat: '<3%',
              body: 'of those failures were traced to professional error or bad documents. The real culprits: unfunded trusts, unprepared heirs, and follow-through that was nobody\'s job.',
            },
            {
              stat: 'After',
              body: 'signing day is when most of the work actually happens — retitling, beneficiary alignment, tax elections, and administration. Most families never get tax planning around their estate plan at all.',
            },
          ].map(({ stat, body }, i) => (
            <motion.div
              key={stat}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              viewport={{ once: true }}
            >
              <p className="stat-number mb-4">{stat}</p>
              <p className="text-primary-200 text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Article link */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/learn/why-most-trusts-fail"
            className="text-accent-300 hover:text-accent-200 text-sm font-medium transition-colors duration-150 inline-flex items-center gap-1.5"
          >
            Read: Why most trusts fail when families need them most
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ProblemSection />
      <Services />
      <About />
      <Contact />
    </motion.div>
  )
}

export default HomePage
