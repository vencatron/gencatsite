import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

interface PaymentFormProps {
  invoiceId: number
  invoiceNumber: string
  amount: string
  onSuccess: () => void
  onCancel: () => void
}

export const PaymentForm = ({
  invoiceId,
  invoiceNumber,
  amount,
  onSuccess,
  onCancel,
}: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || 'An error occurred')
        setProcessing(false)
        return
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/client-portal/billing?payment=success&invoice=${invoiceId}`,
        },
        redirect: 'if_required',
      })

      if (confirmError) {
        setError(confirmError.message || 'Payment failed')
        setProcessing(false)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        const token = localStorage.getItem('portalAccessToken')
        await fetch('/api/payments/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            invoiceId,
          }),
        })

        onSuccess()
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Payment error:', err)
    }

    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-neutral-50 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <span className="text-neutral-600">Invoice</span>
          <span className="font-medium text-neutral-900">{invoiceNumber}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-neutral-600">Amount</span>
          <span className="text-lg font-semibold text-neutral-900">
            ${parseFloat(amount).toFixed(2)}
          </span>
        </div>
      </div>

      <PaymentElement 
        options={{
          layout: 'tabs',
        }}
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            `Pay $${parseFloat(amount).toFixed(2)}`
          )}
        </button>
      </div>

      <p className="text-xs text-neutral-500 text-center">
        Payments are securely processed by Stripe. Your card details are never stored on our servers.
      </p>
    </form>
  )
}

export default PaymentForm
