import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe, Appearance } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceId: number
  invoiceNumber: string
  amount: string
  onPaymentSuccess: () => void
}

export const PaymentModal = ({
  isOpen,
  onClose,
  invoiceId,
  invoiceNumber,
  amount,
  onPaymentSuccess,
}: PaymentModalProps) => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOpen) {
      setClientSecret(null)
      setError(null)
      setLoading(true)
      return
    }

    const initializePayment = async () => {
      try {
        setLoading(true)
        setError(null)

        // Load Stripe
        const configResponse = await fetch('/api/payments/config')
        const configData = await configResponse.json()
        
        if (!configData.publishableKey) {
          throw new Error('Stripe is not configured')
        }

        const stripeInstance = await loadStripe(configData.publishableKey)
        setStripe(stripeInstance)

        // Create payment intent
        const token = localStorage.getItem('portalAccessToken')
        const intentResponse = await fetch('/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ invoiceId }),
        })

        const intentData = await intentResponse.json()

        if (!intentResponse.ok) {
          throw new Error(intentData.error || 'Failed to create payment')
        }

        setClientSecret(intentData.clientSecret)
      } catch (err) {
        console.error('Payment initialization error:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize payment')
      } finally {
        setLoading(false)
      }
    }

    initializePayment()
  }, [isOpen, invoiceId])

  if (!isOpen) return null

  // Stripe Elements appearance
  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#b19373',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: '8px',
    },
  }

  const handleSuccess = () => {
    onPaymentSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Pay Invoice
            </h3>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-neutral-600">Loading payment form...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
                {error}
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 text-neutral-600 hover:text-neutral-900"
              >
                Close
              </button>
            </div>
          ) : stripe && clientSecret ? (
            <Elements
              stripe={stripe}
              options={{
                clientSecret,
                appearance,
              }}
            >
              <PaymentForm
                invoiceId={invoiceId}
                invoiceNumber={invoiceNumber}
                amount={amount}
                onSuccess={handleSuccess}
                onCancel={onClose}
              />
            </Elements>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
