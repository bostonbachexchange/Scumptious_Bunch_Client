import React from 'react';
import { useState } from 'react'
import ProfileForm from '../shared/ProfileForm';
import { createProfile } from '../../api/profiles';
import { useParams, useNavigate } from 'react-router-dom';
import messages from '../shared/AutoDismissAlert/messages'

const CreateProfile = (props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, setUser, msgAlert } = props
    console.log(id)
    // console.log('these are the props in CreateService \n', props)
    const [profile, setProfile] = useState({ // this is the state for our form
        aboutMe: '',
        phone: '',
        image: '',
    })
    // console.log('this is service in createService', service)
    // this will handle typing in the form!
    const handleChange = (e) => {
        setProfile(prevProfile => {
         //setUser(prevProfile => {
            let updatedValue = e.target.value;
            const updatedName = e.target.name;
            // console.log('this is the input type', e.target.type)
            if (e.target.type === 'number') {
                // this is looking at the input type and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }
            const updatedProfile = {
                [updatedName]: updatedValue
            }
            return {
                // we can spread out the previous object
                ...prevProfile, 
                // AND the new one!
                // this will overwrite the stuff that changes in the previous state WHILE STILL keeping the new stuff!
                ...updatedProfile
            }
        })
    }
    // we'll add a handleSubmit function here that makes an API request that handles the response
    const handleSubmit = (e) => {
        e.preventDefault();
        // we want it to hit the createService function
        // console.log('handle submit running')
        createProfile(user, profile)
        // api call
            .then(() => setProfile(profile))
        // if successful, navigate to the show page for the new pet
            .then((res) => { 
                // console.log('here is the response', res)
                navigate(`/profile`)
                // navigate(`/profile/${res.data.user.id}`)
            })
        // send a success message to the user
            .then(() =>
                msgAlert({
                    heading: 'Create Profile Success',
                    message: messages.createProfileSuccess,
                    variant: 'success',
                })
            )
            .catch(msgAlert({
                heading: 'Create Profile Error',
                message: messages.createProfileFailure,
                variant: 'danger',
            }))
    }
    return (
        <>
            <ProfileForm 
                profile={ profile } 
                handleChange={ handleChange } 
                heading="Add a New Profile"
                handleSubmit={ handleSubmit }
            />
        </>
    );
}

export default CreateProfile;
