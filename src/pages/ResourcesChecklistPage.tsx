import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ChecklistItem {
  id: string
  text: string
  note?: string
}

interface ChecklistGroup {
  phase: string
  label: string
  description: string
  items: ChecklistItem[]
}

const checklistGroups: ChecklistGroup[] = [
  {
    phase: '01',
    label: 'Core Documents',
    description: 'The foundational legal documents every estate plan should include.',
    items: [
      { id: 'doc-1', text: 'Revocable Living Trust drafted and signed' },
      { id: 'doc-2', text: 'Pour-Over Will drafted and signed' },
      { id: 'doc-3', text: 'Durable Power of Attorney for finances executed' },
      { id: 'doc-4', text: 'Advance Healthcare Directive (AHCD) completed', note: 'Also called a healthcare proxy or living will' },
      { id: 'doc-5', text: 'HIPAA Authorization signed for key family members' },
      { id: 'doc-6', text: 'Personal Property Memorandum completed (if applicable)' },
      { id: 'doc-7', text: 'All documents stored in a known, accessible location' },
      { id: 'doc-8', text: 'Copies provided to successor trustee and healthcare agent' },
    ],
  },
  {
    phase: '02',
    label: 'Trust Funding',
    description: 'A trust only protects what is inside it. Funding is where most plans break down.',
    items: [
      { id: 'fund-1', text: 'Real property deed re-titled to the trust', note: 'Requires a new deed recorded with the county' },
      { id: 'fund-2', text: 'Checking and savings accounts re-titled or TOD designated' },
      { id: 'fund-3', text: 'Investment / brokerage accounts re-titled to the trust' },
      { id: 'fund-4', text: 'Business interests transferred (LLC membership, stock certificates)' },
      { id: 'fund-5', text: 'Vehicles: beneficiary designation or TOD title filed (CA-specific)' },
      { id: 'fund-6', text: 'Safe deposit box updated to trust ownership or authorized agent added' },
      { id: 'fund-7', text: 'Schedule of assets attached to trust document and kept current' },
    ],
  },
  {
    phase: '03',
    label: 'Beneficiary Designations',
    description: 'These override whatever your trust or will says. Review them every few years.',
    items: [
      { id: 'ben-1', text: 'Life insurance policies: primary and contingent beneficiaries reviewed' },
      { id: 'ben-2', text: '401(k) / 403(b): primary and contingent beneficiaries reviewed' },
      { id: 'ben-3', text: 'IRA accounts: beneficiaries reviewed and aligned with plan' },
      { id: 'ben-4', text: 'Pension plans: survivorship election and beneficiaries confirmed' },
      { id: 'ben-5', text: 'Annuities: beneficiaries reviewed' },
      { id: 'ben-6', text: 'HSA / FSA accounts: beneficiaries designated' },
      { id: 'ben-7', text: 'No minor children named directly as beneficiaries without a trust backstop' },
      { id: 'ben-8', text: 'No estate named as beneficiary on retirement accounts (probate trap)' },
    ],
  },
  {
    phase: '04',
    label: 'Tax Planning',
    description: 'Coordination between your estate plan and tax strategy to avoid unnecessary loss.',
    items: [
      { id: 'tax-1', text: 'Federal estate tax exposure estimated (2026 sunset considerations)' },
      { id: 'tax-2', text: 'Annual gifting strategy established ($18,000 per person per year in 2024)' },
      { id: 'tax-3', text: 'Stepped-up basis strategy reviewed for appreciated assets' },
      { id: 'tax-4', text: 'Roth conversion strategy considered for IRA accounts' },
      { id: 'tax-5', text: 'Charitable giving vehicles evaluated (donor-advised fund, CRT, direct gifts)' },
      { id: 'tax-6', text: 'Community property documentation up to date (California)' },
      { id: 'tax-7', text: 'Business valuation completed or scheduled (if applicable)' },
      { id: 'tax-8', text: 'Irrevocable trust strategies reviewed if estate is over $7M' },
    ],
  },
  {
    phase: '05',
    label: 'Periodic Review',
    description: 'Estate plans require maintenance. These triggers should prompt a review.',
    items: [
      { id: 'rev-1', text: 'Plan reviewed within the last 3–5 years' },
      { id: 'rev-2', text: 'Marriage or divorce since last review: documents updated' },
      { id: 'rev-3', text: 'Birth or adoption of children/grandchildren: guardians and shares updated' },
      { id: 'rev-4', text: 'Death of a named beneficiary, trustee, or executor: successors confirmed' },
      { id: 'rev-5', text: 'Significant change in assets (purchase, sale, inheritance): funding reviewed' },
      { id: 'rev-6', text: 'Relocation to a new state: documents reviewed for state-specific requirements' },
      { id: 'rev-7', text: 'Major tax law change: strategy reviewed with CPA or estate attorney' },
      { id: 'rev-8', text: 'Family Meeting Discussion Guide used to brief heirs on the plan' },
    ],
  },
]

