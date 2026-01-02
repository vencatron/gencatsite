import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface TeamMember {
  name: string
  title: string
  initials: string
  color: string
  description: string
  specialties: string[]
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Mitchell',
    title: 'Founder & Senior Estate Planner',
    initials: 'SM',
    color: 'bg-primary-600',
    description:
      'With over 25 years of experience in estate planning, Sarah founded Generation Catalyst to provide families with comprehensive, compassionate guidance. Her expertise spans complex trust structures, multi-generational wealth transfer, and charitable giving strategies.',
    specialties: ['Complex Trust Structures', 'Wealth Transfer', 'Charitable Planning'],
  },
  {
    name: 'Michael Chen',
    title: 'Estate Planning Specialist',
    initials: 'MC',
    color: 'bg-secondary-600',
    description:
      'Michael brings specialized knowledge in business succession planning and asset protection. He works closely with business owners to ensure smooth transitions while minimizing tax implications and protecting family interests.',
    specialties: ['Business Succession', 'Asset Protection', 'Family Business Planning'],
  },
  {
    name: 'Jennifer Rodriguez',
    title: 'Client Relations Director',
    initials: 'JR',
    color: 'bg-accent-600',
    description:
      'Jennifer is our trust administration expert, guiding executors and trustees through the complexities of estate settlement. Her client-first approach ensures families receive the support they need during difficult transitions.',
    specialties: ['Trust Administration', 'Estate Settlement', 'Beneficiary Relations'],
  },
  {
    name: 'David Thompson',
    title: 'Tax Planning Specialist',
    initials: 'DT',
    color: 'bg-neutral-600',
    description:
      'David focuses on developing tax-efficient strategies that maximize wealth preservation. His deep understanding of federal and state tax laws helps clients minimize their estate tax burden while achieving their planning goals.',
    specialties: ['Tax-Efficient Strategies', 'Estate Tax Planning', 'Gift Tax Optimization'],
  },
]

const teamValues = [
  {
    title: 'Client-Centered Approach',
    description:
      'Every family is unique. We take the time to understand your specific circumstances, goals, and concerns before recommending any planning strategies.',
  },
  {
    title: 'Collaborative Expertise',
    description:
      'Our team works together, combining diverse specialties to provide comprehensive solutions that address all aspects of your estate plan.',
  },
  {
    title: 'Ongoing Partnership',
    description:
      'Estate planning is not a one-time event. We maintain lasting relationships with our clients, adapting plans as life circumstances change.',
  },
  {
    title: 'Clear Communication',
    description:
      'We explain complex legal and financial concepts in plain language, ensuring you understand every aspect of your estate plan.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const TeamPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-[46vh] min-h-[360px] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 via-neutral-900/60 to-primary-900/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Team</h1>
              <p className="text-neutral-100/90 text-lg max-w-2xl">
                Meet the experienced professionals dedicated to protecting your family's legacy
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Members Grid */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Experienced Professionals You Can Trust
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our team combines decades of experience in estate planning, tax strategy, and client
              service to deliver personalized solutions for every family.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar with initials */}
                  <div
                    className={`${member.color} w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white text-xl font-semibold">{member.initials}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900">{member.name}</h3>
                    <p className="text-primary-600 font-medium text-sm mb-3">{member.title}</p>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-block bg-neutral-100 text-neutral-700 text-xs px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Values Section */}
      <motion.section
        className="py-16 px-4 bg-neutral-50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-gradient mb-4">Our Approach</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We believe that exceptional estate planning requires more than technical
              expertise—it demands genuine care and commitment to each client's unique situation.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamValues.map((value) => (
              <motion.div
                key={value.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                variants={itemVariants}
              >
                <h3 className="font-semibold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-neutral-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-12 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
              Ready to Protect Your Family's Legacy?
            </h2>
            <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
              Schedule a complimentary consultation with our team to discuss your estate planning
              needs and discover how we can help secure your family's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="btn-primary inline-flex justify-center">
                Schedule a Consultation
              </Link>
              <Link
                to="/contact"
                className="btn-secondary inline-flex justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default TeamPage
