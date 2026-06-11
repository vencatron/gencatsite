import { Link } from 'react-router-dom'
import Seo from '@/components/common/Seo'
import CtaSection from '@/components/common/CtaSection'
import { GLOSSARY_TERMS } from '@/data/glossary'

const GlossaryPage = () => {
  return (
    <div>
      <Seo
        title="Estate Planning Glossary | Learn | Generation Catalyst"
        description="Plain-language definitions of estate planning terms — trusts, probate, basis, funding, fiduciaries, and more. General education, not legal definitions or advice."
        path="/learn/glossary"
      />

      <section className="bg-gradient-to-b from-primary-50 to-neutral-50 border-b border-neutral-200">
        <div className="container-width section-padding">
          <div className="max-w-3xl">
            <Link to="/learn" className="text-sm font-medium text-accent-700 hover:text-accent-800">
              ← All topics
            </Link>
            <h1 className="heading-lg mt-4 mb-5">Glossary</h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              The vocabulary of estate planning, defined in plain language. These are general
              educational definitions, not legal definitions — terms can carry specific meanings
              under state law that only a licensed attorney can apply to your situation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width">
          <dl className="max-w-3xl space-y-8">
            {GLOSSARY_TERMS.map((entry) => (
              <div key={entry.term} className="border-b border-neutral-200 pb-8">
                <dt className="font-serif text-xl font-semibold text-primary-900 mb-2">
                  {entry.term}
                </dt>
                <dd className="text-neutral-700 leading-relaxed">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}

export default GlossaryPage
