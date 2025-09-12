import { useEffect, useRef } from 'react'
import { useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'

/**
 * Custom hook for scroll-triggered animations
 */
export const useScrollAnimation = () => {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  return { ref, controls, inView }
}

/**
 * Hook for staggered scroll animations
 */
export const useStaggerAnimation = (delay: number = 0.1) => {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref)

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: delay,
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

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return { ref, controls, variants, itemVariants }
}