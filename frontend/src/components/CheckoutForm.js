import { PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },

      //redirect: 'if_required',
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    setIsProcessing(false)
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='mb-6'>
      <button
        disabled={isProcessing}
        id='submit'
        className='p-8 bg-green w-100'
      >
        <PaymentElement id='payment-element' className='mb-4' />
        <span
          id='button-text'
          className='text-white uppercase p-2.5 border rounded hover:bg-violet'
        >
          {isProcessing ? 'Processing ... ' : 'Zaplatiť'}
        </span>
      </button>

      {message && <div id='payment-message'>{message}</div>}
    </form>
  )
}