import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'

/* ─── Types ─────────────────────────────────────────────────────────── */

interface ArticleMeta {
  slug: string
  category: string
  categorySlug: string
  readTime: string
  title: string
  description: string
  date: string
}

/* ─── Article metadata registry ─────────────────────────────────────── */

const articleMeta: Record<string, ArticleMeta> = {
  '8-documents-complete-estate-plan': {
    slug: '8-documents-complete-estate-plan',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '9 min read',
    title: 'The 8 documents in a complete estate plan',
    description:
      'A plain-language taxonomy of the documents most estate plans include — what each one generally does, and why the set matters more than any single piece.',
    date: 'March 15, 2026',
  },
  'role-of-cpa-estate-planning': {
    slug: 'role-of-cpa-estate-planning',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '7 min read',
    title: 'The role of a CPA in estate planning',
    description:
      "Estate planning is a team sport. What the CPA's lane actually covers — projections, basis, gifting analysis, fiduciary returns — and how it complements the attorney's.",
    date: 'March 22, 2026',
  },
  'questions-before-hiring-estate-attorney': {
    slug: 'questions-before-hiring-estate-attorney',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '8 min read',
    title: 'Questions to ask before you hire an estate planning attorney',
    description:
      'A preparation guide: how families generally evaluate estate planning attorneys, what to ask in the first meeting, and what to bring so the engagement is efficient.',
    date: 'April 1, 2026',
  },
  'when-self-service-estate-planning-makes-sense': {
    slug: 'when-self-service-estate-planning-makes-sense',
    category: 'Basics',
    categorySlug: 'basics',
    readTime: '8 min read',
    title: "When self-service estate planning makes sense (and when it doesn't)",
    description:
      'An honest general framework for online estate planning platforms: situations where they tend to fit, signals that a family needs an attorney, and the gaps to plan for.',
    date: 'May 11, 2026',
  },
  'wills-vs-trusts-framework': {
    slug: 'wills-vs-trusts-framework',
    category: 'Wills vs. Trusts',
    categorySlug: 'wills-vs-trusts',
    readTime: '8 min read',
    title: 'Wills vs. trusts: a framework for thinking about the choice',
    description:
      'A general framework for understanding how wills and trusts differ — probate, incapacity, privacy, cost, and complexity — without telling you which to pick.',
    date: 'March 29, 2026',
  },
  'why-most-trusts-fail': {
    slug: 'why-most-trusts-fail',
    category: 'Funding & Administration',
    categorySlug: 'funding',
    readTime: '8 min read',
    title: 'Why most trusts fail when families need them most',
    description:
      'Wealth transfers fail far more often from poor funding, communication, and coordination than from bad documents. A look at the gap nobody talks about.',
    date: 'April 6, 2026',
  },
  'what-is-trust-funding': {
    slug: 'what-is-trust-funding',
    category: 'Funding & Administration',
    categorySlug: 'funding',
    readTime: '8 min read',
    title: 'What is trust funding and why nobody talks about it',
    description:
      'The most consequential step in estate planning is the one most families skip. A plain-language explanation of what trust funding is and why it matters.',
    date: 'April 13, 2026',
  },
  'trust-administration-first-90-days': {
    slug: 'trust-administration-first-90-days',
    category: 'Funding & Administration',
    categorySlug: 'funding',
    readTime: '9 min read',
    title: "Trust administration after a death: a family's first 90 days",
    description:
      'What actually happens after a trustmaker dies. A step-by-step look at the immediate tasks, who handles them, and what to watch out for.',
    date: 'April 20, 2026',
  },
  'california-community-property': {
    slug: 'california-community-property',
    category: 'California',
    categorySlug: 'california',
    readTime: '8 min read',
    title: 'California community property and your estate plan',
    description:
      "How California's community property system interacts with estate planning generally — characterization, the double basis step-up, and why titling matters.",
    date: 'April 27, 2026',
  },
  'prop-19-california': {
    slug: 'prop-19-california',
    category: 'California',
    categorySlug: 'california',
    readTime: '8 min read',
    title: 'Prop 19 and what it changed for California families',
    description:
      'A general explainer of Proposition 19: how it narrowed the parent-child property tax exclusion and expanded base-year transfers for homeowners 55 and over.',
    date: 'May 4, 2026',
  },
}

/* ─── Article content ────────────────────────────────────────────────── */

