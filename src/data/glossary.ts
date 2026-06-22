// General definitions for education only — not legal definitions and not advice.

export interface GlossaryTerm {
  term: string
  definition: string
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Advance health care directive',
    definition:
      'California’s combined document naming a health care agent to make medical decisions during incapacity and recording a person’s own wishes about treatment and end-of-life care. Other states may use separate documents (health care proxy, living will) for the same purposes.',
  },
  {
    term: 'Basis (and step-up in basis)',
    definition:
      'An asset’s starting value for income tax purposes, used to measure gain or loss when it is sold. Inherited assets generally receive a new basis equal to fair market value at the owner’s death — the "step-up" — which can substantially reduce capital gains tax for heirs.',
  },
  {
    term: 'Beneficiary',
    definition:
      'A person or organization designated to receive assets — under a will, a trust, a retirement account, or an insurance policy.',
  },
  {
    term: 'Beneficiary designation',
    definition:
      'The form on file with a financial institution naming who receives an account or policy at death. These designations generally override what a will or trust says, which is why keeping them aligned with the rest of an estate plan matters.',
  },
  {
    term: 'Certification of trust',
    definition:
      'A short document summarizing a trust’s key facts (its existence, trustees, and powers) that institutions accept in place of the full trust document, preserving privacy.',
  },
  {
    term: 'Community property',
    definition:
      'In California and a handful of other states, property acquired by either spouse during marriage is generally owned equally by both spouses. Community property receives distinctive tax treatment, including eligibility for a basis adjustment on both halves at the first spouse’s death.',
  },
  {
    term: 'Conservatorship',
    definition:
      'A court proceeding appointing someone to manage the affairs of a person who can no longer manage their own. Incapacity documents like powers of attorney and funded trusts are commonly used to avoid the need for one.',
  },
  {
    term: 'Durable power of attorney',
    definition:
      'A document naming an agent to handle financial and legal matters on someone’s behalf. "Durable" means it remains effective if the person becomes incapacitated.',
  },
  {
    term: 'Estate tax exemption',
    definition:
      'The amount a person can transfer at death (combined with taxable lifetime gifts) before federal estate tax applies — $15 million per person as of 2026, indexed for inflation. California currently has no separate state estate tax.',
  },
  {
    term: 'Executor (personal representative)',
    definition:
      'The person named in a will to carry out its instructions through the probate process — gathering assets, paying debts and taxes, and distributing what remains.',
  },
  {
    term: 'Fiduciary',
    definition:
      'A person who holds a legal duty to act in someone else’s best interest — trustees, executors, and agents under powers of attorney are all fiduciaries.',
  },
  {
    term: 'Form 706, 709, and 1041',
    definition:
      'The principal federal tax returns in estate work: Form 706 (estate tax return, also used to elect portability), Form 709 (gift tax return for reportable lifetime gifts), and Form 1041 (income tax return for trusts and estates).',
  },
  {
    term: 'Funding (a trust)',
    definition:
      'The process of formally connecting assets to a trust — retitling accounts and real estate, assigning business interests, and aligning beneficiary designations — so the trust’s instructions actually govern the property. A trust generally controls only what it holds.',
  },
  {
    term: 'Grantor (settlor, trustor)',
    definition: 'The person who creates a trust and transfers assets into it.',
  },
  {
    term: 'Heir',
    definition:
      'A person entitled to inherit under state law when someone dies without a valid will (or outside of one). Used loosely, anyone who inherits.',
  },
  {
    term: 'Intestate',
    definition:
      'Dying without a valid will. State law then determines who inherits, through a formula that may not match what the person would have wanted.',
  },
  {
    term: 'Irrevocable trust',
    definition:
      'A trust that generally cannot be changed or revoked after creation (or that becomes unchangeable at a defined event, such as the grantor’s death). Used for a range of tax, asset protection, and control purposes that depend heavily on individual circumstances.',
  },
  {
    term: 'Living trust (revocable trust)',
    definition:
      'A trust created during life that the grantor can change or revoke while living and able. Commonly used to avoid probate, manage assets during incapacity, and control how beneficiaries receive assets. It generally does not, by itself, reduce estate taxes or shield assets from the grantor’s creditors.',
  },
  {
    term: 'Pour-over will',
    definition:
      'A will used alongside a living trust that directs any assets left outside the trust at death to be transferred ("poured over") into it — usually through probate, which is why it functions as a safety net rather than the plan itself.',
  },
  {
    term: 'Probate',
    definition:
      'The court-supervised process of validating a will, paying debts, and distributing a deceased person’s property. In California it is public, commonly takes a year or more, and involves statutory fees based on the gross value of the estate. Simplified procedures exist for smaller estates.',
  },
  {
    term: 'Portability',
    definition:
      'A surviving spouse’s ability to use a deceased spouse’s unused federal estate tax exemption — preserved only by filing an estate tax return and making the election within the deadline.',
  },
  {
    term: 'Prop 13 / Prop 19 (California)',
    definition:
      'Proposition 13 limits California property tax to the assessed value at acquisition plus capped annual increases. Proposition 19 (effective 2021) narrowed the parent-child reassessment exclusion to family homes occupied by the child (with a value cap) and expanded the ability of homeowners 55+ to move their tax base within the state.',
  },
  {
    term: 'Successor trustee',
    definition:
      'The person or institution that takes over management of a trust when the original trustee dies or becomes unable to serve — a working fiduciary role with real duties, not an honorary title.',
  },
  {
    term: 'Trust administration',
    definition:
      'The process of carrying out a trust’s instructions, especially after a death: notices, inventories, valuations, debts, tax filings, and distributions. Typically guided by an attorney advising the trustee, with a tax professional handling the filings.',
  },
  {
    term: 'Trustee',
    definition:
      'The person or institution legally responsible for managing trust assets according to the trust’s instructions and in the beneficiaries’ interest.',
  },
  {
    term: 'Unauthorized practice of law (UPL)',
    definition:
      'Performing services that only licensed attorneys may perform — such as drafting legal documents for others or giving legal advice about a specific situation. Non-attorney professionals (including CPAs) work within defined boundaries: education, tax, and coordination are permitted; legal advice and drafting are not.',
  },
]