const ResourcesChecklistPage = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const totalItems = checklistGroups.reduce((sum, g) => sum + g.items.length, 0)
  const completedItems = Object.values(checked).filter(Boolean).length
  const pct = Math.round((completedItems / totalItems) * 100)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white border-b border-primary-100 py-20">
        <div className="container-width">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/resources"
              className="text-sm text-primary-600 hover:text-primary-500 inline-flex items-center gap-1 mb-6"
            >
              &larr; All Resources
            </Link>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4 block">
              Free Download
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-900 leading-tight mb-6">
              Estate Planning Readiness Checklist
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
              A comprehensive checklist organized by phase — from core documents to periodic review.
              Use it to find gaps in an existing plan or to build a new one from scratch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-white border-b border-neutral-200 py-6 print:hidden">
        <div className="container-width">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-48">
              <div className="flex justify-between text-sm text-neutral-600 mb-1.5">
                <span>{completedItems} of {totalItems} items checked</span>
                <span className="font-semibold text-primary-700">{pct}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-sm font-medium text-primary-700 border border-primary-300 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Checklist
            </button>
            <button
              onClick={() => setChecked({})}
              className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Checklist Groups */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width max-w-3xl">
          <div className="space-y-10">
            {checklistGroups.map((group, groupIndex) => (
              <motion.div
                key={group.phase}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.07 }}
                viewport={{ once: true }}
              >
                {/* Group Header */}
                <div className="bg-primary-900 px-8 py-5 flex items-start gap-4">
                  <span className="text-primary-400 font-mono text-sm font-semibold mt-0.5 flex-shrink-0">
                    {group.phase}
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-white">
                      {group.label}
                    </h2>
                    <p className="text-primary-300 text-sm mt-1">{group.description}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-neutral-100">
                  {group.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-4 px-8 py-4 cursor-pointer hover:bg-neutral-50 transition-colors duration-150"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={!!checked[item.id]}
                          onChange={() => toggle(item.id)}
                          className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-sm leading-relaxed ${
                            checked[item.id]
                              ? 'line-through text-neutral-400'
                              : 'text-neutral-800'
                          }`}
                        >
                          {item.text}
                        </span>
                        {item.note && (
                          <p className="text-xs text-neutral-500 mt-0.5 italic">{item.note}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-neutral-50 border-t border-neutral-200">
        <div className="container-width max-w-3xl">
          <p className="text-xs text-neutral-500 leading-relaxed">
            This checklist is provided for educational purposes only. Generation Catalyst LLC is not a law firm
            and does not provide legal advice. The items listed may not apply to every situation. Consult a
            licensed estate planning attorney for guidance specific to your circumstances.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-900 py-16 print:hidden">
        <div className="container-width">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl font-bold text-white mb-3">
                Found gaps in your plan?
              </h2>
              <p className="text-primary-200 leading-relaxed">
                A Family Planning Conversation is the fastest way to close them. We will walk through
                your situation, identify what is missing, and map out the professionals you need.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/resources/partners"
                className="border-2 border-white text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white hover:text-primary-900 transition-colors duration-200 text-center"
              >
                View Partner Network
              </Link>
              <Link
                to="/schedule"
                className="bg-accent-500 hover:bg-accent-400 text-primary-950 font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 text-center"
              >
                Book a Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ResourcesChecklistPage
