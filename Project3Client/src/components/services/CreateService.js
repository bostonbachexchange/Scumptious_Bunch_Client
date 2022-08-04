import React from 'react';
import { useState } from 'react'
import ServiceForm from '../shared/ServiceForm';
import { createService } from '../../api/services';
import { useNavigate } from 'react-router-dom';
import messages from '../shared/AutoDismissAlert/messages'

const CreateService = (props) => {
    const navigate = useNavigate()
    const { user, msgAlert } = props
    console.log('here is the user', user)
    console.log('here is the user token', user.token)
    // in unit 2, we assigned the user through the session
    // in this unit, we assign the user through the Token!
    // console.log('these are the props in CreateService \n', props)
    const [service, setService] = useState({
        name: '',
        type: '',
        description: '',
        location: '',
        rate: '',
    })
    // console.log('this is service in createService', service)
    // this will handle typing in the form!
    const handleChange = (e) => {
        setService(prevService => {
            let updatedValue = e.target.value;
            const updatedName = e.target.name;
            // console.log('this is the input type', e.target.type)
            if (e.target.type === 'number') {
                // this is looking at the input type and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }
            const updatedService = {
                [updatedName]: updatedValue
            }
            return {
                // we can spread out the previous object
                ...prevService, 
                // AND the new one!
                // this will overwrite the stuff that changes in the previous state WHILE STILL keeping the new stuff!
                ...updatedService
            }
        })
    }
    // we'll add a handleSubmit function here that makes an API request that handles the response
    const handleSubmit = (e) => {
        e.preventDefault();
        // we want it to hit the createService function
        console.log('handle submit running')
        createService(user, service)
        // if successful, navigate to the show page for the new pet
            .then((res) => { navigate(`/services/${res.data.service.id}`)})
        // send a success message to the user
            .then(() =>
                msgAlert({
                    heading: 'Create Service Success',
                    message: messages.createServiceSuccess,
                    variant: 'success',
                })
            )
            .catch(msgAlert({
                heading: 'Create Service Error',
                message: messages.createServiceFailure,
                variant: 'danger',
            }))
    }
    return (
        <>
            <ServiceForm 
                service={ service } 
                handleChange={ handleChange } 
                heading="Add a New Service"
                handleSubmit={ handleSubmit }
            />
        </>
    );
}

export default CreateService;
