import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import ProfileForm from '../shared/ProfileForm';
import messages from '../shared/AutoDismissAlert/messages'
// import { updateProfile } from '../../api/profiles';

const EditProfileModal = (props) => {
    // console.log('here are the props in the EditServiceModal', props)
    // these props come from the parent component
    const { 
        user, 
        show, 
        handleClose, 
        updateProfile, 
        msgAlert, 
        triggerRefresh, 
        setUser,
        // profile,
    } = props
     const [profile, setProfile] = useState(props.profile)
    console.log('handleSubmit in edit modal', profile)
    const handleChange = (e) => {
        console.log('e.target', e.target.value)
        // we got this same function from create!
        setProfile(prevProfile => {
            let updatedValue = e.target.value;
            const updatedName = e.target.name;
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }
            const updatedProfile = {
                [updatedName]: updatedValue
            }
            return {
                ...prevProfile, 
                ...updatedProfile
            }
        })
    }
    const handleSubmit = (e) => {
        console.log('profile in edit module', profile)
        console.log('user in edit module', user)
        // this is where we put updatePet! We need (user, updateService)
        // once again, we get a similar function from createService component
        e.preventDefault();
        // we want it to hit the updateService function
        updateProfile(user, profile)
        
        // if we're successful in the modal, we want the modal to close
            // .then(() => setUser(setUser)) 
            // .then(() => setProfile(updatedProfile))
            .then(() => handleClose())
            .then(()=> triggerRefresh())
            .then(() =>
                msgAlert({
                    heading: 'Update Profile Success',
                    message: messages.updateProfileSuccess,
                    variant: 'success',
                })
            )
            // if successful, we need to trigger a refresh for the show page so we see the new information immediately
            // this refreshes the state of the service component to the updated information!
            // this tells the user about an error
            .catch(msgAlert({
                heading: 'Update Profile Error',
                message: messages.updateProfileFailure,
                variant: 'danger',
            }))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ProfileForm 
                    // setUser={setUser}
                    profile={profile}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Profile"
                />
            </Modal.Body>
        </Modal>
    );
}

export default EditProfileModal;