const ArticleContent8Documents = () => (
  <div className="article-body">
    <p>
      Ask someone what an estate plan contains and most can name a will. A few will
      mention a trust. Almost nobody can name all eight documents that a complete
      plan typically includes — and that gap in understanding is one reason so many
      plans underperform when families actually need them.
    </p>
    <p>
      This article walks through the eight documents in plain language: what each
      one does, why it exists, and how it fits with the others. Nothing here
      constitutes legal advice, and the exact documents your plan requires depend on
      your state, family, and assets. But the framework is useful for anyone trying
      to understand what they are building toward.
    </p>

    <h2>1. Revocable Living Trust</h2>
    <p>
      A revocable living trust is a legal arrangement in which you transfer ownership
      of assets to the trust — which you typically serve as trustee of during your
      lifetime. Because the trust owns the assets rather than you personally, those
      assets can pass to your beneficiaries at death without going through probate.
    </p>
    <p>
      "Revocable" means you can change or cancel the trust at any time while you
      are alive and have legal capacity. Many people also name themselves as their
      own trustee, retaining full day-to-day control. A successor trustee — usually
      a spouse, adult child, or professional — steps in if you become incapacitated
      or die.
    </p>
    <p>
      The trust is the hub of a modern estate plan. Everything else either feeds
      into it or coordinates with it.
    </p>

    <h2>2. Pour-Over Will</h2>
    <p>
      A pour-over will is a short will that says: any assets I own at death that are
      not already in my trust should pour over into my trust through probate. It
      is the safety net for assets you forgot to retitle, acquired late in life, or
      that simply cannot be held inside a trust while you are alive (like some
      retirement accounts).
    </p>
    <p>
      Because pour-over wills go through probate, the goal is to keep them empty —
      meaning all your significant assets are already inside the trust. The
      pour-over will is a backstop, not the primary vehicle.
    </p>
    <p>
      Pour-over wills also carry one function no trust can perform: naming a
      guardian for minor children. If you have children under 18, this provision
      belongs here.
    </p>

    <h2>3. Durable Power of Attorney for Finances</h2>
    <p>
      A durable power of attorney (DPOA) authorizes a person you designate — called
      your agent or attorney-in-fact — to manage your financial affairs. "Durable"
      means the document remains valid even if you become mentally incapacitated.
      An ordinary power of attorney would terminate at that moment, which is
      precisely when you need it most.
    </p>
    <p>
      Your agent under a DPOA can pay bills, manage investments, file tax returns,
      and handle transactions that fall outside your trust. This is particularly
      important for retirement accounts, which cannot be titled in a trust — someone
      needs authority to manage them if you cannot.
    </p>

    <h2>4. Advance Healthcare Directive</h2>
    <p>
      An advance healthcare directive (also called a living will, healthcare proxy,
      or directive to physicians depending on the state) communicates your medical
      preferences and designates a healthcare agent to make decisions on your
      behalf.
    </p>
    <p>
      It typically addresses two distinct things: (1) who has authority to make
      decisions, and (2) what those decisions should reflect — your preferences
      about resuscitation, mechanical ventilation, artificial nutrition, and similar
      end-of-life interventions. Some states use a single combined document; others
      use two separate forms.
    </p>

    <h2>5. HIPAA Authorization</h2>
    <p>
      The Health Insurance Portability and Accountability Act restricts who can
      access your medical information. Without a signed HIPAA authorization, your
      healthcare agent may not be able to communicate with your doctors, obtain
      records, or make fully informed decisions.
    </p>
    <p>
      HIPAA authorizations are often attached to or bundled with advance directives
      but are sometimes overlooked as a standalone document. Their absence can
      create real friction.
    </p>

    <h2>6. Certificate of Trust</h2>
    <p>
      When you present your trust to a bank, title company, or brokerage, they will
      need to verify its existence and your authority as trustee — but they do not
      need (and often will not review) the full trust document, which may contain
      private instructions about your beneficiaries and distribution terms.
    </p>
    <p>
      A certificate of trust is a short summary document that confirms the trust
      exists, identifies the trustee, and certifies the trustee's authority. It lets
      you prove what institutions need to know without exposing the full trust.
    </p>

    <h2>7. Assignment of Personal Property</h2>
    <p>
      Not everything you own has a title document — furniture, art, jewelry,
      collectibles, and household goods typically do not. An assignment of personal
      property is a written statement that transfers these tangible items into your
      trust. Without it, personal property may need to go through the pour-over
      will and then probate.
    </p>
    <p>
      Some trusts include a schedule or memorandum that allows you to update
      specific bequests without amending the full trust document — useful if you
      want certain items to go to certain people.
    </p>

    <h2>8. Beneficiary Designations (Not a Document You Sign Once)</h2>
    <p>
      This last item is less a single document and more a category of ongoing
      elections: the beneficiary designations on your retirement accounts, life
      insurance policies, annuities, and payable-on-death bank accounts.
    </p>
    <p>
      These designations pass assets directly to named beneficiaries regardless of
      what your will or trust says. That means they need to be coordinated with your
      overall plan — not set and forgotten. Outdated beneficiary designations (an
      ex-spouse still named, a predeceased parent, or no contingent beneficiary) are
      a persistent source of unintended outcomes.
    </p>

    <h2>Why the set matters more than any single piece</h2>
    <p>
      An estate plan that has a trust but no pour-over will leaves gaps. A plan with
      excellent documents but unfunded trusts and misaligned beneficiary designations
      will not work as intended. The eight documents described here are not
      independent — they are a system, and that system only works when all its pieces
      are present and coordinated.
    </p>
    <p>
      Understanding the full set helps you have a more productive conversation with
      the attorney you hire to draft them.
    </p>
  </div>
)

const ArticleContentCpaRole = () => (
  <div className="article-body">
    <p>
      Most families understand that estate planning requires an attorney. Fewer
      understand that it almost always requires a CPA as well — not to draft
      documents, but to handle a distinct and equally consequential set of tasks
      that attorneys are not typically trained to perform.
    </p>
    <p>
      The confusion is understandable. Law firms sometimes offer "comprehensive"
      estate planning, and CPA firms sometimes employ estate planning specialists.
      But the two disciplines have genuinely different lanes, and confusing them
      tends to leave things undone.
    </p>

    <h2>What the attorney does</h2>
    <p>
      The estate planning attorney drafts legal documents: the trust, will, power
      of attorney, and healthcare directive. They advise on structure — whether a
      revocable trust is appropriate, whether an irrevocable trust serves a purpose,
      how to hold title. They ensure documents are validly executed under state law.
      They are the licensed professional responsible for the legal architecture of
      the plan.
    </p>
    <p>
      What most estate planning attorneys do not do: detailed income tax projections,
      basis analysis, retirement account withdrawal planning, annual fiduciary tax
      returns, or gift tax compliance. Some do — but it is not the core of the
      engagement.
    </p>

    <h2>What the CPA does</h2>
    <p>
      The CPA's role in estate planning spans several distinct workstreams.
    </p>

    <h3>Pre-plan projections and basis analysis</h3>
    <p>
      Before an estate plan is drafted, a CPA can model the tax consequences of
      different structures. Which assets have low basis and high embedded gains?
      What is the likely estate tax exposure? How will retirement accounts be
      distributed and taxed? These projections inform the attorney's structural
      recommendations and often change them.
    </p>
    <p>
      Basis analysis is particularly important for highly appreciated assets.
      The decision about whether to hold an asset until death (and receive a
      stepped-up basis for heirs) or transfer it during life involves trade-offs
      that are fundamentally quantitative — which is the CPA's domain.
    </p>

    <h3>Gifting strategy and annual exclusion planning</h3>
    <p>
      The annual gift tax exclusion (currently $18,000 per recipient per year in
      2024) allows families to transfer wealth without using lifetime exemption.
      A CPA can model whether systematic gifting reduces estate taxes, help
      structure gifts properly, and file Form 709 (the gift tax return) when
      lifetime gifts are made.
    </p>

    <h3>Trust and estate income tax returns</h3>
    <p>
      Once a trust becomes irrevocable — either because it was created that way
      or because the trustmaker has died — it becomes a separate tax entity and
      must file Form 1041 each year. The CPA prepares these returns, distributes
      income to beneficiaries in a tax-efficient way, and handles the K-1s that
      beneficiaries receive.
    </p>
    <p>
      This is a recurring engagement, not a one-time event. Families who hire an
      attorney but not a CPA often discover this gap when the first Form 1041
      deadline arrives.
    </p>

    <h3>Estate tax return (Form 706)</h3>
    <p>
      For estates above the federal exemption threshold, a Form 706 estate tax
      return must be filed within nine months of death (with a six-month extension
      available). This return values the gross estate, claims applicable deductions
      and credits, and calculates tax owed.
    </p>
    <p>
      Even below the taxable threshold, many CPAs recommend filing a 706 to make a
      "portability" election — allowing a surviving spouse to use any unused
      exemption of the deceased spouse. The election is only available by timely
      filing, and missing it is permanent.
    </p>

    <h3>Coordination with retirement accounts</h3>
    <p>
      IRAs and 401(k)s are among the most tax-sensitive assets in an estate.
      Required minimum distributions, inherited IRA rules, the 10-year rule for
      non-spouse beneficiaries, and the question of whether a trust should be named
      as beneficiary all have significant tax implications that require a CPA's
      input, not just legal drafting.
    </p>

    <h2>How the two roles fit together</h2>
    <p>
      Attorney and CPA should be talking to each other. In practice, they often are
      not — especially when a family hires them separately through different referral
      channels. The resulting gaps (basis not considered, portability election
      missed, gifting strategy never modeled) are not anyone's fault per se, but
      they are the family's problem.
    </p>
    <p>
      A coordinator who works with both professionals — organizing information,
      flagging cross-disciplinary issues, and ensuring follow-through — is one way
      families bridge this gap. The attorney and CPA each do their own work well;
      the coordinator makes sure the handoffs happen.
    </p>
  </div>
)

