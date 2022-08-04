import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import ServiceForm from '../shared/ServiceForm';
import messages from '../shared/AutoDismissAlert/messages'

const EditServiceModal = (props) => {
    // console.log('here are the props in the EditServiceModal', props)
    // these props come from the parent component
    const { 
        user, 
        show, 
        handleClose, 
        updateService, 
        msgAlert, 
        triggerRefresh, 
    } = props
    const [service, setService] = useState(props.service)
    // console.log('service in edit modal', service)
    const handleChange = (e) => {
        // we got this same function from create!
        setService(prevService => {
            let updatedValue = e.target.value;
            const updatedName = e.target.name;
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }
            const updatedService = {
                [updatedName]: updatedValue
            }
            return {
                ...prevService, 
                ...updatedService
            }
        })
    }
    const handleSubmit = (e) => {
        // this is where we put updatePet! We need (user, updateService)
        // once again, we get a similar function from createService component
        e.preventDefault();
        // we want it to hit the updateService function
        updateService(user, service)
        // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            .then(() =>
                msgAlert({
                    heading: 'Update Service Success',
                    message: messages.updateServiceSuccess,
                    variant: 'success',
                })
            )
            // if successful, we need to trigger a refresh for the show page so we see the new information immediately
            // this refreshes the state of the service component to the updated information!
            .then(()=> triggerRefresh())
            // this tells the user about an error
            .catch(msgAlert({
                heading: 'Update Service Error',
                message: messages.updateServiceFailure,
                variant: 'danger',
            }))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ServiceForm 
                    service={service}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Service"
                />
            </Modal.Body>
        </Modal>
    );
}

export default EditServiceModal;
