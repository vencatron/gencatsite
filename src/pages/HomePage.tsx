import { motion } from 'framer-motion'
import Hero from '@/components/sections/HeroCentered'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Pricing from '@/components/sections/Pricing'
import Contact from '@/components/sections/Contact'

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <About />
      <Pricing />
      <Contact />
    </motion.div>
  )
}

export default HomePage