const ArticleContentQuestionsForAttorney = () => (
  <div className="article-body">
    <p>
      The first meeting with an estate planning attorney is not a deposition — you
      will not be graded on what you know walking in. But the more prepared you are,
      the more efficient the engagement will be, and the better questions you ask,
      the more useful the conversation becomes.
    </p>
    <p>
      This guide covers how families generally evaluate estate planning attorneys,
      what to bring to a first meeting, and which questions tend to produce the most
      useful information.
    </p>

    <h2>Before you schedule: how to evaluate an estate planning attorney</h2>
    <p>
      Estate planning is a specialty. A general practice attorney who occasionally
      drafts wills is not the same as someone who focuses exclusively on trusts,
      estates, and the related tax work. When you are evaluating candidates:
    </p>
    <ul>
      <li>
        <strong>Confirm the specialty.</strong> Look for attorneys who identify
        estate planning as their primary practice area, not one of several. Board
        certification in estate planning and trust law (where your state offers it)
        is a meaningful signal.
      </li>
      <li>
        <strong>Ask about their typical client.</strong> An attorney who primarily
        handles high-net-worth clients with estate tax exposure may not be the best
        fit if your estate is straightforward. Conversely, someone who mostly does
        simple wills may not be equipped for complex trust or business succession
        planning.
      </li>
      <li>
        <strong>Understand the fee structure.</strong> Some attorneys bill hourly;
        others charge flat fees for defined document packages. Neither is inherently
        better, but you should understand what you are committing to before the
        engagement starts.
      </li>
      <li>
        <strong>Check for referrals from professionals you already trust.</strong> A
        referral from your CPA, financial advisor, or a trusted friend who has been
        through the process tends to be more reliable than a directory listing.
      </li>
    </ul>

    <h2>What to bring to the first meeting</h2>
    <p>
      You do not need to arrive with everything perfectly organized. But having
      basic information in hand saves time and helps the attorney give you more
      useful recommendations:
    </p>
    <ul>
      <li>
        <strong>Asset inventory.</strong> A rough list of what you own — real
        estate (with approximate value and how title is held), bank and investment
        accounts, retirement accounts, life insurance policies, business interests,
        and other significant assets.
      </li>
      <li>
        <strong>Family structure.</strong> Spouse or partner, children, stepchildren,
        anyone with special needs, aging parents you may be responsible for. Any
        previous marriages or existing obligations from prior relationships.
      </li>
      <li>
        <strong>Existing documents.</strong> If you have any prior wills, trusts, or
        powers of attorney — even old ones you know need updating — bring them.
      </li>
      <li>
        <strong>Thoughts on key decisions.</strong> Who would you want as guardian
        for your children? Who do you trust to serve as trustee or executor? Are
        there specific assets you want to go to specific people?
      </li>
    </ul>

    <h2>Questions worth asking in the first meeting</h2>

    <h3>About their process</h3>
    <ul>
      <li>What does your estate planning engagement typically include?</li>
      <li>Do you handle trust funding, or is that the client's responsibility?</li>
      <li>How do you coordinate with our CPA or financial advisor?</li>
      <li>What does ongoing review look like — do you offer a plan review service?</li>
    </ul>

    <h3>About the plan itself</h3>
    <ul>
      <li>Given what I've described, do you recommend a will-based plan or a trust-based plan, and why?</li>
      <li>Are there estate or gift tax considerations I should be aware of?</li>
      <li>How should I title my assets and update my beneficiary designations?</li>
      <li>Are there California-specific issues — community property, Prop 19 — I should be thinking about?</li>
    </ul>

    <h3>About fees and timeline</h3>
    <ul>
      <li>What is included in the quoted fee, and what would trigger additional charges?</li>
      <li>What is the typical timeline from engagement to signed documents?</li>
      <li>What do you need from me to stay on schedule?</li>
    </ul>

    <h2>One question to ask yourself</h2>
    <p>
      After the first meeting, ask yourself whether the attorney explained things
      clearly without condescension, listened to what matters to you, and made you
      feel like your situation — not a template — was the starting point.
    </p>
    <p>
      The best estate planning attorneys are educators as much as they are drafters.
      If you left the first meeting more confused than when you arrived, that is
      information.
    </p>
  </div>
)

