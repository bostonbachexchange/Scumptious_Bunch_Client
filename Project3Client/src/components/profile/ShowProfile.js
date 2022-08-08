import React from 'react';
import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import LoadingScreen from '../shared/LoadingScreen';
// import service API functions
import { updateProfile, createProfile, getOneProfile, removeProfile } from '../../api/profiles';
// this will allow us to set our params
import { 
    useParams,
    useNavigate,
    Link 
} from 'react-router-dom';
// useNav will allow us to navigate to a specific page
// for error messages
import messages from '../shared/AutoDismissAlert/messages'
// useNav will allow us to navigate to a specific page
// for error messages
import EditProfileModal from './EditProfileModal'

// hiding for later!

const ShowProfiles = (props) => {
    const [profile, setProfile] = useState(null)
    // TODO: future promise for the edit service modal!
    const [editModalShow, setEditModalShow] = useState(false) 
    // to let us know when to rerender!
    const [updated, setUpdated] = useState(false);
    let profileToShow;
    // destructuring to get the id value from our route params
    const { user, setUser, msgAlert } = props;
    const { id } = useParams()
    const navigate = useNavigate()
    // useNav returns a function
    // we can call that function to redirect the user wherever we want to
    // console.log('here are props', props)
    // console.log('here is the user id from useParams', user._id)
    console.log('user in props', user)
    // console.log('setUser in props', setUser)

    useEffect(() => {
        console.log('id', props.user._id)
        getOneProfile(props.user._id)
            .then(res => setProfile(res.data.profile))
            .then(res => console.log("res from getOneProfile", res))
        // console.log('we reset profile to this user', profile)
            .catch(err => {
                msgAlert({
                    heading: 'Error getting profile',
                    message: messages.getProfilesFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [updated])

    // useEffect(() => {
    //     console.log('we reset profile to this user', props.user.profile)
    //     setProfile(props.user.profile)
    // }, [updated])

    // TODO: add updated to dependency array when we have edit modal
    // here we'll declare a function that runs which will remove the pet
    // this function's promise chain should send a message, and then go somewhere

    const removeTheProfile = () => {
        // console.log('profile to delete', profile)
        removeProfile(user)
            .then(() => setProfile(null))
            // on success send a success message
            // setProfile(null)
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
    
    return (
        <>
            <Container className='fluid' width="600px">
                <Card>
                    <Card.Header>{props.user.name}'s Profile</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><img src={ profile.image } width="200px" /></div>
                            <div><small>About Me: { profile.aboutMe }</small></div>
                            <div><small>Phone: { profile.phone }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        {
                            // service.owner && user && service.owner._id === user._id ? 
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
                                // :
                                // null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditProfileModal 
                user = {user}
                // setUser = {setUser}
                profile = {profile}
                show = {editModalShow}
                // setProfile={setProfile}
                // createProfile = {createProfile}
                updateProfile = {updateProfile}
                msgAlert = {msgAlert}
                triggerRefresh = {() => setUpdated(prev => !prev)}
                handleClose = {() => setEditModalShow((false))}
            />
        </>
    );
}

export default ShowProfiles
