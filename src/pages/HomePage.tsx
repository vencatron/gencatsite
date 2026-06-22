import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '@/components/common/Seo'
import ArticleCard from '@/components/common/ArticleCard'
import EmailCapture from '@/components/common/EmailCapture'
import { getFeaturedArticles } from '@/data/articles'
import { SERVICE_TIERS } from '@/data/services'

// ─── Flywheel Diagram ─────────────────────────────────────────────────────────
// 4-piece donut ring: each segment = one service tier.
// Segments draw in with pathLength 0→1, then a gold pulse orbits the ring.

const CX = 280
const CY = 280
const ARC_R = 128       // arc center-line radius
const STROKE = 52       // stroke width  →  inner edge ≈ 102, outer edge ≈ 154
const CIRC = 2 * Math.PI * ARC_R

// pre-compute pulse dash values
const PULSE_ARC = CIRC * 15 / 360     // 15° arc length ≈ 33.5 px
const PULSE_GAP = CIRC - PULSE_ARC    // remaining circumference ≈ 770.7 px
const PULSE_OFF = -(CIRC * 270 / 360) // dashoffset → places pulse at top (-90°)

/** Return the SVG arc path for one flywheel segment at ARC_R. */
function arcPath(startDeg: number, endDeg: number): string {
  const r = (d: number) => d * (Math.PI / 180)
  const sx = CX + ARC_R * Math.cos(r(startDeg))
  const sy = CY + ARC_R * Math.sin(r(startDeg))
  const ex = CX + ARC_R * Math.cos(r(endDeg))
  const ey = CY + ARC_R * Math.sin(r(endDeg))
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${ARC_R} ${ARC_R} 0 ${large} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`
}

/** Return [x, y] of a point at (radius r, angle deg) from (CX, CY). */
function ptAt(r: number, deg: number): [number, number] {
  const rad = deg * (Math.PI / 180)
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

// 4 × 80° segments with 10° gaps — start at top (−90°, 12 o'clock)
const SEGS = [
  { start: -90, end:  -10, mid:  -50, label: 'Family Planning', sub: 'Conversation',       color: '#2d513c' },
  { start:   0, end:   80, mid:   40, label: 'Trust Funding',   sub: '& Implementation',   color: '#4a8264' },
  { start:  90, end:  170, mid:  130, label: 'Tax & Admin',     sub: 'Ongoing compliance',  color: '#3a6b50' },
  { start: 180, end:  260, mid:  220, label: 'Strategic',       sub: 'Engagement',          color: '#162a1f' },
]

// Gap midpoints between segments (in degrees)
const GAP_DEGS = [-5, 85, 175, 265]

const FlywheelDiagram = () => (
  <svg
    viewBox="0 0 560 560"
    className="w-full h-auto max-w-[480px]"
    aria-label="Generation Catalyst flywheel: four estate planning service tiers cycling continuously"
  >
    <defs>
      <radialGradient id="fw-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#c2d9c8" stopOpacity={0.22} />
        <stop offset="100%" stopColor="#f2f7f3" stopOpacity={0}    />
      </radialGradient>
      <filter id="fw-shadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx={0} dy={5} stdDeviation={12} floodColor="#162a1f" floodOpacity={0.18} />
      </filter>
    </defs>

    {/* Soft background glow centred on the ring */}
    <circle cx={CX} cy={CY} r={220} fill="url(#fw-glow)" />

    {/* Track ring — thin guide so gaps read cleanly before segments load */}
    <circle
      cx={CX} cy={CY} r={ARC_R}
      fill="none"
      stroke="#e0ece2"
      strokeWidth={STROKE + 6}
    />

    {/* ── 4 flywheel segments — staggered pathLength draw-in ── */}
    {SEGS.map((seg, i) => (
      <motion.path
        key={seg.start}
        d={arcPath(seg.start, seg.end)}
        fill="none"
        stroke={seg.color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.0, delay: 0.3 + i * 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
          opacity:    { duration: 0.3, delay: 0.3 + i * 0.22 },
        }}
      />
    ))}

    {/* ── Orbiting gold pulse — short arc that rotates continuously ── */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2.0 }}
      style={{ transformOrigin: `${CX}px ${CY}px` }}
    >
      <circle
        cx={CX} cy={CY} r={ARC_R}
        fill="none"
        stroke="#d4bc55"
        strokeWidth={STROKE + 8}
        strokeDasharray={`${PULSE_ARC.toFixed(1)} ${PULSE_GAP.toFixed(1)}`}
        strokeDashoffset={PULSE_OFF}
        strokeLinecap="round"
        opacity={0.52}
      />
    </motion.g>

    {/* ── Directional chevrons at each gap — show clockwise flow ── */}
    {GAP_DEGS.map((gapDeg) => {
      const [gx, gy] = ptAt(ARC_R + 28, gapDeg)
      // clockwise tangent at angle α is (α + 90°)
      const tangent = gapDeg + 90
      return (
        // Outer <g> positions; inner motion.path animates
        <g key={gapDeg} transform={`translate(${gx.toFixed(1)},${gy.toFixed(1)}) rotate(${tangent})`}>
          <motion.path
            d="M -5 -4.5 L 1 0 L -5 4.5"
            fill="none"
            stroke="#6da085"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />
        </g>
      )
    })}

    {/* ── Centre GC node — spring-scales in first ── */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
      style={{ transformOrigin: `${CX}px ${CY}px` }}
    >
      <circle cx={CX} cy={CY} r={84} fill="#1f3629" filter="url(#fw-shadow)" />
      <circle cx={CX} cy={CY} r={75} fill="none" stroke="#3a6b50" strokeWidth={0.8} />
      {/* Slow-spinning dashed accent ring */}
      <motion.circle
        cx={CX} cy={CY} r={80}
        fill="none" stroke="#d4bc55" strokeWidth={1.2} strokeDasharray="4 9"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      <text
        x={CX} y={CY - 7}
        textAnchor="middle"
        fill="white"
        fontSize={25}
        fontFamily="Lora, Georgia, serif"
        fontWeight={600}
      >
        GC
      </text>
      <text
        x={CX} y={CY + 15}
        textAnchor="middle"
        fill="#6da085"
        fontSize={7.5}
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
      >
        COORDINATOR
      </text>
    </motion.g>

    {/* ── Outer labels with connector lines ── */}
    {SEGS.map((seg, i) => {
      // Connector: from just outside arc outer edge → toward label
      const LINE_A_R = ARC_R + STROKE / 2 + 10   // connector start (beyond outer edge)
      const LINE_B_R = ARC_R + STROKE / 2 + 54   // connector end (near label)
      const LABEL_R  = ARC_R + STROKE / 2 + 67   // label anchor

      const [ax, ay] = ptAt(LINE_A_R, seg.mid)
      const [bx, by] = ptAt(LINE_B_R, seg.mid)
      const [lx, ly] = ptAt(LABEL_R,  seg.mid)

      // i=0 (top-right) and i=1 (bottom-right) → anchor start
      // i=2 (bottom-left) and i=3 (top-left)   → anchor end
      const anchor = i < 2 ? 'start' : 'end'

      return (
        <motion.g
          key={`lbl-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.22, duration: 0.5 }}
        >
          {/* Connector line */}
          <line
            x1={ax.toFixed(1)} y1={ay.toFixed(1)}
            x2={bx.toFixed(1)} y2={by.toFixed(1)}
            stroke="#9bbfaa"
            strokeWidth={1}
            opacity={0.65}
          />
          {/* Dot at connector end */}
          <circle cx={bx} cy={by} r={2.5} fill={seg.color} opacity={0.85} />
          {/* Label */}
          <text
            x={lx.toFixed(1)}
            y={(ly - 5).toFixed(1)}
            textAnchor={anchor}
            fill="#1f3629"
            fontSize={11.5}
            fontFamily="Inter, sans-serif"
            fontWeight={600}
          >
            {seg.label}
          </text>
          <text
            x={lx.toFixed(1)}
            y={(ly + 9).toFixed(1)}
            textAnchor={anchor}
            fill="#665d57"
            fontSize={9}
            fontFamily="Inter, sans-serif"
          >
            {seg.sub}
          </text>
        </motion.g>
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
                Your family's legacy is held in trust by every decision you make.
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

            {/* Right — flywheel diagram */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <FlywheelDiagram />
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
              Most estate plans don't fail on paper. They fail in practice.
            </h2>
            <p className="text-neutral-200 text-lg leading-relaxed">
              Most families don't lose generational wealth because they didn't have an estate
              plan — they lose it because nobody coordinated the tax strategy, funding, and
              administration that makes the plan actually work. We're the coordinators.
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
                culprits: unfunded trusts, unprepared heirs, and follow-through that was nobody's job.
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
              <h2 className="heading-md mb-5">A CPA's view of estate planning</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Generation Catalyst was founded by a California-licensed CPA whose career runs from
                Big Four auditing through corporate accounting to fractional CFO work for business
                owners. That path leads to one observation, over and over: estate plans rarely fail
                because of the documents — they fail because nobody owns the tax strategy, the
                funding, and the follow-through.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-6">
                We don't draft documents and we don't give legal advice — licensed attorneys do
                that, and we work alongside them. We bring the coordinator's seat to the table.
              </p>
              <Link to="/about" className="btn-outline">
                Our story
              </Link>
            </div>
            <div className="card bg-white">
              <p className="font-serif text-lg text-primary-900 italic leading-relaxed mb-4">
                "The attorney builds the vehicle. We keep it fueled, registered, and maintained —
                and the family decides where it's going."
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
