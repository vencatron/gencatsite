// Learn hub content. Every article is GENERAL education for any reader —
// never advice for one person's situation. See the project compliance rules
// before editing: no drafting language, no recommendations, no "you should".

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }

export type CategoryId = 'basics' | 'wills-vs-trusts' | 'funding' | 'california'

export interface ArticleCategory {
  id: CategoryId
  name: string
  title: string
  description: string
}

export interface Article {
  slug: string
  title: string
  description: string
  category: CategoryId
  readingMinutes: number
  date: string
  featured?: boolean
  body: ArticleBlock[]
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    id: 'basics',
    name: 'Basics',
    title: 'Estate planning basics',
    description:
      'What estate planning actually is, the documents involved, the professionals you may need, and how the pieces fit together — explained in plain language.',
  },
  {
    id: 'wills-vs-trusts',
    name: 'Wills vs. Trusts',
    title: 'Wills vs. trusts: general frameworks',
    description:
      'General frameworks for understanding how wills and trusts differ, the trade-offs families commonly weigh, and the questions worth bringing to a licensed attorney.',
  },
  {
    id: 'funding',
    name: 'Funding & Administration',
    title: 'The funding gap',
    description:
      'Signing documents is the start, not the finish. How trust funding, retitling, and ongoing administration determine whether an estate plan actually works.',
  },
  {
    id: 'california',
    name: 'California',
    title: 'California-specific concepts',
    description:
      'Community property, Prop 19, probate procedures, and other concepts specific to California families — explained generally, not as advice.',
  },
]