const ArticleContentSelfService = () => (
  <div className="article-body">
    <p>
      Online estate planning platforms — LegalZoom, Trust & Will, Fabric, and
      their competitors — have improved substantially in the past decade. For some
      families, they are a genuinely appropriate starting point. For others, they
      create a false sense of security that can be more dangerous than having
      nothing at all.
    </p>
    <p>
      This article offers a framework for thinking through the decision honestly,
      without advocating for or against any particular platform.
    </p>

    <h2>What online platforms actually provide</h2>
    <p>
      Most online estate planning services provide templated legal documents:
      wills, basic revocable trusts, powers of attorney, and healthcare directives.
      They walk you through a questionnaire, populate your answers into a template,
      and produce a PDF that you print, sign, and have witnessed (or notarized)
      according to your state's requirements.
    </p>
    <p>
      What they do not provide: legal advice, personalized analysis of your
      situation, tax planning, trust funding assistance, or ongoing coordination.
      The document is the product. What happens before and after — the analysis and
      the follow-through — is left to the user.
    </p>

    <h2>When self-service tends to fit</h2>
    <p>
      Online platforms generally work well when the situation is straightforward:
    </p>
    <ul>
      <li>
        <strong>Young adults without dependents.</strong> A simple will naming a
        beneficiary for personal property, a durable power of attorney, and a
        healthcare directive cover most of what a young adult without children or
        significant assets needs.
      </li>
      <li>
        <strong>Modest estates with simple family structures.</strong> A married
        couple with a house, savings accounts, and children from the same
        relationship — and no business interests, blended family complications, or
        significant taxable estate — can often accomplish the basics online.
      </li>
      <li>
        <strong>A bridge while waiting to engage an attorney.</strong> Having basic
        documents now is better than having nothing. If you're in the process of
        selecting an attorney but it will be several months before you engage, a
        simple online will addresses the most acute gap.
      </li>
      <li>
        <strong>Lower-cost states with streamlined probate.</strong> In states where
        probate is inexpensive and fast (not California), a simple will may be
        entirely adequate even for homeowners.
      </li>
    </ul>

    <h2>Signals that you probably need an attorney</h2>
    <ul>
      <li>
        <strong>You own real property in California.</strong> California's probate
        process is notoriously expensive and slow. The statutory fee structure
        (attorney and executor each receive roughly 4% of the first $100,000 of
        gross estate value, declining on a sliding scale) means a $1.5 million home
        could generate $35,000+ in combined fees. A properly funded revocable trust
        avoids this entirely. An online will does not.
      </li>
      <li>
        <strong>You have a blended family.</strong> Ensuring a current spouse is
        protected while preserving assets for children from a prior relationship
        requires carefully structured trusts — QTIP trusts, separate trusts, or
        other mechanisms that templates cannot handle.
      </li>
      <li>
        <strong>You have a business interest.</strong> Succession planning for a
        business requires coordination between the estate plan, the buy-sell
        agreement, key person insurance, and often the business's governing
        documents. There is no template for this.
      </li>
      <li>
        <strong>Your estate may be taxable.</strong> The federal estate tax exemption
        is over $13 million per person in 2024, but it is scheduled to sunset after
        2025. If your estate is in a range where tax planning matters, the documents
        should reflect strategies drafted by someone who understands them.
      </li>
      <li>
        <strong>You have a beneficiary with special needs.</strong> An inheritance
        to a person receiving SSI or Medicaid can inadvertently disqualify them from
        those benefits. A special needs trust, drafted by an attorney, preserves both
        the inheritance and the government benefits.
      </li>
      <li>
        <strong>There is any family conflict or complexity.</strong> Contested
        estates — unhappy relatives, unusual distribution plans, disinheritance —
        are more likely to be challenged if the documents were produced without
        professional guidance.
      </li>
    </ul>

    <h2>The gaps to plan for either way</h2>
    <p>
      Whether you use an online platform or hire an attorney, two things often fall
      through the cracks: trust funding and beneficiary designation review.
    </p>
    <p>
      An online trust that is never funded provides no probate avoidance — it is a
      document, not a plan. And beneficiary designations on retirement accounts and
      life insurance, which override whatever your will or trust says, require
      separate attention that no estate planning service (online or professional)
      handles automatically.
    </p>
    <p>
      If you use a self-service platform, build in time immediately after signing to
      retitle assets into the trust and review every beneficiary designation you
      have on file.
    </p>
  </div>
)

const ArticleContentWillsVsTrusts = () => (
  <div className="article-body">
    <p>
      "Should I have a will or a trust?" is one of the most commonly asked questions
      in estate planning — and one of the least useful ones, because responsible
      advisors can't answer it without knowing considerably more about the person
      asking.
    </p>
    <p>
      This article does not tell you which to choose. What it offers instead is a
      framework for understanding how wills and trusts differ, so that when you sit
      down with an attorney, you can have a more productive conversation.
    </p>

    <h2>What each one is</h2>
    <p>
      A <strong>will</strong> is a legal document that takes effect at death and
      directs how your assets should be distributed. It must go through probate —
      a court-supervised process where the will is validated, debts are paid, and
      assets are transferred to beneficiaries. Probate is public: the will and the
      inventory of assets become part of the court record.
    </p>
    <p>
      A <strong>revocable living trust</strong> is a legal arrangement created
      during your lifetime. You transfer ownership of assets to the trust (while
      typically serving as your own trustee), and name a successor trustee to take
      over if you die or become incapacitated. Because the trust — not you
      personally — owns the assets, they pass to your beneficiaries without going
      through probate. Trust administration is private.
    </p>

    <h2>The five dimensions families typically weigh</h2>

    <h3>1. Probate exposure</h3>
    <p>
      In California, probate for an estate with a house is often unavoidable if the
      estate exceeds $184,500 (the current threshold). Probate takes one to two
      years under normal circumstances, is filed in the public court record, and
      triggers statutory fees: each of the attorney and the executor collect roughly
      4% of the first $100,000 of gross estate value, 3% of the next $100,000, and
      declining percentages thereafter — calculated on gross value, not equity.
    </p>
    <p>
      A properly funded revocable trust avoids probate entirely. A will does not
      avoid probate — it governs the probate process.
    </p>

    <h3>2. Incapacity planning</h3>
    <p>
      A will is inert during your lifetime. It does nothing to help if you become
      incapacitated. A trust, if properly funded, allows your successor trustee to
      manage your assets immediately without court involvement — no conservatorship,
      no delay.
    </p>
    <p>
      A durable power of attorney can fill some of this gap for will-based plans,
      but powers of attorney are sometimes rejected by financial institutions, and
      they do not offer the same seamless continuity that a funded trust provides.
    </p>

    <h3>3. Privacy</h3>
    <p>
      Probate is public. Anyone can look up your estate's inventory, the
      distribution plan, and who received what. Trust administration is private —
      the trustee operates outside the court system, and the trust document need
      not be disclosed publicly.
    </p>

    <h3>4. Control over distributions</h3>
    <p>
      Trusts can hold assets and distribute them over time, under conditions, or in
      stages. A trust can direct that a beneficiary receives income but not
      principal until age 30, or that assets are held for a special needs
      beneficiary without disqualifying them from government benefits.
    </p>
    <p>
      A simple will distributes assets outright at death, with limited ability to
      add conditions — though a testamentary trust created by a will can accomplish
      some of the same things (but still goes through probate first).
    </p>

    <h3>5. Cost and maintenance</h3>
    <p>
      A revocable living trust costs more to create than a simple will. An attorney
      who charges $500 for a basic will might charge $2,000 to $5,000 or more for
      a complete trust package. And trusts require ongoing funding discipline: every
      time you acquire a new asset, open a new account, or change your situation,
      you need to consider whether it belongs in the trust.
    </p>
    <p>
      Over time, a properly funded trust typically saves money by avoiding probate.
      But that savings is only realized if the trust is actually funded — the most
      common failure mode for trust-based plans.
    </p>

    <h2>How to use this framework</h2>
    <p>
      The choice between a will and a trust is a conversation to have with an
      attorney who knows your state's laws, your family's situation, and your
      assets. What this framework gives you is the vocabulary and the considerations
      to bring to that conversation — so you can ask "what would probate cost on an
      estate like mine?" or "how does incapacity planning work in a will-only
      scenario?" rather than starting from scratch.
    </p>
    <p>
      Most people who work with an estate planning attorney in California end up
      with a trust-based plan. But most is not all, and the right answer depends on
      the specifics of your situation.
    </p>
  </div>
)

