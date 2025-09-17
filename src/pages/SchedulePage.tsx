import { motion } from 'framer-motion'
import Scheduler from '@/components/common/Scheduler'

const SchedulePage = () => {
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width py-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="badge-primary mb-3">Schedule Consultation</span>
            <h1 className="heading-xl mb-3">Book a 30‑Minute Call</h1>
            <p className="text-neutral-600">
              Pick a date and time that works for you. Well confirm by email and send a calendar invite.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width">
          <Scheduler />
        </div>
      </section>
    </motion.div>
  )
}

export default SchedulePage