export const ARTICLES: Article[] = [
  {
    slug: 'why-most-trusts-fail',
    title: 'Why most trusts fail when families need them most',
    description:
      'Wealth transfers fail far more often from poor funding, communication, and coordination than from bad documents. A look at the gap nobody talks about.',
    category: 'funding',
    readingMinutes: 8,
    date: '2026-04-06',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Here is an uncomfortable pattern that estate planning professionals see over and over: a family pays for a well-drafted trust, signs it in a conference room, takes the binder home — and years later, when the trust is finally needed, it does not work the way anyone expected. Assets end up in probate anyway. Heirs are confused. The plan that was supposed to protect the family becomes a source of conflict and expense.',
      },
      {
        type: 'p',
        text: 'In a widely cited study of 3,250 families who transferred wealth, researchers Roy Williams and Vic Preisser found that roughly 70% of wealth transfers failed — meaning the assets did not end up where the family intended, or family harmony was lost along the way. Strikingly, fewer than 3% of those failures were attributed to professional errors like bad documents or flawed tax planning. The overwhelming majority traced back to breakdowns in communication, unprepared heirs, and the absence of follow-through after the documents were signed.',
      },
      { type: 'h2', text: 'The document is not the plan' },
      {
        type: 'p',
        text: 'A trust is a set of instructions. Like any instructions, it only matters if it is connected to the things it is supposed to govern. A revocable living trust, for example, generally controls only the assets that have been formally transferred into it — a process called funding. A house that was never retitled to the trust, a brokerage account that was never moved, a business interest that was never assigned: these typically fall outside the trust’s instructions, no matter how carefully those instructions were written.',
      },
      {
        type: 'p',
        text: 'This is the funding gap, and it is the single most common mechanical reason trusts underperform. It happens for understandable reasons. Signing day feels like the finish line. The attorney’s engagement often ends when the documents are delivered. Retitling involves tedious paperwork with banks, brokerages, county recorders, and transfer agents — and nobody is explicitly responsible for making sure it gets done.',
      },
      { type: 'h2', text: 'The three failure modes' },
      {
        type: 'p',
        text: 'When professionals talk about estate plans failing, the failures usually cluster into three categories:',
      },
      {
        type: 'ul',
        items: [
          'Mechanical failures. Assets were never funded into the trust, beneficiary designations were never updated, or old documents were never coordinated with new ones. The plan exists on paper but is not connected to the family’s actual property.',
          'Tax failures. The estate plan was created in a vacuum, without tax projections, basis planning, or coordination with the family’s income tax situation — so opportunities were missed and avoidable costs were incurred.',
          'Human failures. Heirs were never told what the plan was or why. Trustees were named but never prepared for the job. When the moment came, confusion and mistrust did the damage that the documents were meant to prevent.',
        ],
      },
      {
        type: 'p',
        text: 'Notice that none of these are drafting problems. They are coordination problems. Each one lives in the space between professionals — after the attorney finishes, outside the financial advisor’s mandate, beyond the scope of a once-a-year tax return.',
      },
      { type: 'h2', text: 'What coordination looks like' },
      {
        type: 'p',
        text: 'Families whose plans hold up tend to treat estate planning as an ongoing process with several workstreams, not a one-time legal purchase. In general terms, that process includes:',
      },
      {
        type: 'ol',
        items: [
          'Working with a licensed attorney to design and draft the legal documents.',
          'Systematically funding the trust — retitling real estate, moving accounts, assigning business interests, and updating beneficiary designations to match the plan.',
          'Coordinating the tax side — projections, basis tracking, gifting strategy, and the returns that trusts and estates require.',
          'Preparing the people — making sure trustees, agents, and heirs understand their roles before they need to perform them.',
          'Reviewing the plan periodically, because laws change, assets change, and families change.',
        ],
      },
      {
        type: 'p',
        text: 'Every item on that list after the first one is where most plans quietly fall apart — and it is exactly the territory where a coordinator, often working alongside the family’s attorney and financial advisor, earns their keep.',
      },
      {
        type: 'p',
        text: 'The takeaway is not that documents do not matter. They matter enormously, and they are the attorney’s domain. The takeaway is that a signed document is the beginning of an estate plan, not the end of one. Families who understand that distinction — and assign someone the job of follow-through — are the ones whose plans actually work when it counts.',
      },
    ],
  },
  {
    slug: 'eight-documents-complete-estate-plan',
    title: 'The 8 documents in a complete estate plan',
    description:
      'A plain-language taxonomy of the documents most estate plans include — what each one generally does, and why the set matters more than any single piece.',
    category: 'basics',
    readingMinutes: 9,
    date: '2026-04-13',
    body: [
      {
        type: 'p',
        text: 'When people say "estate plan," they often picture a single document — usually a will or a trust. In practice, a complete estate plan is a coordinated set of documents, each doing a different job. This article walks through the eight components that most comprehensive plans include. It is a general taxonomy, not a checklist of what any particular family needs: which documents apply, and how they should be designed, is a conversation for a licensed estate planning attorney.',
      },
      { type: 'h2', text: '1. A will' },
      {
        type: 'p',
        text: 'A will states who receives a person’s probate property at death, names an executor to manage that process, and — for parents of minor children — typically nominates guardians. In plans built around a living trust, the will is often a "pour-over" will: a safety net directing any assets left outside the trust to be added to it, usually through probate. Wills must meet state-law formalities to be valid, which is one of many reasons they are drafted by attorneys.',
      },
      { type: 'h2', text: '2. A revocable living trust' },
      {
        type: 'p',
        text: 'A revocable living trust is a legal arrangement in which a trustee holds and manages assets according to written instructions. While the person who created it is alive and able, they typically serve as their own trustee and can change the trust at any time. At incapacity or death, a successor trustee steps in and follows the instructions — generally without court involvement for the assets the trust actually holds. Trusts are common in California in part because the state’s probate process is relatively long and its statutory fees are based on the gross value of the estate.',
      },
      { type: 'h2', text: '3. A durable power of attorney for finances' },
      {
        type: 'p',
        text: 'This document names an agent to handle financial and legal matters — paying bills, managing accounts, dealing with insurance — if the person becomes unable to do so. "Durable" means it remains effective during incapacity, which is precisely when it is needed. Without one, families often face a court conservatorship proceeding to gain authority over a loved one’s finances.',
      },
      { type: 'h2', text: '4. An advance health care directive' },
      {
        type: 'p',
        text: 'California combines two functions in this document: naming a health care agent to make medical decisions during incapacity, and recording the person’s own wishes about treatment, end-of-life care, and related matters. Other states may split these into a health care proxy and a living will, but the purpose is the same — making sure medical decisions reflect the person’s values and are made by someone they chose.',
      },
      { type: 'h2', text: '5. A HIPAA authorization' },
      {
        type: 'p',
        text: 'Federal privacy law restricts who can receive medical information. A HIPAA authorization permits named individuals to talk to doctors and receive records — which matters because an agent who cannot get information cannot make informed decisions. It is a small document that prevents a large amount of frustration.',
      },
      { type: 'h2', text: '6. Beneficiary designations' },
      {
        type: 'p',
        text: 'Retirement accounts, life insurance, and annuities generally pass by beneficiary designation — the form on file with the institution — regardless of what a will or trust says. That makes these forms, collectively, one of the most powerful "documents" in any estate plan, and one of the most commonly neglected. A plan is only coherent when its beneficiary designations are reviewed and aligned with the rest of the documents, a coordination task that families, attorneys, and tax professionals typically share.',
      },
      { type: 'h2', text: '7. Guardianship nominations' },
      {
        type: 'p',
        text: 'For families with minor children, the nomination of guardians — usually contained in the will, sometimes in a separate writing — tells the court who the parents want to raise their children if both are gone. Courts make the final decision, but a clear nomination from the parents carries significant weight and spares the family a contested process.',
      },
      { type: 'h2', text: '8. A letter of intent and personal property memorandum' },
      {
        type: 'p',
        text: 'Not every instruction belongs in a formal legal document. Many plans include a letter of intent — an informal document explaining the reasoning behind decisions, where things are located, and practical guidance for trustees and heirs — and a personal property memorandum dealing with items of sentimental value. These are not substitutes for legal documents, but they do work the legal documents cannot: they communicate.',
      },
      { type: 'h2', text: 'The set matters more than the pieces' },
      {
        type: 'p',
        text: 'Two themes run through this list. First, the documents interlock — a trust without funding, a will that contradicts beneficiary forms, or an agent without a HIPAA authorization each undermine the rest. Second, the documents come from different sources: an attorney drafts the legal instruments, financial institutions hold the beneficiary forms, and the family maintains the informal pieces. Keeping the whole set consistent over time is a coordination job, and it is one of the most valuable, least glamorous parts of estate planning.',
      },
    ],
  },
  {
    slug: 'wills-vs-trusts-framework',
    title: 'Wills vs. trusts: a framework for thinking about the choice',
    description:
      'A general framework for understanding how wills and trusts differ — probate, incapacity, privacy, cost, and complexity — without telling you which to pick.',
    category: 'wills-vs-trusts',
    readingMinutes: 8,
    date: '2026-04-20',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'The most common question in estate planning is some version of "do I need a will or a trust?" It is also a question no article can responsibly answer, because the right structure depends on a family’s specific assets, goals, and state law — exactly the analysis a licensed estate planning attorney is trained and authorized to do. What an article can do is explain the framework: the dimensions along which wills and trusts differ, and the factors families commonly weigh with their attorney. That is the purpose of this one.',
      },
      { type: 'h2', text: 'What each one is' },
      {
        type: 'p',
        text: 'A will is a set of instructions that takes effect at death and is carried out through a court-supervised process called probate. A revocable living trust is a container created during life: assets transferred into it are managed by a trustee under written instructions, both during life and after death, generally without court supervision for the assets the trust holds.',
      },
      {
        type: 'p',
        text: 'A few clarifications that resolve most confusion. First, trust-based plans still include a will — a "pour-over" will that catches anything left outside the trust. Second, a revocable trust by itself generally does not reduce estate taxes or protect assets from the creator’s creditors; its core jobs are probate avoidance, incapacity management, and control over how and when beneficiaries receive assets. Third, a trust only governs what it holds — the funding work after signing determines whether the trust does anything at all.',
      },
      { type: 'h2', text: 'The five dimensions families typically weigh' },
      { type: 'h3', text: '1. Probate exposure' },
      {
        type: 'p',
        text: 'Probate varies enormously by state. In California, the process commonly takes a year or more, is part of the public record, and involves statutory fees calculated on the gross value of the estate. States also offer simplified procedures for smaller estates, with thresholds that adjust over time. How much probate matters to a family generally depends on where they live, what they own, and where they own it — real estate in multiple states, for example, can mean multiple probate proceedings.',
      },
      { type: 'h3', text: '2. Incapacity planning' },
      {
        type: 'p',
        text: 'A will does nothing during life. A funded trust, by contrast, allows a successor trustee to manage trust assets if the creator becomes incapacitated, often avoiding a court conservatorship. Families weighing this dimension often think about age, health, family support, and the complexity of what would need to be managed.',
      },
      { type: 'h3', text: '3. Privacy' },
      {
        type: 'p',
        text: 'Probate files are public. Trust administration is generally private. For some families this is a deciding factor; for others it barely registers.',
      },
      { type: 'h3', text: '4. Control over distributions' },
      {
        type: 'p',
        text: 'Trusts can hold and manage assets over time — staged distributions, provisions for beneficiaries with special circumstances, protections for young or financially inexperienced heirs. A will generally distributes outright once probate concludes. Families with longer-horizon concerns often find this the most important dimension of all.',
      },
      { type: 'h3', text: '5. Cost and maintenance' },
      {
        type: 'p',
        text: 'Trust-based plans typically cost more to create and require ongoing discipline: funding new assets into the trust, keeping titles and beneficiary designations aligned, and reviewing the plan as life changes. Will-based plans cost less up front but may shift cost and time to the family later, in probate. The honest comparison is lifetime cost plus family burden, not sticker price.',
      },
      { type: 'h2', text: 'How to use this framework' },
      {
        type: 'p',
        text: 'Notice what this framework does not do: it does not score the options or tell any reader which way to lean, because the weights differ for every family. Its value is in preparation. A family that walks into an attorney’s office able to say "here is what we own, here is who we are responsible for, and here is how we feel about probate, incapacity, privacy, control, and cost" will get dramatically more out of that meeting — and often spend less on it — than one starting from a blank page.',
      },
      {
        type: 'p',
        text: 'That preparation — organizing the facts, clarifying the goals, and assembling the right questions — is something families can do themselves, or with help from a financial or tax professional who works alongside their attorney. The legal recommendation itself belongs to the attorney. The clarity that makes the recommendation good belongs to the family.',
      },
    ],
  },
  {
    slug: 'california-community-property-estate-plan',
    title: 'California community property and your estate plan',
    description:
      'How California’s community property system interacts with estate planning generally — characterization, the double basis step-up, and why titling matters.',
    category: 'california',
    readingMinutes: 8,
    date: '2026-04-27',
    body: [
      {
        type: 'p',
        text: 'California is one of a small number of community property states, and that single fact shapes almost every estate planning conversation that happens here. This article explains the general concepts — what community property is, how it interacts with death and taxes, and why characterization and titling are recurring themes in California planning. As always, how these rules apply to any particular family is a question for a licensed California attorney, often working with a tax professional.',
      },
      { type: 'h2', text: 'The basic idea' },
      {
        type: 'p',
        text: 'In broad terms, California law treats most property acquired by either spouse during marriage as community property — owned equally by both spouses — while property owned before marriage, or received by gift or inheritance, is generally separate property. Each spouse can typically direct the disposition of their half of the community property and all of their separate property at death.',
      },
      {
        type: 'p',
        text: 'Simple in concept; messy in practice. Over a long marriage, separate and community funds get mixed. A house bought before marriage gets paid down with community earnings. A business started before marriage grows through a spouse’s work during marriage. California has developed extensive rules for tracing and apportioning these situations, and characterizing assets correctly is often a substantial part of what estate planning and family law attorneys actually do.',
      },
      { type: 'h2', text: 'Why it matters at death: the double step-up' },
      {
        type: 'p',
        text: 'One of the most significant tax features of community property appears at the first spouse’s death. Under federal tax law, inherited assets generally receive a new income tax basis equal to fair market value at death — the "step-up." For community property, both halves of the asset — the deceased spouse’s half and the surviving spouse’s half — are generally eligible for this basis adjustment, not just the decedent’s half.',
      },
      {
        type: 'p',
        text: 'In general terms, that means appreciated community assets can arrive in the survivor’s hands with unrealized gain substantially reduced or eliminated, which can matter enormously if the survivor later sells. This "double step-up" is a major reason characterization — community versus separate, and how title is held — is not just a legal nicety in California. It can have six- or seven-figure income tax consequences, and it is a standard topic in any coordinated review between a family’s attorney and their CPA.',
      },
      { type: 'h2', text: 'Titling, agreements, and trusts' },
      {
        type: 'p',
        text: 'California recognizes several ways married couples can hold property — community property, community property with right of survivorship, joint tenancy, and others — and the form of title can affect both what happens at death and how the tax rules apply. Couples can also change the character of property by agreement, a process called transmutation, which has its own formal requirements.',
      },
      {
        type: 'p',
        text: 'Married couples’ living trusts in California are commonly designed to receive both community and separate property while preserving each asset’s character, and trust documents often recite how contributed property is characterized. Keeping that characterization accurate over the years — as accounts move, properties are refinanced, and businesses evolve — is part of the ongoing maintenance that determines whether the plan works as designed.',
      },
      { type: 'h2', text: 'Common friction points' },
      {
        type: 'ul',
        items: [
          'Moving between states. Couples who move to California from a separate-property state, or vice versa, can end up with layered characterization questions, including what California calls quasi-community property.',
          'Blended families. Community property rules interact with competing instincts about providing for a current spouse and children from prior relationships — one of the most common reasons couples seek professional planning.',
          'Businesses and professional practices. A business that straddles the before-and-during-marriage line raises both valuation and characterization questions.',
          'Inconsistent records. The double step-up and other benefits often depend on being able to demonstrate character — which makes good records a tax asset in their own right.',
        ],
      },
      {
        type: 'p',
        text: 'The general lesson: in California, what you own is only half the story — how it is characterized and titled is the other half. Families who keep both halves documented and aligned with their estate plan give their attorney better raw material, their CPA better tax options, and their heirs a much cleaner administration.',
      },
    ],
  },
  {
    slug: 'prop-19-california-families',
    title: 'Prop 19 and what it changed for California families',
    description:
      'A general explainer of Proposition 19: how it narrowed the parent-child property tax exclusion and expanded base-year transfers for homeowners 55 and over.',
    category: 'california',
    readingMinutes: 8,
    date: '2026-05-04',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Proposition 19, approved by California voters in 2020 and effective in 2021, reshaped two long-standing features of California property tax law: the ability of parents to pass property to children without reassessment, and the ability of older homeowners to move without losing their low property tax base. Years later, it remains one of the most searched — and most misunderstood — topics in California estate planning. Here is the general picture.',
      },
      { type: 'h2', text: 'Background: why assessed value matters' },
      {
        type: 'p',
        text: 'Under Proposition 13, California property is generally taxed on its assessed value at acquisition, with annual increases capped at 2%. Long-held property is therefore often taxed on a value far below market. Reassessment to current market value — triggered by a change in ownership — can multiply a property tax bill several times over. That is why the rules about which transfers trigger reassessment, and which are excluded, carry real money.',
      },
      { type: 'h2', text: 'What Prop 19 narrowed: the parent-child exclusion' },
      {
        type: 'p',
        text: 'Before Prop 19, parents could generally transfer a primary residence of any value, plus up to $1 million of assessed value in other property (rentals, vacation homes, commercial property), to children without reassessment. Prop 19 substantially narrowed this. In general terms, under current law:',
      },
      {
        type: 'ul',
        items: [
          'The exclusion now applies only to a family home (or family farm) that the child uses as the child’s own primary residence after the transfer, with a filing required to claim the homeowner’s exemption within a limited window.',
          'Even then, the exclusion is capped: if the property’s market value at transfer exceeds the taxable value by more than an inflation-adjusted allowance (starting at $1 million), the excess is added to the new assessed value.',
          'Transfers of other property — rental homes, vacation properties, commercial buildings — between parents and children are generally reassessed to market value.',
        ],
      },
      {
        type: 'p',
        text: 'The practical effect: the common pre-2021 pattern of leaving a rental property or second home to children with its low tax base intact generally no longer works, and even the family home keeps its base only when a child actually moves in and claims it. For families whose plans were designed before 2021, this is one of the clearest reasons a periodic plan review exists.',
      },
      { type: 'h2', text: 'What Prop 19 expanded: portability for homeowners 55+' },
      {
        type: 'p',
        text: 'The same measure broadened a different benefit. Homeowners who are 55 or older, severely disabled, or displaced by wildfire or natural disaster can generally transfer the taxable value of their primary residence to a replacement primary residence anywhere in California — up to three times — with an upward adjustment if the new home costs more than the old one sold for. Before Prop 19, this kind of transfer was limited to certain counties and was generally a once-per-lifetime event.',
      },
      { type: 'h2', text: 'How this shows up in estate planning conversations' },
      {
        type: 'p',
        text: 'Prop 19 turned property tax into a first-class estate planning variable in California. In general terms, families and their advisors now routinely weigh questions like: How does the property tax cost of inheriting a property compare to its rental value or sale value? Does any child actually intend to live in the family home? How does holding property in entities or trusts interact with reassessment rules? When does keeping a property make less economic sense than it did under the old rules?',
      },
      {
        type: 'p',
        text: 'These are fact-specific questions with legal and tax dimensions — the legal application of the reassessment rules is a matter for a qualified attorney or the county assessor’s processes, while the economic modeling (tax cost versus benefit, hold-versus-sell projections) is classic CPA territory. What no family should do is assume that a plan written before 2021 still does what it was designed to do. The rules under it changed.',
      },
      {
        type: 'p',
        text: 'One more general note: claiming the exclusions that do remain involves deadlines and filings — the homeowner’s exemption claim for the family-home exclusion, claims for base-year transfers, and related county forms all have time limits. Administration after a death in California now has a property tax workstream of its own, which is exactly the kind of detail that coordinated follow-through is meant to catch.',
      },
    ],
  },
  {
    slug: 'role-of-cpa-estate-planning',
    title: 'The role of a CPA in estate planning',
    description:
      'Estate planning is a team sport. What the CPA’s lane actually covers — projections, basis, gifting analysis, fiduciary returns — and how it complements the attorney’s.',
    category: 'basics',
    readingMinutes: 7,
    date: '2026-05-11',
    body: [
      {
        type: 'p',
        text: 'Estate planning is usually described as a legal task, and its centerpiece documents are unquestionably legal: only a licensed attorney can draft them or advise on what they should say. But a complete estate plan has a second dimension that is just as consequential and far less discussed — the tax and financial dimension. That is the CPA’s lane. This article describes, in general terms, what that lane includes and how the two professions fit together.',
      },
      { type: 'h2', text: 'Before the documents: analysis and projections' },
      {
        type: 'p',
        text: 'Good legal design starts with good numbers. Before an attorney can design the right structure, someone has to assemble the financial picture: what the family owns, how it is titled, what it is worth, what it cost, and what the tax exposure looks like under different scenarios. CPAs commonly contribute:',
      },
      {
        type: 'ul',
        items: [
          'Estate and gift tax projections — modeling how a family’s situation compares to the federal exemption (which is $15 million per person as of 2026, indexed going forward) under different growth and timing assumptions.',
          'Income tax and basis analysis — identifying which assets carry large unrealized gains, where basis step-up matters, and how income tax and estate tax considerations trade off against each other.',
          'Gifting analysis — modeling annual exclusion gifts, larger lifetime gifts, and their long-term effects, so the family and attorney can weigh options with real numbers.',
          'Business and cash-flow analysis — for owners, understanding what the business is worth, what a succession would look like financially, and what the family would live on.',
        ],
      },
      {
        type: 'p',
        text: 'None of this tells a family what their documents should say — that is the attorney’s call, made with the family. It makes the attorney’s call better informed.',
      },
      { type: 'h2', text: 'After the documents: compliance and administration' },
      {
        type: 'p',
        text: 'Once a plan exists, it generates ongoing tax work for as long as it lives — and especially after a death. Common examples, described generally:',
      },
      {
        type: 'ul',
        items: [
          'Fiduciary income tax returns (Form 1041) for trusts and estates that earn income.',
          'Gift tax returns (Form 709) when lifetime gifts exceed annual exclusion amounts or otherwise require reporting.',
          'Estate tax returns (Form 706) when an estate exceeds the filing threshold — or when filing is chosen to elect portability of a deceased spouse’s unused exemption.',
          'Basis tracking and date-of-death valuations, which determine heirs’ future tax outcomes.',
          'K-1 preparation for trust beneficiaries, and planning around how and when trust income is distributed.',
        ],
      },
      { type: 'h2', text: 'Between the professionals: the coordination gap' },
      {
        type: 'p',
        text: 'The attorney’s engagement typically ends when documents are signed. The financial advisor manages investments. The CPA, historically, shows up at tax time. Each professional does their job — and the connective tissue between the jobs is often nobody’s job. Assets go unfunded, beneficiary forms go stale, tax elections get missed, and heirs are surprised.',
      },
      {
        type: 'p',
        text: 'This is why some families engage a financially trained coordinator — frequently a CPA — to project-manage the whole: preparing the family for the attorney engagement, tracking funding to completion, keeping the tax workstream connected to the legal one, and convening the professionals when something changes. The CPA in that role does not draft documents, review them for legal sufficiency, or give legal advice. They make sure the plan the attorney designed is actually implemented, taxed sensibly, and kept current.',
      },
      {
        type: 'p',
        text: 'A useful mental model: the attorney builds the vehicle, the CPA keeps it fueled, registered, and maintained, and the family decides where it is going. Plans fail far more often from missing maintenance than from faulty construction — which is exactly why the least famous seat on the team may be the one that determines whether the plan works.',
      },
    ],
  },
  {
    slug: 'questions-before-hiring-estate-planning-attorney',
    title: 'Questions to ask before you hire an estate planning attorney',
    description:
      'A preparation guide: how families generally evaluate estate planning attorneys, what to ask in the first meeting, and what to bring so the engagement is efficient.',
    category: 'basics',
    readingMinutes: 8,
    date: '2026-05-18',
    body: [
      {
        type: 'p',
        text: 'Hiring an estate planning attorney is one of the highest-leverage decisions in the whole planning process — and most families do it exactly once, with no basis for comparison. This guide collects the questions families commonly ask when evaluating attorneys, plus the preparation that makes the first meeting count. It is general preparation guidance, not a substitute for the attorney’s own advice once engaged.',
      },
      { type: 'h2', text: 'Questions about fit and focus' },
      {
        type: 'ul',
        items: [
          'What share of your practice is estate planning? Planning done occasionally as a sideline is a different product than planning done daily.',
          'Do you regularly work with families like ours — similar asset levels, business ownership, blended family structure, or special circumstances?',
          'Are you licensed in the state where we live (and familiar with issues in states where we own property)?',
          'Who in your office will we actually work with, and who will answer questions after signing?',
        ],
      },
      { type: 'h2', text: 'Questions about scope and process' },
      {
        type: 'ul',
        items: [
          'What documents does your engagement include, and what does it explicitly not include?',
          'How does trust funding get handled — do you retitle assets, provide instructions for us to execute, or neither? Who confirms it actually got done?',
          'How do you coordinate with our CPA and financial advisor, and at what points in the process?',
          'How are updates handled in future years — amendments, restatements, reviews — and what do they cost?',
          'What is your typical timeline from engagement to signing?',
        ],
      },
      {
        type: 'p',
        text: 'The funding question deserves emphasis. Engagements vary widely: some attorneys handle retitling of real estate and provide letters for financial accounts; others deliver documents with instructions and leave execution to the family. Neither model is wrong — but the family needs to know which one they are buying, because unfunded trusts are the most common way good documents fail.',
      },
      { type: 'h2', text: 'Questions about cost' },
      {
        type: 'ul',
        items: [
          'Do you charge a flat fee or hourly, and what does the quoted fee cover?',
          'What commonly causes the fee to exceed the quote?',
          'What will future amendments or a full restatement typically cost?',
        ],
      },
      { type: 'h2', text: 'What to bring to the first meeting' },
      {
        type: 'p',
        text: 'Attorneys consistently say the same thing: prepared families get better plans for less money, because billable time goes to design instead of data gathering. Preparation generally includes:',
      },
      {
        type: 'ol',
        items: [
          'An asset inventory — accounts, real estate, business interests, insurance, and retirement plans, with approximate values and how each is titled.',
          'Current beneficiary designations for retirement accounts and life insurance.',
          'Any existing estate planning documents, even outdated ones.',
          'A list of the people: spouse, children, intended beneficiaries, and candidates for trustee, executor, agent, and guardian roles.',
          'The hard questions, thought about in advance — who gets what, who is in charge, and any family circumstances the attorney should know about.',
        ],
      },
      {
        type: 'p',
        text: 'Assembling that picture is work, and it is work a family can do on its own or with help from a financial or tax professional. (Our Family Planning Conversation exists in part to produce exactly this preparation — the inventory, the people map, and the attorney-ready question list — without giving legal advice or steering the legal decisions.)',
      },
      { type: 'h2', text: 'One closing signal' },
      {
        type: 'p',
        text: 'In the first meeting, notice whether the attorney asks more questions than they answer. Good planning is fact-driven; an attorney probing about family dynamics, asset character, and long-term intentions is doing the job well. An office that reaches for a binder before understanding the family is a signal worth weighing.',
      },
    ],
  },
  {
    slug: 'what-is-trust-funding',
    title: 'What is trust funding and why nobody talks about it',
    description:
      'Trust funding — retitling assets into a trust — is the unglamorous step that determines whether a trust works at all. What it involves, generally, asset by asset.',
    category: 'funding',
    readingMinutes: 8,
    date: '2026-05-25',
    body: [
      {
        type: 'p',
        text: 'If estate planning has a single most under-discussed topic, it is funding. "Funding" a trust means formally connecting assets to it — retitling accounts and real estate, assigning business interests, and aligning beneficiary designations — so that the trust’s instructions actually govern the property. A trust that holds nothing governs nothing. And yet funding is routinely treated as an afterthought: mentioned at signing, summarized in an instruction letter, and left to a family that has never done it before.',
      },
      { type: 'h2', text: 'Why funding falls through the cracks' },
      {
        type: 'p',
        text: 'No conspiracy is required — the incentives explain it. The legal engagement traditionally centers on design and drafting, and often ends at signing. Financial institutions process retitling requests but do not chase them. The family believes the expensive part is finished. Funding is tedious, multi-institution paperwork with no deadline and no owner — the precise profile of a task that never gets done. Industry estimates and professional experience both suggest a large share of revocable trusts are partially or completely unfunded years after signing.',
      },
      { type: 'h2', text: 'What funding involves, asset by asset' },
      {
        type: 'p',
        text: 'Mechanics vary by institution and by state, and the right treatment of any specific asset is a question for the family’s attorney and tax advisor. Generally, though, the workstreams look like this:',
      },
      {
        type: 'ul',
        items: [
          'Real estate — a new deed transferring the property to the trustee, recorded with the county, with attention to transfer tax exemptions, property tax reassessment exclusions, and lender and title insurance considerations. Deeds are legal documents and are prepared by attorneys or qualified providers.',
          'Bank and brokerage accounts — retitling the account into the trust’s name, typically requiring a certification of trust and each institution’s own forms.',
          'Business interests — assignments of LLC or partnership interests or stock, which may require consent under operating or buy-sell agreements, and which intersect with licensing and tax classification questions.',
          'Retirement accounts — generally not retitled into a living trust during life; instead, beneficiary designations are reviewed so they coordinate with the plan. The interaction of retirement accounts and trusts is a notoriously technical area of tax law.',
          'Life insurance — reviewing ownership and beneficiary designations so the proceeds land where the plan intends.',
          'Tangible property and everything else — assignments of personal property, and a process for catching newly acquired assets, because funding is not a one-time event.',
        ],
      },
      { type: 'h2', text: 'The quiet failure mode — and the safety net' },
      {
        type: 'p',
        text: 'When assets are left outside the trust, the pour-over will usually catches them — by sending them through probate into the trust. In other words, the failure mode of poor funding is precisely the outcome the trust was created to avoid, plus extra delay and cost. Incomplete funding also degrades the trust’s incapacity protection: a successor trustee cannot manage an account the trust never held.',
      },
      { type: 'h2', text: 'What disciplined funding looks like' },
      {
        type: 'p',
        text: 'Families and advisors who take funding seriously tend to converge on the same practices, described generally:',
      },
      {
        type: 'ol',
        items: [
          'A complete asset inventory at the start, so nothing is invisible.',
          'A funding plan listing every asset, its intended treatment under the attorney’s design, the institution involved, and the document required.',
          'Tracked execution — submissions, confirmations, recorded deeds, and updated statements collected as proof, not assumed.',
          'A reconciliation at the end: every asset either titled to the trust, governed by an aligned beneficiary designation, or deliberately left out for a documented reason.',
          'A maintenance habit — new accounts, refinances, and acquisitions checked against the plan, ideally on an annual rhythm.',
        ],
      },
      {
        type: 'p',
        text: 'This is project management, not law — though it must follow the attorney’s design and route legal questions back to the attorney. It is exactly the kind of work a coordinator can own. However a family gets it done, the principle is the same: the plan is not the binder. The plan is the binder plus the titles. Only one of those is finished on signing day.',
      },
    ],
  },
  {
    slug: 'trust-administration-first-90-days',
    title: 'Trust administration after a death: a family’s first 90 days',
    description:
      'A general orientation to what successor trustees and families typically face in the first three months after a death — notices, inventories, valuations, and tax decisions.',
    category: 'funding',
    readingMinutes: 9,
    date: '2026-06-01',
    body: [
      {
        type: 'p',
        text: 'When a person with a living trust dies, the trust does not administer itself. A successor trustee steps into a formal legal role with real duties, real deadlines, and personal responsibility for getting it right. This article offers a general orientation to the first ninety days of a typical California trust administration — what tends to happen and in what order. It is a map, not a manual: an actual administration should be guided by an attorney advising the trustee, with a tax professional handling the filings.',
      },
      { type: 'h2', text: 'The first two weeks: stabilize' },
      {
        type: 'ul',
        items: [
          'Care for people first — the legal process can wait days while a family grieves; very little is truly urgent in week one.',
          'Secure property: homes locked, vehicles stored, valuables accounted for, mail collected, and insurance kept in force (vacant-home coverage is a common early issue).',
          'Obtain certified death certificates — institutions each want their own copy, so families typically order multiple.',
          'Locate the estate planning documents: the trust, any amendments, the pour-over will, and the asset inventory if one exists.',
          'Avoid distributing or retitling anything yet. Early, informal distributions are a classic source of later conflict and personal exposure for the trustee.',
        ],
      },
      { type: 'h2', text: 'Weeks two to six: formal machinery' },
      {
        type: 'p',
        text: 'With documents in hand, the administration formally begins, typically with an attorney engaged to advise the trustee. Common steps, described generally:',
      },
      {
        type: 'ul',
        items: [
          'Statutory notice to heirs and beneficiaries. California law requires the trustee to send a prescribed notice when a revocable trust becomes irrevocable by death; it starts a window for contests, so its timing and form matter and it is normally prepared with counsel.',
          'Lodging the original will with the county and notifying government agencies — Social Security, and in California, the state health care program’s estate recovery unit where applicable.',
          'Obtaining a taxpayer identification number for the now-irrevocable trust, which becomes its own taxpayer.',
          'Opening an administration bank account and beginning formal records — every dollar in and out will eventually be accounted for to beneficiaries.',
          'County property tax filings: change-in-ownership statements and, where applicable, claims for reassessment exclusions, all of which carry deadlines.',
        ],
      },
      { type: 'h2', text: 'Weeks four to twelve: inventory and valuation' },
      {
        type: 'p',
        text: 'In parallel, the trustee builds the complete financial picture: marshaling accounts, identifying debts, and valuing everything as of the date of death. Date-of-death values do double duty — they establish the new income tax basis of inherited assets and feed any estate tax analysis. Real estate, business interests, and unusual assets typically require formal appraisals. This valuation work is one of the places where the tax professional’s involvement matters most, because numbers established now determine beneficiaries’ tax outcomes for decades.',
      },
      { type: 'h2', text: 'The tax decision points' },
      {
        type: 'p',
        text: 'Several elections and filings come into view in the first months, generally including: the decedent’s final income tax return; the trust’s first fiduciary return and its year-end and accounting elections; whether an estate tax return is required — or worth filing anyway to preserve a surviving spouse’s portability of unused exemption, an election with its own deadline; and sub-trust funding decisions in trusts that divide at the first death. None of these are do-it-yourself decisions, but a trustee who knows they exist can make sure the right professional is asked at the right time.',
      },
      { type: 'h2', text: 'The pattern behind the list' },
      {
        type: 'p',
        text: 'Every item above is ordinary — and the volume is the problem. A grieving family member, often serving as trustee for the first time, is handed a part-time project-management job with legal exposure. The administrations that go smoothly tend to share three features: an attorney advising the trustee from early on, a tax professional engaged before valuations and elections are set, and someone — the trustee or a coordinator supporting them — keeping a single master checklist so nothing with a deadline waits in a drawer.',
      },
    ],
  },
  {
    slug: 'when-self-service-estate-planning-makes-sense',
    title: 'When self-service estate planning makes sense (and when it doesn’t)',
    description:
      'An honest general framework for online estate planning platforms: situations where they tend to fit, signals that a family needs an attorney, and the gap no platform fills.',
    category: 'basics',
    readingMinutes: 8,
    date: '2026-06-08',
    body: [
      {
        type: 'p',
        text: 'Online estate planning platforms — services like Trust & Will and its competitors — have made basic documents dramatically more accessible. They are also routinely either oversold ("never pay a lawyer again") or dismissed ("DIY documents are worthless"). Both takes are lazy. Here is a more honest general framework for how these tools fit into the landscape, and where their limits are.',
      },
      { type: 'h2', text: 'What the platforms actually do' },
      {
        type: 'p',
        text: 'Reputable platforms generate state-specific documents — wills, and in many cases living trusts, powers of attorney, and health care directives — from a structured questionnaire, with execution instructions. The better ones are built and maintained with licensed-attorney input and updated as laws change. What they do not do is advise: the platform cannot tell a user whether its standard structure fits their situation, because evaluating that is the practice of law. The user is, structurally, their own planner.',
      },
      { type: 'h2', text: 'Where self-service tends to fit' },
      {
        type: 'p',
        text: 'In general, families who report good experiences with these platforms share a profile: straightforward assets (a home, accounts, retirement plans), conventional wishes (everything to a spouse, then children, in roughly equal shares), first marriages without competing family obligations, and situations below the thresholds where estate tax planning matters. For many such families, the realistic alternative to a platform document is not a bespoke attorney plan — it is no plan at all. Measured against that alternative, a properly executed basic plan is a meaningful improvement.',
      },
      {
        type: 'p',
        text: 'There is also a sequencing use: some families use an inexpensive platform plan as a stopgap — coverage now, while they prepare for a fuller professional engagement later. Documents can be replaced; an unexpected death without any documents cannot be.',
      },
      { type: 'h2', text: 'Signals that a family has outgrown self-service' },
      {
        type: 'ul',
        items: [
          'Business ownership — succession, buy-sell agreements, and entity interests are beyond any questionnaire.',
          'Blended families — providing for a current spouse and children from prior relationships is the classic situation where standardized documents create conflict.',
          'A beneficiary with special needs, where an inheritance done wrong can cost someone their benefits.',
          'Significant or unusual assets — multiple properties, out-of-state real estate, concentrated stock, or wealth approaching estate tax territory.',
          'Family conflict on the horizon — documents likely to be challenged deserve professional design and execution.',
          'Complex state-law overlays — in California, for example, community property characterization and Prop 19 property tax planning are not questionnaire material.',
        ],
      },
      {
        type: 'p',
        text: 'None of these mean a platform document is "invalid." They mean the hard part of the plan is the analysis, not the paperwork — and the analysis is exactly what self-service omits.',
      },
      { type: 'h2', text: 'The gap no platform fills' },
      {
        type: 'p',
        text: 'Here is the part both the marketing and the criticism tend to miss: however the documents get created, the work that makes them effective happens afterward. A platform trust is just as unfunded as an attorney-drafted trust until assets are retitled and beneficiary designations are aligned — and platform users, by definition, have no professional checking that follow-through. The funding gap does not care where the documents came from.',
      },
      {
        type: 'p',
        text: 'So the honest framework is a two-by-two: documents (simple situation → platforms can work; complexity → licensed attorney) and follow-through (required either way, provided by no document source automatically). Families using a platform still benefit from an orientation to the process and a funding discipline; families using attorneys still need the coordination. If you want a vetted starting point for the self-service route, our recommended tools page lists the platforms we think well of — with our affiliate relationship plainly disclosed.',
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category: CategoryId): Article[] {
  return ARTICLES.filter((a) => a.category === category)
}

export function getFeaturedArticles(count = 3): Article[] {
  const featured = ARTICLES.filter((a) => a.featured)
  const rest = ARTICLES.filter((a) => !a.featured)
  return [...featured, ...rest].slice(0, count)
}

export function getCategory(id: string): ArticleCategory | undefined {
  return ARTICLE_CATEGORIES.find((c) => c.id === id)
}