const ArticleContentWhyTrustsFail = () => (
  <div className="article-body">
    <p>
      There is a recurring pattern that anyone who works in estate planning
      eventually witnesses. A family pays for a well-drafted trust, signs it, takes
      the binder home, and tucks it away. Years later — sometimes decades — when the
      trust is actually needed, it does not work the way anyone expected. Assets go
      to probate. Heirs are confused. The plan that was meant to protect the family
      becomes a source of conflict and expense.
    </p>
    <p>
      Why does this happen? A 20-year study of 3,250 families by researchers Roy
      Williams and Vic Preisser found that roughly 70% of wealth transfers failed —
      meaning assets did not go where intended or family harmony was lost. Fewer than
      3% of those failures were attributed to professional errors like bad documents
      or flawed tax planning. The overwhelming majority traced to breakdowns in
      communication, unprepared heirs, and the absence of follow-through after
      signing.
    </p>

    <h2>The document is not the plan</h2>
    <p>
      A trust is a set of instructions that only matters if it is connected to the
      assets it is meant to govern. A revocable living trust controls only assets
      that have been formally transferred into it — a process called funding. A house
      never retitled, a brokerage account never moved, a business interest never
      assigned — these fall outside the trust no matter how well the instructions
      inside it are written.
    </p>
    <p>
      This is "the funding gap" — the single most common mechanical reason trusts
      underperform. Signing day feels like the finish line. The attorney's
      engagement often ends when documents are delivered. Retitling involves
      tedious paperwork with banks, brokerages, county recorders, and transfer
      agents — and nobody is explicitly responsible for making sure it gets done.
    </p>

    <h2>The three failure modes</h2>
    <p>
      When professionals discuss estate plan failures, they tend to cluster into
      three categories:
    </p>
    <ul>
      <li>
        <strong>Mechanical failures:</strong> Assets never funded into the trust,
        beneficiary designations never updated, old documents never coordinated with
        new ones. The plan exists on paper but is not connected to the family's
        actual property.
      </li>
      <li>
        <strong>Tax failures:</strong> Estate plan created in a vacuum, without tax
        projections, basis planning, or coordination with income tax — so
        opportunities were missed and avoidable costs incurred.
      </li>
      <li>
        <strong>Human failures:</strong> Heirs never told what the plan was or why.
        Trustees named but never prepared. When the moment came, confusion and
        mistrust did the damage the documents were meant to prevent.
      </li>
    </ul>
    <p>
      None of these are drafting problems — they are coordination problems. Each
      one lives in the space between professionals: after the attorney finishes,
      outside the financial advisor's mandate, beyond the scope of a once-a-year
      tax return.
    </p>

    <h2>What coordination looks like</h2>
    <p>
      Families whose plans hold up treat estate planning as an ongoing process with
      several workstreams, not a one-time legal purchase. The work involves:
    </p>
    <ol>
      <li>Working with a licensed attorney to design and draft the legal documents.</li>
      <li>
        Systematically funding the trust — retitling real estate, moving accounts,
        assigning business interests, and updating beneficiary designations to match
        the plan.
      </li>
      <li>
        Coordinating the tax side — projections, basis tracking, gifting strategy,
        and the returns that trusts and estates require.
      </li>
      <li>
        Preparing the people — making sure trustees, agents, and heirs understand
        their roles before they need to perform them.
      </li>
      <li>
        Reviewing the plan periodically, because laws change, assets change, and
        families change.
      </li>
    </ol>
    <p>
      Every item after the first is where most plans quietly fall apart — exactly
      the territory where a coordinator, often working alongside the family's
      attorney and financial advisor, earns their keep.
    </p>
    <p>
      The takeaway is not that documents don't matter. They matter enormously and are
      the attorney's domain. The takeaway is that a signed document is the beginning
      of an estate plan, not the end of one. Families who understand that
      distinction — and assign someone the job of follow-through — are the ones whose
      plans actually work when it counts.
    </p>
  </div>
)

