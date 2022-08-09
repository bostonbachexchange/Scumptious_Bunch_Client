import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row'>
                <div className='basicBackground' style={{border: "1px solid black", borderRadius: '10px', marginTop: "50px", width: "40%", textAlign: 'center'}}>
                    <h2 className='♠️'>Are you sure you want to sign out?</h2>
                    <small className='♠️'>We hate to see you go...</small><br/>
                    <ButtonGroup>
                        <Button variant='danger' onClick={onSignOut} style={{margin: "10px auto 10px auto", borderRadius: "10px", width: "auto", textAlign: 'center', justifyContent: 'center'}}>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel} style={{margin: "10px auto 10px auto", borderRadius: "10px", width: "auto", textAlign: 'center', justifyContent: 'center'}}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default SignOut
