// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'

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
        <Container>
            <div className='row' >
                <div className="🎒" style={{border: "1px solid blue", marginTop: "50px", width: "65%"}}>
                    <h3 className='♠️'><strong>Sign Up</strong></h3>
                    <hr></hr>
                    <Form onSubmit={onSignUp}>
                    <Form.Group controlId='name'>
                            <Form.Label className='♠️'>Username</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                name='name'
                                value={ credentials.name }
                                placeholder='Enter username'
                                onChange={ handleChange }
                            />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label className='♠️'>Email address</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                name='email'
                                value={ credentials.email }
                                placeholder='Enter email'
                                onChange={ handleChange }
                            />
                        </Form.Group>
                        <hr></hr>
                        <Form.Group controlId='isFreelancer'>
                            <Form.Check className='♠️'
                                label="Are You a Freelancer?" 
                                id="isFreelancer" 
                                name="isFreelancer"
                                onChange={ handleChange }
                            />
                        </Form.Group>
                        <hr></hr>
                        <Form.Group controlId='password'>
                            <Form.Label className='♠️'>Password</Form.Label>
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
                            <Form.Label className='♠️'>Password Confirmation</Form.Label>
                            <Form.Control
                                required
                                name='passwordConfirmation'
                                value={ credentials.passwordConfirmation}
                                type='password'
                                placeholder='Confirm Password'
                                onChange={ handleChange }
                            />
                        </Form.Group>
                        <hr></hr>
                        <Button variant='primary' type='submit' className='♠️' style={{margin: "10px auto 10px auto", borderRadius: "10px", width: "auto", textAlign: 'center', justifyContent: 'center'}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
            
    )

}

export default SignUp