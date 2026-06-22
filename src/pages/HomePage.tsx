import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '@/components/common/Seo'
import ArticleCard from '@/components/common/ArticleCard'
import EmailCapture from '@/components/common/EmailCapture'
import { getFeaturedArticles } from '@/data/articles'
import { SERVICE_TIERS } from '@/data/services'

// ─── Coordination Diagram ──────────────────────────────────────────────────────

interface DiagramNode {
  id: string
  label: string
  sublabel: string
  cx: number
  cy: number
  delay: number
  floatDuration: number
  floatDelay: number
}

const DIAGRAM_NODES: DiagramNode[] = [
  { id: 'family',   label: 'Your Family',   sublabel: 'Goals & beneficiaries', cx: 240, cy: 62,  delay: 0.40, floatDuration: 3.6, floatDelay: 0.0 },
  { id: 'attorney', label: 'Attorney',       sublabel: 'Legal documents',       cx: 418, cy: 148, delay: 0.55, floatDuration: 4.2, floatDelay: 0.8 },
  { id: 'funding',  label: 'Trust Funding', sublabel: 'Asset retitling',        cx: 380, cy: 348, delay: 0.70, floatDuration: 3.2, floatDelay: 1.6 },
  { id: 'admin',    label: 'Tax & Admin',   sublabel: 'Compliance & filing',    cx: 72,  cy: 302, delay: 0.85, floatDuration: 4.8, floatDelay: 2.4 },
]

const GC_CX = 240
const GC_CY = 205

