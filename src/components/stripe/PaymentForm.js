import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import messages from '../shared/AutoDismissAlert/messages'
// to redirect on success
import { useNavigate } from 'react-router-dom'
import { addServiceToUser} from '../../api/services'


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "fce883" },
            "::placeholder": { color: "#87bbfd"}
        },
        invalid: {
            iconColor: "ffc7ee",
            color: "ffc7ee"
        }
    }
}



export default function PaymentForm(props) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const { msgAlert, user, serviceRate, service } = props
    console.log('here is the user', user)
    // console.log(service.rate)
    const paymentAmount = 1000
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        }) 

    if(!error) {
        try {
            const { id } = paymentMethod
            const response = await axios.post('https://scrumptious-freelancr.herokuapp.com/payment', {
                amount: serviceRate,
                id
            })
            if(response.data.success) {
                console.log('Successful payment')
                setSuccess(true)
                msgAlert({
                    heading: 'Payment Success',
                    message: messages.makePaymentSuccess,
                    variant: 'success',
                })
                addServiceToUser(user,service._id)
                // also hit the patch route
            }
        } catch (error) {
            msgAlert({
                heading: 'Payment Error',
                message: messages.makePaymentFailure,
                variant: 'danger',
            })
        }
    
    } else {
        console.log(error.message)
    }
}
    return (
        <>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                    <div className='FormRow'>
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
        <div>
            <h2 className="paymentSuccess">Successfully paid and enrolled!</h2>
        </div>
        }
        </>
    )
}
