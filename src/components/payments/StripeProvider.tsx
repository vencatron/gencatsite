import { useEffect, useState, ReactNode } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

interface StripeProviderProps {
  children: ReactNode
}

let stripePromise: Promise<Stripe | null> | null = null

const getStripe = async () => {
  if (!stripePromise) {
    // Fetch publishable key from backend
    try {
      const response = await fetch('/api/payments/config')
      const data = await response.json()
      if (data.publishableKey) {
        stripePromise = loadStripe(data.publishableKey)
      }
    } catch (error) {
      console.error('Failed to load Stripe config:', error)
    }
  }
  return stripePromise
}

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStripe().then((stripeInstance) => {
      setStripe(stripeInstance)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!stripe) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        Unable to load payment system. Please try again later.
      </div>
    )
  }

  return (
    <Elements stripe={stripe}>
      {children}
    </Elements>
  )
}

export default StripeProvider