const CoordinationDiagram = () => (
  <svg viewBox="0 0 480 420" className="w-full h-auto max-w-md" aria-hidden="true">
    <defs>
      <filter id="gc-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx={0} dy={4} stdDeviation={8} floodColor="#162a1f" floodOpacity={0.15} />
      </filter>
      <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx={0} dy={3} stdDeviation={5} floodColor="#162a1f" floodOpacity={0.10} />
      </filter>
      <radialGradient id="hero-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c2d9c8" stopOpacity={0.3} />
        <stop offset="100%" stopColor="#f2f7f3" stopOpacity={0} />
      </radialGradient>
    </defs>

    {/* Background glow */}
    <circle cx={GC_CX} cy={GC_CY} r={220} fill="url(#hero-bg)" />

    {/* Connection lines */}
    {DIAGRAM_NODES.map((n) => (
      <motion.path
        key={`line-${n.id}`}
        d={`M ${GC_CX} ${GC_CY} L ${n.cx} ${n.cy}`}
        stroke="#9bbfaa"
        strokeWidth={1.5}
        strokeDasharray="6 5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.0, delay: n.delay - 0.15, ease: 'easeOut' }}
      />
    ))}

    {/* Center GC node */}
    <g transform={`translate(${GC_CX}, ${GC_CY})`}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        <motion.circle
          cx={0} cy={0} r={68}
          fill="none" stroke="#d4bc55" strokeWidth={1.5} strokeDasharray="4 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <circle cx={0} cy={0} r={56} fill="#1f3629" filter="url(#gc-shadow)" />
        <circle cx={0} cy={0} r={49} fill="none" stroke="#3a6b50" strokeWidth={0.75} />
        <text x={0} y={-6} textAnchor="middle" fill="white" fontSize={22} fontFamily="Lora, Georgia, serif" fontWeight={600}>GC</text>
        <text x={0} y={14} textAnchor="middle" fill="#6da085" fontSize={7} fontFamily="Inter, sans-serif" letterSpacing={2}>COORDINATOR</text>
      </motion.g>
    </g>

    {/* Peripheral nodes */}
    {DIAGRAM_NODES.map((n) => {
      const dx = GC_CX - n.cx
      const dy = GC_CY - n.cy
      const len = Math.sqrt(dx * dx + dy * dy)
      const dotLX = (dx / len) * 44
      const dotLY = (dy / len) * 44
      return (
        <g key={n.id} transform={`translate(${n.cx}, ${n.cy})`}>
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: n.delay, ease: [0.175, 0.885, 0.32, 1.275] }}
          >
            <motion.g
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: n.floatDuration, repeat: Infinity, ease: 'easeInOut', delay: n.floatDelay }}
            >
              <circle cx={0} cy={0} r={42} fill="white" stroke="#c2d9c8" strokeWidth={1.5} filter="url(#node-shadow)" />
              <circle cx={0} cy={0} r={37} fill="none" stroke="#e0ece2" strokeWidth={0.75} />
              <text x={0} y={-5} textAnchor="middle" fill="#162a1f" fontSize={10} fontFamily="Inter, sans-serif" fontWeight={600}>{n.label}</text>
              <text x={0} y={10} textAnchor="middle" fill="#7c716a" fontSize={8} fontFamily="Inter, sans-serif">{n.sublabel}</text>
            </motion.g>
          </motion.g>
          <motion.circle
            cx={dotLX} cy={dotLY} r={3.5} fill="#4a8264"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: n.delay + 0.3 }}
          />
        </g>
      )
    })}
  </svg>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const HomePage = () => {
  const featured = getFeaturedArticles(3)

  return (
    <div>
      <Seo
        title="Generation Catalyst | Estate Planning Education & Coordination for California Families"
        description="Generation Catalyst helps California families coordinate their estate planning — connecting you with the right professionals and handling the tax, funding, and administration most plans get wrong."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-neutral-50 to-neutral-50">
        <div className="container-width section-padding lg:py-24">
          <div className="grid lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow mb-5">Education · Tax · Coordination</p>
              <h1 className="heading-xl mb-6">
                Your family’s legacy is held in trust by every decision you make.
              </h1>
              <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed mb-9">
                Generation Catalyst helps California families coordinate their estate planning —
                connecting you with the right professionals and handling the tax, funding, and
                administration most plans get wrong.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/learn" className="btn-primary text-base px-8">
                  Start Learning
                </Link>
                <Link to="/contact" className="btn-outline text-base px-8">
                  Book a Family Planning Conversation
                </Link>
              </div>
            </motion.div>

            {/* Right — coordination diagram */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <CoordinationDiagram />
            </motion.div>

          </div>
        </div>
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-100/60 blur-3xl"
          aria-hidden="true"
        />
      </section>

      {/* The Problem (wedge) */}
      <section className="bg-primary-950 text-white">
        <div className="container-width section-padding">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow !text-accent-400 mb-4">The problem nobody coordinates</p>
            <h2 className="heading-lg text-white mb-5">
              Most estate plans don’t fail on paper. They fail in practice.
            </h2>
            <p className="text-neutral-200 text-lg leading-relaxed">
              Most families don’t lose generational wealth because they didn’t have an estate
              plan — they lose it because nobody coordinated the tax strategy, funding, and
              administration that makes the plan actually work. We’re the coordinators.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-primary-900 border border-primary-800 p-8">
              <p className="font-serif text-5xl font-semibold text-accent-400 mb-3">70%</p>
              <p className="text-neutral-200 leading-relaxed text-sm">
                of family wealth transfers fail — assets lost or family harmony broken — according
                to a widely cited 20-year study of 3,250 families by Roy Williams and Vic Preisser.
              </p>
            </div>
            <div className="rounded-xl bg-primary-900 border border-primary-800 p-8">
              <p className="font-serif text-5xl font-semibold text-accent-400 mb-3">&lt;3%</p>
              <p className="text-neutral-200 leading-relaxed text-sm">
                of those failures were traced to professional error or bad documents. The real
                culprits: unfunded trusts, unprepared heirs, and follow-through that was nobody’s job.
              </p>
            </div>
            <div className="rounded-xl bg-primary-900 border border-primary-800 p-8">
              <p className="font-serif text-5xl font-semibold text-accent-400 mb-3">After</p>
              <p className="text-neutral-200 leading-relaxed text-sm">
                signing day is when most of the work actually happens — retitling, beneficiary
                alignment, tax elections, and administration. Most families never get tax planning
                around their estate plan at all.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              to="/learn/why-most-trusts-fail"
              className="text-accent-300 hover:text-accent-200 font-medium text-sm"
            >
              Read: Why most trusts fail when families need them most →
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="heading-lg mb-5">Four ways we help families navigate estate planning</h2>
            <p className="text-neutral-700 text-lg leading-relaxed">
              We educate, analyze, coordinate, and project-manage. Your attorney handles the legal
              documents and legal advice — we make sure everything around them actually works.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICE_TIERS.map((tier) => (
              <div key={tier.slug} className="card card-hover flex flex-col">
                <div className="mb-3">
                  <h3 className="font-serif text-xl font-semibold text-primary-900">{tier.name}</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mb-5 flex-1">{tier.tagline}</p>
                <Link
                  to={`/services/${tier.slug}`}
                  className="text-sm font-medium text-primary-700 hover:text-primary-800"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the founder */}
      <section className="bg-neutral-100">
        <div className="container-width section-padding">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2">
              <p className="eyebrow mb-4">About the founder</p>
              <h2 className="heading-md mb-5">A CPA’s view of estate planning</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Generation Catalyst was founded by a California-licensed CPA whose career runs from
                Big Four auditing through corporate accounting to fractional CFO work for business
                owners. That path leads to one observation, over and over: estate plans rarely fail
                because of the documents — they fail because nobody owns the tax strategy, the
                funding, and the follow-through.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-6">
                We don’t draft documents and we don’t give legal advice — licensed attorneys do
                that, and we work alongside them. We bring the coordinator’s seat to the table.
              </p>
              <Link to="/about" className="btn-outline">
                Our story
              </Link>
            </div>
            <div className="card bg-white">
              <p className="font-serif text-lg text-primary-900 italic leading-relaxed mb-4">
                “The attorney builds the vehicle. We keep it fueled, registered, and maintained —
                and the family decides where it’s going.”
              </p>
              <p className="text-sm text-neutral-600">CPA, Founder of Generation Catalyst</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest from Learn */}
      <section className="section-padding">
        <div className="container-width">
          <div className="flex items-end justify-between mb-10 gap-6">
            <div>
              <p className="eyebrow mb-4">From the Learn hub</p>
              <h2 className="heading-md">Understand the process before you pay for it</h2>
            </div>
            <Link
              to="/learn"
              className="hidden sm:inline-block text-sm font-medium text-primary-700 hover:text-primary-800 whitespace-nowrap"
            >
              Browse all articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="sm:hidden mt-8 text-center">
            <Link to="/learn" className="btn-outline">
              Browse all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="pb-16 lg:pb-24">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <EmailCapture
              source="home-checklist"
              heading="The Family Estate Planning Readiness Checklist"
              description="A free, plain-language checklist that walks your family through getting organized — the inventory, the people, and the questions — before you meet with any professional."
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
    </div>
  )
}

export default HomePage
