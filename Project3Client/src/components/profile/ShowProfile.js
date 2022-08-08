import React from 'react';
import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import LoadingScreen from '../shared/LoadingScreen';
// import service API functions
import { updateProfile, getOneProfile, removeProfile } from '../../api/profiles';
// this will allow us to set our params
import { useParams, useNavigate, Link } from 'react-router-dom';
// useNav will allow us to navigate to a specific page
// for error messages
import messages from '../shared/AutoDismissAlert/messages'
// useNav will allow us to navigate to a specific page
// for error messages
import EditProfileModal from './EditProfileModal'


const ShowProfiles = (props) => {
    const [profile, setProfile] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false) 
    // to let us know when to rerender!
    const [updated, setUpdated] = useState(false);
    // destructuring to get the id value from our route params
    const { user, setUser, msgAlert } = props;
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('user in props', user)

    useEffect(() => {
        console.log('id', props.user._id)
        getOneProfile(props.user._id)
            .then(res => setProfile(res.data.profile))
            .then(res => console.log("res from getOneProfile", res))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting profile',
                    message: messages.getProfilesFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [updated])

    const removeTheProfile = () => {
        removeProfile(user)
            .then(() => setProfile(null))
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeProfileSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing profile',
                    message: messages.removeProfileFailure,
                    variant: 'danger'
                })
            })
    }
    // If service hasn't been loaded yet, show a loading message
    if (!profile) {
        return (
            <>It looks like you haven't made a profile yet. Please make one <Link to={`/profile/create`}>here</Link>!
            </>
            
            )
    }
    // should we make a lookUpServicesById call to populate thru getOneService
    const enrolledServices = user.enrolledClasses.map(enrolledService => (
        <li><Link to={`/services/${enrolledService}`}>{enrolledService}</Link></li>
    ))
    return (
        <>
            <Container className='fluid profileCard' width="600px">
                <Card>
                    <Card.Header>{props.user.name}'s Profile</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div>
                                <img src={ profile.image } width="200px" />
                            </div>
                            <div>
                                <div><small>About Me: { profile.aboutMe }</small></div>
                                <div><small>Phone: { profile.phone }</small></div>
                                <div><small>Enrolled Services: 
                                    <ul>
                                    {enrolledServices}
                                    </ul> </small></div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        {
                                <>
                                    <Button 
                                        onClick={() => setEditModalShow(true)} 
                                        className="m-2" 
                                        variant="warning"
                                    >
                                        Edit Profile
                                    </Button> 
                                    <Button 
                                        onClick={() => removeTheProfile()} 
                                        className="m-2" 
                                        variant="danger"
                                    >
                                        Delete this Profile
                                    </Button> 
                                </>
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditProfileModal 
                user = {user}
                profile = {profile}
                show = {editModalShow}
                updateProfile = {updateProfile}
                msgAlert = {msgAlert}
                triggerRefresh = {() => setUpdated(prev => !prev)}
                handleClose = {() => setEditModalShow((false))}
            />
        </>
    );
}

export default ShowProfiles
