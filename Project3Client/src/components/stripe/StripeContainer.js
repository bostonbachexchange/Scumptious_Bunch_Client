import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const PUBLIC_KEY = 'pk_test_51LTRITK06RXOssaSuz8mnqvs5eK7kKYHrz4CZteRgFQYmkWPcEVc4gfdRSTSPQyCAZt7YRy2IOJKikJbiic626Nh00VhCpKX7f'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}