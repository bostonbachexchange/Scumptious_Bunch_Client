import React from 'react';
import { useState } from 'react'
import ServiceForm from '../shared/ServiceForm';
import { createService } from '../../api/services';
import { useNavigate } from 'react-router-dom';
import messages from '../shared/AutoDismissAlert/messages'

const CreateService = (props) => {
    const navigate = useNavigate()
    const { user, msgAlert } = props
    // in unit 2, we assigned the user through the session
    // in this unit, we assign the user through the Token!
    console.log('these are the props in CreateService \n', props)
    const [service, setService] = useState({
        name: '',
        type: '',
        description: '',
        location: '',
        rate: '',
    })
    console.log('this is service in createService', service)

    return (
        <div>
            
        </div>
    );
}

export default CreateService;
