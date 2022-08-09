import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <Container>
            <div className='row'>
                <div className='basicBackground' style={{border: "1px solid blue", marginTop: "50px", width: "65%", textAlign: 'center'}}>
                    <h3 className='♠️'>Sign In</h3>
                    <hr></hr>
                    <Form onSubmit={onSignIn}>
                        <Row>
                            <Form.Group controlId='email'>
                                <Form.Label className='♠️'>Email address</Form.Label>
                                <Form.Control
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    placeholder='Enter email'
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group controlId='password'>
                            <Form.Label className='♠️'>Password</Form.Label>
                            <Form.Control
                                required
                                name='password'
                                value={password}
                                type='password'
                                placeholder='Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit' style={{margin: "10px auto 10px auto", borderRadius: "10px", width: "auto", textAlign: 'center', justifyContent: 'center'}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default SignIn