const ArticleContentTrustFunding = () => (
  <div className="article-body">
    <p>
      Trust funding is the process of transferring ownership of your assets into
      your trust. It is the most consequential step in estate planning, and it is
      the step most families never fully complete.
    </p>
    <p>
      A trust that has not been funded is a set of instructions with nothing to
      govern. The attorney's work — the carefully drafted distribution provisions,
      the successor trustee succession plan, the spendthrift protections — applies
      only to assets the trust actually owns. An unfunded trust cannot avoid probate,
      cannot provide for incapacity management of your assets, and cannot do any of
      the things you paid to have designed.
    </p>

    <h2>Why nobody talks about it</h2>
    <p>
      Part of the answer is structural. Estate planning attorneys are in the business
      of drafting documents. When documents are signed and delivered, the engagement
      is typically complete. What happens next — the retitling of assets, the change
      of account ownership, the recording of new deeds — is tedious administrative
      work that falls outside the attorney's scope and billing structure.
    </p>
    <p>
      Financial advisors are sometimes helpful here, but their incentives are aligned
      toward managing investments, not toward the administrative work of retitling.
    </p>
    <p>
      The result is that funding often becomes no one's job. It is the client's
      responsibility in theory, but in practice it requires knowing what needs to be
      done, tracking down the right forms from each institution, understanding how
      different asset types are funded, and actually following through across many
      separate transactions. Most families do part of it, or intend to get to it,
      and then don't.
    </p>

    <h2>What trust funding actually involves</h2>

    <h3>Real estate</h3>
    <p>
      To fund real property into a trust, a new deed must be recorded with the county
      — transferring title from you personally to you as trustee. In California this
      is a grant deed or a trust transfer deed. The county recorder's office records
      it. The process requires preparation, notarization, and recording (which
      involves a small fee). Done incorrectly, the property remains outside the trust.
    </p>

    <h3>Bank and brokerage accounts</h3>
    <p>
      Financial accounts are retitled by contacting each institution and providing
      a certificate of trust (a short document summarizing the trust's key
      provisions). Each institution has its own process and forms. Some allow the
      change online; others require notarized documents mailed to a specific address.
      This step needs to be repeated for every account at every institution.
    </p>

    <h3>Retirement accounts</h3>
    <p>
      IRAs and 401(k)s cannot and should not be retitled into a trust — doing so
      would trigger immediate income tax on the full balance. Instead, you name
      beneficiaries on the account itself. The question of whether to name the trust
      or individuals as beneficiaries has significant tax implications and is worth
      discussing with a CPA before deciding.
    </p>

    <h3>Life insurance</h3>
    <p>
      Life insurance is not typically owned by the revocable trust — it passes by
      beneficiary designation. The trust can be named as the beneficiary, which
      may be appropriate if you want the death benefit distributed according to the
      trust's terms rather than directly to individuals.
    </p>

    <h3>Business interests</h3>
    <p>
      Membership interests in LLCs, partnership interests, and shares in
      closely held corporations can typically be assigned to a trust by executing
      an assignment agreement. This step often requires review of the business's
      operating agreement to ensure transfers are permitted and do not trigger
      unexpected consequences.
    </p>

    <h2>How to approach it</h2>
    <p>
      The most reliable approach is to treat funding as a project with a checklist,
      deadlines, and someone accountable for completion. That person might be you,
      your attorney (if they offer a funding service), or a coordinator who handles
      the administrative follow-through.
    </p>
    <p>
      At minimum: fund your real estate immediately after signing, retitle your
      financial accounts within 30 days, and review every beneficiary designation
      you have on file. Then set a calendar reminder to review the trust every two
      to three years, or after any significant asset change.
    </p>
  </div>
)

const ArticleContentAdministration90Days = () => (
  <div className="article-body">
    <p>
      When a trustmaker dies, a clock starts. Most families are not prepared for
      how much there is to do, how quickly some of it must happen, and how easy it
      is to miss a deadline that has permanent consequences.
    </p>
    <p>
      This article describes what trust administration generally looks like in the
      first 90 days after a death. It is not a substitute for a licensed attorney
      or CPA who knows your specific trust and situation — it is a general map of
      the territory.
    </p>

    <h2>The immediate period: first two weeks</h2>
    <p>
      The most urgent tasks in the days immediately following a death are procedural
      rather than legal.
    </p>
    <ul>
      <li>
        <strong>Obtain multiple certified copies of the death certificate.</strong>
        You will need them — institutions, government agencies, and courts require
        original certified copies, not photocopies. Order at least ten; more is
        better. They become harder to obtain and more expensive over time.
      </li>
      <li>
        <strong>Notify the Social Security Administration.</strong> If the deceased
        was receiving benefits, SSA must be notified promptly. Overpayments must
        be returned; failing to notify can create complications.
      </li>
      <li>
        <strong>Secure the estate's assets.</strong> This means knowing where
        accounts, property, and valuables are, and ensuring they are protected.
        For real estate, this may mean changing locks or arranging for property
        management.
      </li>
      <li>
        <strong>Locate and review the trust document.</strong> The successor
        trustee should read the trust carefully — or have an attorney do so — to
        understand what it requires.
      </li>
    </ul>

    <h2>Weeks two through four: establishing authority</h2>
    <p>
      The successor trustee needs to be able to act. This involves:
    </p>
    <ul>
      <li>
        <strong>Obtaining a tax identification number (EIN) for the trust.</strong>
        At death, a revocable trust becomes irrevocable and must have its own EIN for
        tax purposes. This is obtained from the IRS (Form SS-4) and can be done
        online in minutes.
      </li>
      <li>
        <strong>Opening a trust estate checking account.</strong> A dedicated
        account for collecting income and paying expenses of the estate during
        administration keeps things organized and provides a clear paper trail.
      </li>
      <li>
        <strong>Notifying beneficiaries.</strong> California law requires the
        successor trustee to notify trust beneficiaries and certain heirs within 60
        days of the trustmaker's death. This starts a clock: beneficiaries have
        120 days from notification (or 60 days from when they receive a copy of
        the trust) to contest the trust.
      </li>
      <li>
        <strong>Notifying creditors.</strong> The successor trustee may need to
        notify known creditors and publish a notice to creditors to start the
        creditor claim period, depending on state law and the estate's circumstances.
      </li>
    </ul>

    <h2>Weeks four through twelve: inventory and tax planning</h2>
    <p>
      This period is when the substantive financial work begins:
    </p>
    <ul>
      <li>
        <strong>Inventory all assets and determine date-of-death values.</strong>
        Financial accounts, real estate (typically requires an appraisal),
        retirement accounts, business interests, personal property. These values
        form the basis of the estate tax analysis and are the heirs' cost basis
        for inherited assets.
      </li>
      <li>
        <strong>Engage a CPA or tax advisor.</strong> Two filing obligations arise
        immediately: the decedent's final income tax return (Form 1040, due April 15
        of the following year) and, if the estate is large enough, a federal estate
        tax return (Form 706, due nine months after death). Even if no estate tax
        is owed, filing Form 706 may be advisable to elect "portability" — allowing
        a surviving spouse to use the decedent's unused exemption.
      </li>
      <li>
        <strong>Evaluate whether a QTIP election or other elections should be
        made.</strong> These decisions have permanent tax consequences and should
        be made with professional guidance.
      </li>
      <li>
        <strong>Continue paying bills and managing property.</strong> The successor
        trustee must keep the estate's assets intact until distribution. Mortgage
        payments, property taxes, insurance premiums, and utilities continue to be
        obligations.
      </li>
    </ul>

    <h2>What the 90-day window does not include</h2>
    <p>
      Most trusts are not distributed within 90 days. The process of filing tax
      returns, receiving tax clearances, completing any probate for assets that fell
      outside the trust, resolving creditor claims, and preparing a final accounting
      typically takes 12 to 18 months for a moderately complex estate.
    </p>
    <p>
      The first 90 days is about getting organized, meeting the critical deadlines,
      and putting the right professionals in place. The families who handle this
      period well are the ones whose administration proceeds smoothly from there.
    </p>
  </div>
)

