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
// import ShowProfile from './ShowProfile';
// import ShowProfiles from './ShowProfilez';
// hiding for later!
// import EditServiceModal from './EditPetModal';


const ShowProfiles = (props) => {
    const [profile, setProfile] = useState(null)
    // TODO: future promise for the edit service modal!
    // const [editModalShow, setEditModalShow] = useState(false) 
    // to let us know when to rerender!
    const [updated, setUpdated] = useState(false);
    let profileToShow;
    // destructuring to get the id value from our route params
    const { user, msgAlert } = props;
    const { id } = useParams()
    const navigate = useNavigate()
    // useNav returns a function
    // we can call that function to redirect the user wherever we want to
    console.log('here are props', props)
    console.log('here is the id from useParams', user._id)
    console.log('the profile in props', profile)
    console.log('user in props', user)
    useEffect(() => {
        getOneProfile(user._id)
            .then(res => setProfile(res.data.user.profile))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Profile',
                    body: messages.getProfilesFailure,
                    variant: 'danger',
                })
                // navigate back to the home page if there's an error fetching
                // navigate('/');
            })
    }, [])
    // TODO: add updated to dependency array when we have edit modal
    // here we'll declare a function that runs which will remove the pet
    // this function's promise chain should send a message, and then go somewhere
    const removeTheProfile = () => {
        removeProfile(user, profile._id)
            // on success send a success message
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
        return <LoadingScreen />
    }
    
    return (
        <>
            <Container className='fluid'>
                <Card>
                    <Card.Header>{ profile.image }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Type: { profile.aboutMe }</small></div>
                            <div><small>Rate: { profile.phone }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            // service.owner && user && service.owner._id === user._id ? 
                                <>
                                    {/* <Button 
                                        onClick={() => setEditModalShow(true)} 
                                        className="m-2" 
                                        variant="warning"
                                    >
                                        Edit Service
                                    </Button>  */}
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
            {/* <EditPetModal 
                user = {user}
                pet = {pet}
                show = {editModalShow}
                updatePet = {updatePet}
                msgAlert = {msgAlert}
                triggerRefresh  = {() => setUpdated(prev => !prev)}
                handleClose = {() => setEditModalShow((false))}
            /> */}
        </>
    );
}

export default ShowProfiles
