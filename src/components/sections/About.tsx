import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="section-neutral py-20 lg:py-24" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">

          {/* ── Left 2/3: bio copy ── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow mb-3">About the founder</p>

            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
              A CPA&rsquo;s view of estate planning
            </h2>

            <p className="text-neutral-700 text-lg leading-relaxed mb-5">
              Generation Catalyst was founded by a California-licensed CPA whose career
              runs from Big Four auditing through corporate accounting to fractional CFO
              work for business owners. That path leads to one observation, over and
              over: estate plans rarely fail because of the documents — they fail because
              nobody owns the tax strategy, the funding, and the follow-through.
            </p>

            <p className="text-neutral-600 leading-relaxed mb-8">
              We don&rsquo;t draft documents and we don&rsquo;t give legal advice —
              licensed attorneys do that, and we work alongside them. We bring the
              coordinator&rsquo;s seat to the table.
            </p>

            <Link to="/about" className="btn-outline inline-block">
              Our story
            </Link>
          </motion.div>

          {/* ── Right 1/3: pull-quote card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-7">
              {/* Opening quote mark */}
              <div className="font-serif text-5xl text-primary-200 leading-none mb-2" aria-hidden="true">
                &ldquo;
              </div>
              <blockquote className="font-serif text-lg italic text-primary-900 leading-relaxed mb-5">
                The attorney builds the vehicle. We keep it fueled, registered, and
                maintained — and the family decides where it&rsquo;s going.
              </blockquote>
              <footer className="text-sm text-neutral-500 not-italic">
                — CPA, Founder of Generation Catalyst
              </footer>
            </div>

            {/* Subtle stat badge below the card */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white rounded-xl border border-neutral-200 px-5 py-4">
                <span className="font-serif text-2xl font-bold text-primary-800">CA</span>
                <span className="text-sm text-neutral-600">Licensed CPA, California</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl border border-neutral-200 px-5 py-4">
                <span className="font-serif text-2xl font-bold text-accent-600">Big 4</span>
                <span className="text-sm text-neutral-600">Auditing background</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
