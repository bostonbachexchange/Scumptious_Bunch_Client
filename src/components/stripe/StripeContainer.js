import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = 'pk_test_51LTRITK06RXOssaSuz8mnqvs5eK7kKYHrz4CZteRgFQYmkWPcEVc4gfdRSTSPQyCAZt7YRy2IOJKikJbiic626Nh00VhCpKX7f'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
    const { user, msgAlert, serviceRate, service } = props
    console.log('here is the service rate', serviceRate)
    console.log('here is user', user)
    console.log('here is the service', service)
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm msgAlert = { msgAlert } user={user} serviceRate={serviceRate} service={service} />
        </Elements>
    )
}