import { Link } from 'react-router-dom'

interface CtaSectionProps {
  heading?: string
  text?: string
}

/** Booking CTA band used across pages and at the foot of every Learn article. */
const CtaSection = ({
  heading = 'Not sure where to start?',
  text = 'A Family Planning Conversation is a 90-minute structured session that orients your family on the process, identifies gaps, and produces a roadmap of the professionals you’ll need — before you spend a dollar on legal fees.',
}: CtaSectionProps) => {
  return (
    <section className="bg-primary-900">
      <div className="container-width py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="heading-md text-white mb-3">{heading}</h2>
            <p className="text-neutral-200 leading-relaxed">{text}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link to="/services/family-conversation" className="btn-secondary">
              How it works
            </Link>
            <Link to="/contact" className="btn-primary !bg-accent-500 hover:!bg-accent-600 !text-primary-950 font-semibold">
              Book a Family Planning Conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