const ArticleContentCommunityProperty = () => (
  <div className="article-body">
    <p>
      California is one of nine community property states in the United States.
      This system of property ownership, which traces its origins to Spanish and
      Mexican law, has significant implications for estate planning — implications
      that are often misunderstood or overlooked by families and even by
      out-of-state advisors.
    </p>
    <p>
      This article explains the community property system in general terms. It is
      not legal or tax advice, and the application of these rules to any specific
      situation requires consultation with a licensed California estate planning
      attorney and, often, a CPA.
    </p>

    <h2>The basic rule: community versus separate property</h2>
    <p>
      Under California law, property acquired during a marriage is generally
      "community property," owned equally (50/50) by both spouses. Property owned
      before marriage, or acquired during marriage by gift or inheritance, is
      generally "separate property" belonging to the spouse who received it.
    </p>
    <p>
      This distinction matters for estate planning in at least two important ways:
      what each spouse can leave to whom, and the tax treatment of inherited
      assets.
    </p>

    <h2>What you can and cannot leave</h2>
    <p>
      A spouse can leave their own 50% share of community property to anyone.
      They cannot leave their spouse's 50% share, because that share already
      belongs to the surviving spouse — it is not part of the estate.
    </p>
    <p>
      This creates planning complexity for families who want to leave assets to
      children from prior relationships while also protecting a current spouse.
      Certain trust structures — most commonly a "QTIP trust" or "bypass trust"
      arrangement — are designed to navigate this, but they require careful
      drafting.
    </p>

    <h2>The double step-up in basis</h2>
    <p>
      Community property offers a significant tax advantage that is not available
      in common law states. When a spouse dies, community property assets generally
      receive a "step-up" in cost basis — meaning both halves of the community
      property receive a new basis equal to the fair market value at the date of
      death, not just the decedent's 50% share.
    </p>
    <p>
      This is sometimes called the "double step-up" or "community property step-up."
      It eliminates the capital gains that accumulated during the decedent's
      lifetime on the surviving spouse's share as well as the decedent's share. For
      a highly appreciated asset like a California home, this can represent a
      substantial tax benefit.
    </p>
    <p>
      By contrast, in a common law state, only the decedent's share (typically 50%)
      would receive a stepped-up basis. The surviving spouse's original cost basis
      for their half remains unchanged.
    </p>

    <h2>Why titling matters</h2>
    <p>
      To receive the double step-up, property must be properly characterized as
      community property. If community property has been titled in a way that
      suggests separate ownership — or if spouses hold property jointly in a form
      that creates ambiguity — the double step-up may not apply.
    </p>
    <p>
      California recognizes "community property with right of survivorship" as a
      form of title that preserves the double step-up while allowing the property to
      pass to the surviving spouse automatically without probate. This is often
      preferable to joint tenancy, which provides survivorship rights but may
      complicate the community property analysis.
    </p>
    <p>
      How property is titled — and whether that titling is consistent with its
      character as community or separate property — is something an attorney should
      review when an estate plan is being drafted or updated.
    </p>

    <h2>Transmutation and commingling</h2>
    <p>
      Separate property can become community property (and vice versa) through
      transmutation — a formal agreement between spouses — or through commingling,
      which happens when separate and community funds are mixed together over time
      and the original source becomes untraceable.
    </p>
    <p>
      Commingling is a common and often unintentional problem. Depositing an
      inheritance into a joint checking account, using separate funds for community
      improvements, or simply losing track of which assets came from where can
      convert separate property to community property — with estate planning and
      tax consequences that were never intended.
    </p>
  </div>
)

const ArticleContentProp19 = () => (
  <div className="article-body">
    <p>
      Proposition 19, approved by California voters in November 2020, made
      significant changes to the state's property tax rules — changes that directly
      affect estate planning for California homeowners and their families.
    </p>
    <p>
      The full legal and tax analysis of Prop 19 is complex and fact-specific.
      This article provides a general overview of what changed and why it matters.
      For advice on how Prop 19 applies to your situation, consult a licensed
      California estate planning attorney.
    </p>

    <h2>Background: Proposition 13 and the property tax system</h2>
    <p>
      To understand Prop 19, it helps to understand Prop 13. Passed in 1978,
      Proposition 13 capped California property tax rates at 1% of assessed value
      and limited annual assessment increases to 2% per year — regardless of how
      much a property appreciates in the market. When property is sold or
      transferred, it is generally reassessed at the new market value, resetting
      the base.
    </p>
    <p>
      Over decades, the gap between assessed value and market value has grown
      enormous for long-held properties. A home purchased in 1985 for $200,000 may
      now be worth $2 million, but the owner may be paying property taxes based on
      an assessed value of only $400,000.
    </p>

    <h2>What Prop 19 changed for parent-child transfers</h2>
    <p>
      Before Prop 19, parents could transfer their primary residence (and up to
      $1 million of other real property) to children without triggering
      reassessment. Children could inherit a rental property, for example, and
      continue paying taxes based on the parents' low assessed value — regardless
      of whether they lived there.
    </p>
    <p>
      Prop 19 significantly narrowed this exclusion. Effective February 16, 2021,
      the parent-child transfer exclusion applies only when:
    </p>
    <ul>
      <li>The property being transferred is the parent's primary residence, and</li>
      <li>The child moves into the property as their own primary residence within one year of the transfer.</li>
    </ul>
    <p>
      If these conditions are met, the child can inherit the low assessed value —
      but only up to $1 million above the parent's assessed value. If the home is
      worth $3 million and the parent's assessed value is $500,000, the child's
      assessed value is capped at $1.5 million ($500,000 + $1 million cap), not
      the full $3 million market value. The previous law had no such cap.
    </p>
    <p>
      For rental properties, vacation homes, or any property the child does not
      move into as a primary residence, there is no parent-child exclusion at all
      under Prop 19. The property is fully reassessed at market value upon
      transfer.
    </p>

    <h2>What Prop 19 expanded: base-year value transfers</h2>
    <p>
      Prop 19 also expanded the rules for homeowners 55 and over (and certain other
      eligible groups) who wish to sell their primary residence and purchase a new
      one. Previously, these base-year value transfers were limited to moves within
      the same county, or to a small number of counties that had passed reciprocal
      ordinances.
    </p>
    <p>
      Under Prop 19, eligible homeowners can transfer their existing property tax
      base value to a replacement home anywhere in California, up to three times
      in their lifetime. This is a meaningful expansion that increases mobility for
      older Californians who want to downsize or relocate within the state.
    </p>

    <h2>Planning implications</h2>
    <p>
      For families that planned to leave rental or investment properties to children
      without triggering reassessment, Prop 19 substantially changed the calculus.
      Strategies that worked before 2021 — holding property until death so children
      inherit the low basis and low assessed value — now have to weigh the certainty
      of reassessment if the child does not make the property their primary residence.
    </p>
    <p>
      This has prompted some families to consider gifting strategies during life,
      creating LLCs or other structures that might hold property differently, or
      accelerating the timing of transfers. Whether any of these alternatives make
      sense depends heavily on the specific property, the family's tax situation,
      and goals that only a professional who knows the full picture can evaluate.
    </p>
    <p>
      The general lesson of Prop 19 for estate planning purposes: assumptions about
      property tax treatment that were valid before February 2021 may no longer be
      accurate. If your estate plan was drafted before that date and includes
      California real property, it is worth reviewing with your attorney.
    </p>
  </div>
)

