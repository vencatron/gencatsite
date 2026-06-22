// Service tier definitions. All copy must use approved verbs (coordinate,
// prepare, navigate, handle, analyze, educate, project-manage) — never
// "create," "draft," or "review" in a legal-document sense.

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceTier {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  bestFor: string
  included: string[]
  notIncluded: string[]
  process: { step: string; detail: string }[]
  faq: ServiceFaq[]
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    slug: 'family-conversation',
    name: 'Family Planning Conversation',
    shortName: 'Family Conversation',
    tagline: 'Get oriented before you engage anyone else.',
    description:
      'A 90-minute structured consultation that orients your family on the estate planning process, identifies the gaps in your current situation, and produces a personalized roadmap of the professionals you’ll need — so you walk into your attorney’s office prepared, organized, and ready to use their time well.',
    bestFor:
      'Families starting the estate planning process, or restarting one that stalled, who want clarity on what to do and who to engage before spending on legal fees.',
    included: [
      'A 90-minute structured conversation covering your family, assets, and goals',
      'A general orientation to the estate planning process and the professionals involved',
      'Identification of gaps in your current situation (based on what you tell us — no document review)',
      'A personalized roadmap of the professionals your situation calls for and the order to engage them',
      'A preparation checklist for your attorney meeting — the inventory, the people map, and the questions to ask',
      'A written follow-up summary of everything covered',
    ],
    notIncluded: [
      'Legal advice of any kind',
      'Review of legal documents',
      'Recommendations on specific trust structures or legal strategies',
      'Attorney services — we connect you with licensed attorneys; we are not one',
    ],
    process: [
      {
        step: 'Book and complete a short intake',
        detail:
          'You schedule the conversation and complete a brief questionnaire about your family and goals so the session starts at altitude, not from zero.',
      },
      {
        step: 'The 90-minute conversation',
        detail:
          'We walk through your situation together: what you own, who you’re responsible for, what you want to happen, and what the process generally involves.',
      },
      {
        step: 'Your roadmap and checklist',
        detail:
          'Within one week you receive a written summary, a professional roadmap, and an attorney-meeting preparation checklist tailored to your situation.',
      },
      {
        step: 'Optional next steps',
        detail:
          'If it’s useful, we connect you with attorneys from our network and discuss whether coordination or tax services make sense for the road ahead.',
      },
    ],
    faq: [
      {
        question: 'Is this legal advice?',
        answer:
          'No. We are CPAs and coordinators, not attorneys. This conversation educates and prepares you for the process; decisions about legal documents and structures belong with a licensed estate planning attorney.',
      },
      {
        question: 'Will you tell us whether we need a will or a trust?',
        answer:
          'No — that is a legal recommendation only an attorney should make. What we will do is make sure you understand the general framework, have your facts organized, and know the right questions to ask so your attorney can make that recommendation efficiently.',
      },
      {
        question: 'What if we already have an estate plan?',
        answer:
          'The conversation works the same way: we orient around your goals and what you tell us about your situation, and identify gaps to raise with your attorney — for example, funding that was never finished or beneficiary designations nobody has checked in years.',
      },
    ],
  },
  {
    slug: 'trust-funding',
    name: 'Trust Funding & Implementation',
    shortName: 'Funding & Implementation',
    tagline: 'Your attorney designed the plan. We make sure it gets connected to your assets.',
    description:
      'After your attorney delivers your documents, we project-manage the step most plans never finish: funding. We coordinate the retitling of accounts and real estate, the assignment of business interests, and the beneficiary updates across every institution — tracked to completion, with proof.',
    bestFor:
      'Families who have signed estate planning documents with their attorney and want the retitling and implementation work driven to completion rather than left as homework.',
    included: [
      'A complete asset inventory reconciled against your attorney’s funding instructions',
      'Project management of asset retitling and beneficiary updates across every institution',
      'Coordination with financial institutions, transfer agents, and the county recorder',
      'Coordination with your attorney where deeds or legal documents are required (prepared by them, not us)',
      'A document inventory and storage system, so the family can find everything later',
      'Trustee education materials — a plain-language orientation for the people you’ve named',
      'A final reconciliation report: every asset funded, aligned, or deliberately excluded with a documented reason',
    ],
    notIncluded: [
      'Drafting deeds or any legal documents — deeds are prepared by your attorney or a qualified provider',
      'Signing legal documents on your behalf',
      'Opinions on the validity or sufficiency of your documents',
      'Legal advice — questions about what your documents mean go to your attorney',
    ],
    process: [
      {
        step: 'Kickoff and inventory',
        detail:
          'We assemble the full asset picture — accounts, properties, business interests, policies — and map it against the funding plan from your attorney.',
      },
      {
        step: 'Execution',
        detail:
          'We prepare institution paperwork for your signature, coordinate with your attorney on items requiring legal documents, submit, follow up, and escalate until each item completes.',
      },
      {
        step: 'Verification',
        detail:
          'We collect the proof — recorded deeds, retitled statements, confirmed designations — rather than assuming requests went through.',
      },
      {
        step: 'Handoff',
        detail:
          'You receive the reconciliation report, the organized document system, and trustee education materials. Nothing is left in a drawer half-done.',
      },
    ],
    faq: [
      {
        question: 'Doesn’t the attorney handle funding?',
        answer:
          'Engagements vary. Some attorneys retitle real estate and provide instruction letters; many deliver documents with instructions and leave execution to the family. We pick up wherever your attorney’s engagement ends, and we coordinate with them on anything that requires legal work.',
      },
      {
        question: 'Our trust was signed years ago. Is it too late?',
        answer:
          'Funding can be completed at any time while the trust creator is living and able. Older plans often have the most to gain — accounts opened since signing are usually outside the trust entirely.',
      },
      {
        question: 'What about retirement accounts?',
        answer:
          'Retirement accounts are generally coordinated through beneficiary designations rather than retitling, and the right designation depends on your attorney’s design and tax considerations. We make sure the question gets asked and the answer gets implemented — we don’t decide it unilaterally.',
      },
    ],
  },
  {
    slug: 'tax-administration',
    name: 'Ongoing Tax & Administration',
    shortName: 'Tax & Administration',
    tagline: 'The annual tax discipline that keeps an estate plan working.',
    description:
      'Standard CPA services built around estate plans: fiduciary and gift tax compliance, basis tracking, beneficiary K-1s, and an annual check-in that keeps the tax side of your plan current as laws, assets, and family circumstances change.',
    bestFor:
      'Trustees, families with established plans, and heirs administering a trust or estate who need the recurring tax work handled by someone who understands the whole picture.',
    included: [
      'Annual fiduciary income tax compliance for trusts and estates (Form 1041; Form 706 when required)',
      'Gift tax returns (Form 709) for reportable gifts',
      'Basis tracking for trust and inherited assets',
      'K-1 preparation for beneficiaries',
      'An annual tax check-in built around your estate plan — what changed, what it affects, what to raise with your attorney',
      'Charitable strategy modeling — projecting the tax effects of giving approaches under consideration',
    ],
    notIncluded: [
      'Legal advice or document amendments — plan changes are flagged for your attorney, not made by us',
      'Fiduciary services — we support your trustee; we do not serve as trustee',
      'Investment management or financial product sales',
    ],
    process: [
      {
        step: 'Onboarding',
        detail:
          'We assemble the tax picture of your trust or estate: prior returns, the governing documents’ tax-relevant terms, asset basis records, and open items.',
      },
      {
        step: 'Annual compliance cycle',
        detail:
          'Returns prepared and filed on a planned calendar — fiduciary returns, gift returns, beneficiary K-1s — with estimates and elections handled deliberately rather than at deadline.',
      },
      {
        step: 'The annual check-in',
        detail:
          'Once a year we step back from the forms: what changed in the law, the assets, and the family — and which of those changes belongs on your attorney’s desk.',
      },
    ],
    faq: [
      {
        question: 'Can you work with our existing CPA?',
        answer:
          'Yes. Some families keep their personal returns with a long-standing preparer and engage us only for the trust and estate work; we coordinate so nothing falls between the two.',
      },
      {
        question: 'We just inherited through a trust. Where do we start?',
        answer:
          'Trust administration after a death has its own sequence — notices, valuations, elections, and first returns. We handle the tax workstream and coordinate with the attorney advising your trustee. Our Learn article on the first 90 days of trust administration is a useful general orientation.',
      },
    ],
  },
  {
    slug: 'strategic',
    name: 'Strategic Engagement',
    shortName: 'Strategic',
    tagline: 'Full-spectrum coordination for business owners and complex estates.',
    description:
      'A comprehensive engagement for business owners and high-net-worth families: multi-year tax projections, gifting strategy, business succession coordination, and facilitation across your full professional team — attorney, financial advisor, and insurance professionals — with one party accountable for the whole.',
    bestFor:
      'Business owners and families with significant or complex estates whose planning involves multiple professionals, multiple entities, and decisions measured in years — not a single document signing.',
    included: [
      'Comprehensive estate and income tax projections across multi-year scenarios',
      'Multi-year gifting strategy modeling — annual exclusions, lifetime exemption use, timing, and cash-flow effects',
      'Business succession coordination — financial modeling and project management of the transition your advisors design together',
      'Valuation discount analysis (modeling, not formal opinions of value)',
      'Family meeting facilitation — structured conversations that prepare heirs and surface issues while they’re still solvable',
      'Full coordination with your attorney, financial advisor, and insurance professionals — agendas, follow-through, and a single accountable point of contact',
    ],
    notIncluded: [
      'Legal opinions or legal advice',
      'Document drafting — every legal instrument in the plan is designed and prepared by your attorney',
      'Fiduciary services — we do not serve as trustee or executor',
      'Formal business valuations for tax filing purposes — performed by credentialed appraisers we help you engage',
    ],
    process: [
      {
        step: 'Discovery and baseline',
        detail:
          'A deep assembly of the full picture: entities, assets, basis, existing documents (catalogued, not legally reviewed), family structure, and goals.',
      },
      {
        step: 'Projection and strategy',
        detail:
          'We model the scenarios — estate tax exposure, gifting paths, succession structures, liquidity — and put real numbers in front of you and your advisors.',
      },
      {
        step: 'Coordinated implementation',
        detail:
          'Your attorney designs and prepares the legal instruments; we project-manage the broader implementation: funding, retitling, valuations, insurance, and the calendar of who does what by when.',
      },
      {
        step: 'Ongoing stewardship',
        detail:
          'Annual projections refreshed, gifting executed on schedule, family meetings facilitated, and the professional team convened when laws or circumstances change.',
      },
    ],
    faq: [
      {
        question: 'We already have an attorney, advisor, and CPA. What do you add?',
        answer:
          'Usually the missing element isn’t expertise — it’s coordination. Each professional sees their slice; engagements end; follow-through has no owner. We take accountability for the whole: the projections that connect the slices, and the project management that turns advice into completed work.',
      },
      {
        question: 'How does pricing work at this tier?',
        answer:
          'By scope. After an initial conversation we propose a fixed engagement covering the first year’s workplan, with ongoing stewardship priced annually. Engagements typically begin at $10,000 and scale with entity count and complexity.',
      },
      {
        question: 'Does this replace our estate planning attorney?',
        answer:
          'Never. Every legal instrument in the plan is designed and prepared by your attorney — if anything, this engagement gives your attorney better inputs and ensures their design actually gets implemented.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceTier | undefined {
  return SERVICE_TIERS.find((s) => s.slug === slug)
}
