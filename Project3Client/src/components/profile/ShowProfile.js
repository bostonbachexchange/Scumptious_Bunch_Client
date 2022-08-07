import React from 'react';
import { 
    Container,
    Card,
    Button 
} from 'react-bootstrap';
import LoadingScreen from '../shared/LoadingScreen';
// import service API functions
import { updateProfile, getOneProfile, removeProfile } from '../../api/profiles';
// this will allow us to set our params
import { 
    useParams,
    useNavigate 
} from 'react-router-dom';
// useNav will allow us to navigate to a specific page
// for error messages
import messages from '../shared/AutoDismissAlert/messages'
import { 
    useState, 
    useEffect 
} from 'react'
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
    // console.log('user in props', user)
    console.log('setUser in props', setUser)
    useEffect(() => {
        console.log('we reset profile to this user', props.user.profile)
        setProfile(props.user.profile)
    }, [])
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
        return <>profile has not been set</>
    }
    
    return (
        <>
            <Container className='fluid'>
                <Card>
                    <Card.Header><img src={ profile.image }/></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>About Me: { profile.aboutMe }</small></div>
                            <div><small>Phone: { profile.phone }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
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
                setUser = {setUser}
                setProfile={setProfile}
                profile = {profile}
                show = {editModalShow}
                updateProfile = {updateProfile}
                msgAlert = {msgAlert}
                triggerRefresh  = {() => setUpdated(prev => !prev)}
                handleClose = {() => setEditModalShow((false))}
            />
        </>
    );
}

export default ShowProfiles
