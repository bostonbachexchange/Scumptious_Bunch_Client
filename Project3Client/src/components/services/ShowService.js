import React from 'react';
import { 
    Container,
    Card,
    Button 
} from 'react-bootstrap';
import LoadingScreen from '../shared/LoadingScreen';
// import service API functions
import { updateService, getOneService, removeService } from '../../api/services';
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
import EditServiceModal from './EditServiceModal';


const ShowService = (props) => {
    const [service, setService] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false) 
    // to let us know when to rerender!
    const [updated, setUpdated] = useState(false);
    let serviceToShow;
    // destructuring to get the id value from our route params
    const { id } = useParams();
    const navigate = useNavigate()
    // useNav returns a function
    // we can call that function to redirect the user wherever we want to
    // console.log('here are props', props)
    // console.log('here is the id from useParams', id)
    const { user, msgAlert } = props;
    // console.log('the service in props', service)
    // console.log('user in props', user)
    useEffect(() => {
        getOneService(id)
            .then(res => setService(res.data.service))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting service',
                    body: messages.getServicesFailure,
                    variant: 'danger',
                })
                // navigate back to the home page if there's an error fetching
                navigate('/');
            })
    }, [updated])
    // TODO: add updated to dependency array when we have edit modal
    // here we'll declare a function that runs which will remove the pet
    // this function's promise chain should send a message, and then go somewhere
    const removeTheService = () => {
        removeService(user, service._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeServiceSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing service',
                    message: messages.removeServiceFailure,
                    variant: 'danger'
                })
            })
    }
    // If service hasn't been loaded yet, show a loading message
    if (!service) {
        return <LoadingScreen />
    }
    console.log('here is the service owner', service.owner)
    console.log('here is the current user id', user._id)
    return (
        <>
            <Container className='fluid'>
                <Card>
                    <Card.Header>{ service.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Type: { service.type }</small></div>
                            <div><small>Rate: { service.rate }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            service.owner === user._id ? 
                                <>
                                    <Button 
                                        onClick={() => setEditModalShow(true)} 
                                        className="m-2" 
                                        variant="warning"
                                    >
                                        Edit Service
                                    </Button> 
                                    <Button 
                                        onClick={() => removeTheService()} 
                                        className="m-2" 
                                        variant="danger"
                                    >
                                        Delete this Service
                                    </Button> 
                                </>
                                :
                                null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditServiceModal 
                user = {user}
                service = {service}
                show = {editModalShow}
                updateService = {updateService}
                msgAlert = {msgAlert}
                triggerRefresh  = {() => setUpdated(prev => !prev)}
                handleClose = {() => setEditModalShow((false))}
            />
        </>
    );
}

export default ShowService;
