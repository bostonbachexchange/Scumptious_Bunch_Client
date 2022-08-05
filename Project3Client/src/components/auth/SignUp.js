// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignUp = (props) => {
    const [name, setName] = useState('')
    const [isFreelancer, setIsFreelancer] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [credentials, setCredentials] = useState({
        name: '',
        isFreelancer: false,
        password: '',
        passwordConfirmation: ''
    });
    
    const navigate = useNavigate()
    console.log('credentials in Sign Up', credentials)
    ///////
    // handle change function goes here
    ///////
    const handleChange = (e) => {
        setCredentials(prevCred => {
            let updatedValue = e.target.value;
            const updatedName = e.target.name;

            console.log('this is the input type', e.target.type)

            // this handles the checkbox, changing on to true etc
            if (updatedName === "isFreelancer" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "isFreelancer" && !e.target.checked) {
                updatedValue = false
            }

            const updatedCredentials = {
                [updatedName]: updatedValue
            }
            return {
                ...prevCred,
                ...updatedCredentials
            }
        })
    }

    ///////

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

		signUp(credentials)
            .then(console.log(credentials))
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}
    
    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign Up</h3>
                <Form onSubmit={onSignUp}>
                <Form.Group controlId='name'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            name='name'
                            value={ credentials.name }
                            placeholder='Enter username'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group controlId='isFreelancer'>
                        <Form.Check
                            label="Are You a Freelancer?" 
                            id="isFreelancer" 
                            name="isFreelancer"
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={ credentials.email }
                            placeholder='Enter email'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={ credentials.password }
                            type='password'
                            placeholder='Password'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={ credentials.passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )

}

export default SignUp