/* ─── Article content map ────────────────────────────────────────────── */

const articleContentMap: Record<string, () => JSX.Element> = {
  '8-documents-complete-estate-plan': ArticleContent8Documents,
  'role-of-cpa-estate-planning': ArticleContentCpaRole,
  'questions-before-hiring-estate-attorney': ArticleContentQuestionsForAttorney,
  'when-self-service-estate-planning-makes-sense': ArticleContentSelfService,
  'wills-vs-trusts-framework': ArticleContentWillsVsTrusts,
  'why-most-trusts-fail': ArticleContentWhyTrustsFail,
  'what-is-trust-funding': ArticleContentTrustFunding,
  'trust-administration-first-90-days': ArticleContentAdministration90Days,
  'california-community-property': ArticleContentCommunityProperty,
  'prop-19-california': ArticleContentProp19,
}

/* ─── Related articles ───────────────────────────────────────────────── */

const relatedByCategory: Record<string, string[]> = {
  basics: [
    '8-documents-complete-estate-plan',
    'role-of-cpa-estate-planning',
    'questions-before-hiring-estate-attorney',
    'when-self-service-estate-planning-makes-sense',
  ],
  'wills-vs-trusts': ['wills-vs-trusts-framework'],
  funding: [
    'why-most-trusts-fail',
    'what-is-trust-funding',
    'trust-administration-first-90-days',
  ],
  california: ['california-community-property', 'prop-19-california'],
}

/* ─── Helper components ──────────────────────────────────────────────── */

const CtaBanner = () => (
  <section className="section-cta section-padding">
    <div className="container-width">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="heading-md text-white mb-3">Not sure where to start?</h2>
          <p className="text-primary-200 leading-relaxed">
            A Family Planning Conversation is a 90-minute structured session that
            orients your family on the process, identifies gaps, and produces a
            roadmap of the professionals you'll need — before you spend a dollar on
            legal fees.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link to="/services/family-conversation" className="btn-secondary">
            How it works
          </Link>
          <Link to="/contact" className="btn-accent">
            Book a Family Planning Conversation
          </Link>
        </div>
      </div>
    </div>
  </section>
)

/* ─── Page ─────────────────────────────────────────────────────────── */

const LearnArticlePage = () => {
  // Supports both :slug (from LearnSlugPage router) and :articleSlug (direct route)
  const params = useParams<{ slug?: string; articleSlug?: string }>()
  const articleSlug = params.slug ?? params.articleSlug

  const meta = articleSlug ? articleMeta[articleSlug] : undefined
  const ContentComponent = articleSlug ? articleContentMap[articleSlug] : undefined

  if (!meta || !ContentComponent) {
    return <Navigate to="/learn" replace />
  }

  // Gather related articles in the same category, excluding current
  const siblings = relatedByCategory[meta.categorySlug] ?? []
  const related = siblings
    .filter((slug) => slug !== meta.slug)
    .slice(0, 3)
    .map((slug) => articleMeta[slug])
    .filter((item): item is ArticleMeta => item !== undefined)

  return (
    <div className="min-h-screen">

      {/* ── Article header ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width py-12 lg:py-16">
          <div className="max-w-prose-wide mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Link
                to={`/learn/${meta.categorySlug}`}
                className="badge-primary hover:bg-primary-200 transition-colors duration-150"
              >
                {meta.category}
              </Link>
              <span className="text-sm text-neutral-500">
                {meta.date} &middot; {meta.readTime}
              </span>
            </div>
            <motion.h1
              className="heading-lg text-primary-900 mb-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {meta.title}
            </motion.h1>
            <motion.p
              className="text-lg text-neutral-700 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              {meta.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Article body ───────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container-width">
          <motion.div
            className="max-w-prose-wide mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContentComponent />
          </motion.div>
        </div>
      </section>

      {/* ── Next steps aside ───────────────────────────────────────── */}
      <section className="bg-white pb-12 lg:pb-16">
        <div className="container-width">
          <div className="max-w-prose-wide mx-auto">
            <div className="card-aside">
              <h2 className="font-serif text-xl font-semibold text-primary-900 mb-3">
                Next steps
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                This article provides general information only. For advice specific
                to your situation, consult a licensed estate planning attorney. If
                you'd like help coordinating your estate plan or handling the tax and
                funding side,{' '}
                <Link
                  to="/services/family-conversation"
                  className="underline text-primary-700 hover:text-primary-900"
                >
                  book a Family Planning Conversation
                </Link>
                .
              </p>
            </div>

            <p className="legal-disclaimer mt-5">
              Generation Catalyst LLC is not a law firm and does not provide legal
              advice, draft legal documents, or represent clients in legal matters.
              Nothing on this site constitutes legal advice or creates an
              attorney-client relationship. Consult a licensed estate planning
              attorney in your state for advice specific to your situation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Keep learning ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-neutral-50 border-t border-neutral-200 py-12 lg:py-16">
          <div className="container-width">
            <h2 className="heading-sm text-primary-900 mb-8">Keep learning</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  className="card card-hover flex flex-col"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-category">{rel.category}</span>
                    <span className="text-xs text-neutral-500">{rel.readTime}</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-primary-900 mb-2 leading-snug flex-1">
                    {rel.title}
                  </h3>
                  <Link
                    to={`/learn/${rel.slug}`}
                    className="text-sm font-medium text-accent-700 hover:text-accent-800 inline-flex items-center gap-1 transition-colors duration-150 mt-2"
                  >
                    Read article <span aria-hidden="true">&rarr;</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </div>
  )
}

export default LearnArticlePage
