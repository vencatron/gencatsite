import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const FamilyConversationPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  const whyItIsHard = [
    {
      title: 'Money carries weight',
      description:
        'In most families, talking openly about wealth — how much there is, who gets what, and why — has never been practiced. The silence runs deep, and the stakes feel high.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Mortality is uncomfortable',
      description:
        'Estate planning requires parents to acknowledge their own death plainly — in front of their children. That discomfort is real, and it causes many families to put the conversation off indefinitely.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h2m18 0h2M4.22 19.78l.707-.707M18.364 5.636l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ),
    },
    {
      title: 'Sibling dynamics resurface',
      description:
        'The moment distributions are discussed, old patterns emerge. Who did more. Who received more. Who was always the favorite. Without a neutral frame, a single conversation can reopen decades of grievances.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'No one knows how to start',
      description:
        'Most families want to have the conversation — they just do not know what to say first, or how to structure it so it stays productive. Without a format, good intentions stall before they begin.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  const whatIsCovered = [
    {
      topic: 'Values and intentions',
      detail:
        'What matters to you about how your estate is handled — not just the numbers, but the reasoning behind your choices.',
    },
    {
      topic: 'Distribution rationale',
      detail:
        'Why assets are being distributed the way they are. Explaining the "why" to children ahead of time prevents the shock and conflict that equal or unequal shares can create after death.',
    },
    {
      topic: 'Role assignments',
      detail:
        'Who is the executor, who is the trustee, and who holds power of attorney — and whether those people know the responsibility they are taking on.',
    },
    {
      topic: 'Care and incapacity wishes',
      detail:
        'What you want if you become unable to make decisions for yourself: healthcare preferences, living arrangements, and who you trust to make those calls.',
    },
    {
      topic: 'The family inventory',
      detail:
        'Where important documents live, what accounts exist, and who to contact — practical information that families almost never discuss until a crisis forces it.',
    },
    {
      topic: 'Questions and concerns',
      detail:
        'Space for adult children or other participants to ask what they have always wondered but never felt safe asking.',
    },
  ]

  const whoIsInTheRoom = [
    {
      group: 'The primary decision-makers',
      description:
        'The person or couple whose estate plan is the subject of the conversation. They set the agenda, share what they want to share, and define the purpose of the meeting.',
      include: true,
    },
    {
      group: 'Adult children (when ready)',
      description:
        'Including adult children creates transparency and dramatically reduces the likelihood of contested estates and family fractures. The key is that parents decide what to share and when — not the children.',
      include: true,
    },
    {
      group: 'Named fiduciaries',
      description:
        'Executors, trustees, and agents named in documents benefit from understanding the plan before they are called upon. Many have never been told what the role actually entails.',
      include: true,
    },
    {
      group: 'Spouses of adult children',
      description:
        'Sometimes yes, sometimes no. It depends on family dynamics and what the parents are comfortable disclosing. We help you think through this before the meeting — not during it.',
      include: null,
    },
    {
      group: 'Minor children',
      description:
        'Generally not included in the estate planning conversation. Separate age-appropriate discussions about financial values happen outside this format.',
      include: false,
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Pre-meeting intake',
      description:
        'You complete a short questionnaire about your family structure, existing documents, and what you want the conversation to accomplish. We use this to build an agenda that fits your situation — not a generic script.',
    },
    {
      step: '02',
      title: 'Agenda review',
      description:
        'Before any family members join, we walk through the agenda with the primary decision-maker. You confirm what will be covered, set boundaries, and feel prepared. Nothing surprises you in the room.',
    },
    {
      step: '03',
      title: 'The facilitated conversation',
      description:
        'A 90-minute structured meeting where we guide the discussion through each topic on the agenda. We keep things productive, redirect when tensions rise, and make sure everyone has the chance to be heard.',
    },
    {
      step: '04',
      title: 'Written follow-up',
      description:
        'Within one week you receive a written summary of what was covered, decisions made, and any open items. This document becomes a reference point for your attorney and for future family conversations.',
    },
  ]

  const outcomes = [
    {
      outcome: 'Reduced conflict after death',
      explanation:
        'Most estate disputes stem from surprise. When the people affected by a plan have heard the reasoning directly from the person who made it, the "why" is harder to contest.',
    },
    {
      outcome: 'Aligned expectations',
      explanation:
        'Adult children who know what to expect are not blindsided at the reading of a will. They have context, they have been heard, and they understand the plan was deliberate.',
    },
    {
      outcome: 'Better-functioning documents',
      explanation:
        'The conversation surfaces things attorneys never ask about: family dynamics, unstated assumptions, assets that exist outside the formal inventory. That information makes the legal documents more accurate.',
    },
    {
      outcome: 'Executor and trustee preparedness',
      explanation:
        'Named fiduciaries who understand their role before they need to exercise it are far more effective than those discovering responsibilities in the middle of grief.',
    },
    {
      outcome: 'Documented intentions',
      explanation:
        'The written summary creates a record of what was said and decided. For families navigating complex dynamics, having something in writing protects the integrity of the plan.',
    },
  ]

  const scenarios = [
    {
      label: 'The parents who waited too long to talk',
      story:
        'A couple in their mid-70s had a comprehensive trust in place for years. Their three adult children knew a trust existed but nothing else. After a health scare, they agreed it was time to have the conversation they had been avoiding. The facilitated meeting surfaced a significant misunderstanding — one child had assumed she would receive the family home, and that assumption had never been discussed. Addressing it while both parents were healthy made it resolvable. By the time they were not, it was already settled.',
    },
    {
      label: 'The blended family with a complicated structure',
      story:
        'A husband and wife each had children from prior relationships. The estate plan was carefully structured, but neither set of children understood what had been done or why. Without context, the design looked arbitrary and potentially unfair to each side. A facilitated conversation — held separately by family group — allowed each parent to explain their intentions directly. What could have become litigation after death became a shared understanding while there was still time.',
    },
    {
      label: 'The adult child who did not know she was the trustee',
      story:
        'A woman had been named successor trustee in her parents\' trust for years. She discovered this only when her father had a stroke. She had no preparation, no understanding of her legal duties, and no list of accounts or advisors. The family conversation we facilitate now includes a trustee orientation — so the person responsible understands what they are agreeing to before the moment of crisis arrives.',
    },
  ]

  const faqs = [
    {
      question: 'Does everyone in the family need to be in the same meeting?',
      answer:
        'Not necessarily. Some families prefer a single gathering with everyone present. Others do better with staged conversations — parents first, then separately with each child, then together. We design the approach around your family\'s specific dynamics, not a one-size-fits-all format.',
    },
    {
      question: 'What if we disagree during the conversation?',
      answer:
        'Disagreement is normal and often the point. The goal is not to eliminate conflict — it is to move it out of the estate administration process and into a space where it can be addressed while everyone is alive and capable. We are experienced at holding productive tension. Conversations that surface disagreement are often the most valuable.',
    },
    {
      question: 'Do we need to have our estate documents finalized before doing this?',
      answer:
        'No. In fact, many families have this conversation before or alongside the legal drafting process — it helps the documents reflect what actually matters. If documents already exist, the conversation ensures the people affected understand what they say.',
    },
    {
      question: 'What if our adult children do not want to participate?',
      answer:
        'That happens, and it is still worth doing. A conversation between the primary decision-makers alone — to align with each other, clarify their wishes, and identify gaps — produces real value even without the broader family present. Participation can be incremental.',
    },
    {
      question: 'Is this the same as family therapy?',
      answer:
        'No. We are not therapists, and this is not a therapeutic process. We are CPAs and estate planning coordinators facilitating a structured, agenda-driven conversation about plans, intentions, and roles. If significant family conflict exists that would benefit from professional mediation or therapy, we can help you identify the right resources.',
    },
  ]

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] w-full overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-primary-700/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-[60vh] items-center">
          <div className="container-width py-20">
            <div className="mx-auto max-w-3xl text-center">
              {/* Breadcrumb */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-200 transition-colors hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All services
                </Link>
              </motion.div>

              <motion.span
                className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-sm font-medium text-accent-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Family Coordination Service
              </motion.span>

              <motion.h1
                className="mb-6 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                The Conversation Your Family Needs to Have
              </motion.h1>

              <motion.p
                className="mb-8 text-lg leading-relaxed text-primary-100 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A structured, facilitated conversation that brings your family into alignment — sharing intentions, clarifying roles, and addressing the questions that estate plans leave unspoken.
              </motion.p>

              {/* Price badge */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 }}
              >
                <span className="text-3xl font-bold text-accent-300 sm:text-4xl">Fixed quote provided upfront</span>
                <span className="ml-2 text-sm text-primary-200">before any engagement begins</span>
              </motion.div>

              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Link
                  to="/schedule"
                  className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-800 transition-all hover:bg-primary-50 hover:shadow-lg"
                >
                  Schedule a Family Conversation
                </Link>
                <Link
                  to="/services"
                  className="rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Compare all services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why these conversations are hard */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mx-auto mb-12 max-w-3xl text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
              Why families avoid this conversation
            </h2>
            <p className="text-lg text-neutral-600">
              It is not lack of love. It is the weight of the subject, the absence of a safe format, and no clear place to begin.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {whyItIsHard.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="flex gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-neutral-900">{reason.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mx-auto mt-12 max-w-3xl rounded-2xl border-l-4 border-primary-500 bg-primary-50 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed text-primary-900">
              A neutral third party with a structured agenda changes the dynamic entirely. When someone outside the family is holding the format, parents can be candid without managing reactions. Children can ask questions without feeling like they are being greedy. The conversation happens because there is finally a safe container for it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is covered */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <motion.div {...fadeInUp}>
              <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
                What the conversation covers
              </h2>
              <p className="mb-8 text-lg text-neutral-600 leading-relaxed">
                Every family meeting is built around a custom agenda. The topics below are the most common — the ones that matter most and are most often left unaddressed.
              </p>

              <div className="space-y-4">
                {whatIsCovered.map((item, index) => (
                  <motion.div
                    key={item.topic}
                    className="flex gap-4 rounded-xl bg-white p-5 shadow-sm"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-neutral-900">{item.topic}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:sticky lg:top-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* Callout card */}
              <div className="rounded-2xl bg-primary-800 p-8 text-white">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold">This is not legal advice</h3>
                <p className="mb-4 text-primary-200 leading-relaxed">
                  We are CPAs and estate planning coordinators — not attorneys. The family conversation is an educational and coordination service. We do not tell you what documents to sign or how to structure your estate. That is your attorney's role.
                </p>
                <p className="text-primary-200 leading-relaxed">
                  What we do is make sure your family understands your intentions, your roles are filled by people who know what they agreed to, and your attorney gets better information to work with.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-accent-200 bg-accent-50 p-6">
                <p className="font-medium text-accent-800 mb-1">Who this is for</p>
                <p className="text-neutral-700 leading-relaxed">
                  Families who have — or are creating — an estate plan and want the people it affects to understand it. Whether you have a comprehensive trust or just a will in a drawer somewhere, the conversation adds value.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who should be in the room */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
              Who should be in the room
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              There is no single right answer — it depends on your family. Here is how we typically think about it.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {whoIsInTheRoom.map((person, index) => (
              <motion.div
                key={person.group}
                className={`flex gap-4 rounded-2xl border p-5 ${
                  person.include === true
                    ? 'border-primary-200 bg-primary-50'
                    : person.include === false
                    ? 'border-neutral-200 bg-neutral-50'
                    : 'border-accent-200 bg-accent-50'
                }`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="flex-shrink-0 pt-0.5">
                  {person.include === true && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {person.include === false && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-300">
                      <svg className="h-4 w-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  {person.include === null && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-400">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-neutral-900">{person.group}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{person.description}</p>
                  {person.include === null && (
                    <p className="mt-1.5 text-xs font-medium text-accent-700">Depends on the situation — we discuss this with you in advance</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Generation Catalyst facilitates */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
              How we facilitate
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              A structured process designed to make a difficult conversation feel manageable — and to produce something useful at the end of it.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative flex gap-6 pb-10 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Timeline connector */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-14 h-full w-px bg-primary-200" />
                )}
                {/* Step circle */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white shadow-sm">
                  {step.step}
                </div>
                <div className="pt-2">
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-8 shadow-sm border border-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">The neutral third party changes everything</h3>
                <p className="text-neutral-600 leading-relaxed">
                  When parents try to have this conversation on their own, it rarely lands the way they intend. Children read subtext that is not there. One parent qualifies what the other just said. A question from a sibling lands differently than the same question from a facilitator. Our role is to hold the structure so the family can focus on the substance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
              What changes after the conversation
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              The value is not in the meeting itself. It is in what the meeting prevents.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item, index) => (
              <motion.div
                key={item.outcome}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">{item.outcome}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.explanation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios / Stories */}
      <section className="section-padding bg-primary-900">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-white sm:text-4xl">
              Families who had the conversation
            </h2>
            <p className="mx-auto max-w-2xl text-primary-200">
              These are composite scenarios — representative of the families we work with, not specific clients.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.label}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Quote mark */}
                <div className="mb-4 text-4xl font-serif text-primary-400 leading-none">"</div>
                <p className="text-primary-100 leading-relaxed mb-5 text-sm">
                  {scenario.story}
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-medium text-accent-300 uppercase tracking-wide">
                    {scenario.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeInUp}>
              <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
                Investment
              </h2>
              <p className="mb-6 text-lg text-neutral-600 leading-relaxed">
                The Family Planning Conversation is priced based on the complexity of your family situation and the scope of what we cover together.
              </p>
              <div className="mb-6 rounded-2xl bg-neutral-50 border border-neutral-200 p-6">
                <div className="mb-2 text-xl font-semibold text-primary-800">Fixed quote, provided upfront</div>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  You will receive a fixed quote after an initial conversation, before any engagement begins. No surprises.
                </p>
              </div>
              <Link
                to="/schedule"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-800 hover:shadow-lg"
              >
                Start the conversation
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral-900">90-minute structured facilitation</p>
                    <p className="text-sm text-neutral-500">Agenda designed around your specific family and goals</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral-900">Pre-meeting intake and agenda review</p>
                    <p className="text-sm text-neutral-500">You know exactly what will be covered before the meeting begins</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral-900">Written summary delivered within one week</p>
                    <p className="text-sm text-neutral-500">A reference document for your attorney and your family</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-neutral-900">Fixed quote before engagement begins</p>
                    <p className="text-sm text-neutral-500">No open-ended billing. You agree to a price before any work starts.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-neutral-50">
        <div className="container-width">
          <motion.div className="mb-12 text-center" {...fadeInUp}>
            <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Common questions about how the family conversation works.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-neutral-200 last:border-b-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="pr-4 text-lg font-medium text-neutral-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-neutral-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="pb-5 text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="container-width py-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-serif text-3xl font-bold sm:text-4xl">
              Ready to have the conversation?
            </h2>
            <p className="mb-8 text-lg text-primary-100 leading-relaxed">
              The best time to do this is while everyone is healthy, unhurried, and at the table by choice. Schedule a brief call and we will design the right format for your family.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/schedule"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-800 transition-all hover:bg-primary-50 hover:shadow-lg"
              >
                Schedule a Family Conversation
              </Link>
              <Link
                to="/services"
                className="rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                View all services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default FamilyConversationPage
