import { useState, useEffect } from 'react'

import { useParams, useNavigate, Link } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getServicesByUser } from '../../api/freelancers'
import messages from '../shared/AutoDismissAlert/messages'


// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowFreelancer = (props) => {
    const [freelancer, setFreelancer] = useState(null)
    const [service, setService] = useState(null)
    let serviceToShow;
    // destructuring to get the id value from our route params
    const { id } = useParams();
    console.log('here is id', id)
    const navigate = useNavigate()
    const { user, msgAlert } = props;
    // this returns the services that we want to show (from the desired user/freelancer)
    useEffect(() => {
        getServicesByUser(id)
            // .then(res => console.log('here is res.data.services[0]', res.data.services[0]))
            .then(res => { setService(res.data.services[0])})
            .catch(err => {
                msgAlert({
                    heading: 'Error getting service',
                    body: messages.getServicesFailure,
                    variant: 'danger',
                })
                navigate('/');
            })
    }, [])
    console.log('here is service', service)
    // IDEALLY, this returns the desired user information that we want to show as well as the services
    // useEffect(() => {
    //     getServicesByUser(id)
    //         .then(res => {
    //             console.log('here is res.data.services[0]', res.data.services[0])
    //             // setFreelancer(res.data.service[0])
    //         })
    //         .catch(err => {                   
    //             msgAlert({
    //                 heading: 'Error getting freelancer',
    //                 message: messages.getFreelancersFailure,
    //                 variant: 'danger'
    //             })
    //             navigate('/')
    //         })
    // }, [])
    // console.log('here is the set freelancer', freelancer)
    if (!service) {
        return <LoadingScreen />
    }
    const freelancerServices = service.map(service => (
        <Card style={{ width: '30%', margin: 5}} key={ service.id }>
            <Card.Header>{ service.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <div><small>Type: { service.type }</small></div>
                    <div><small>Type: { service.description }</small></div>
                    <div><small>Type: { service.location }</small></div>
                    <div><small>Rate: ${ service.rate }</small></div>
                    <Link to={`/services/${service._id}`}>View { service.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))
    ////
    // console.log('here is the freelancer variable', freelancer)
    console.log('here is service[0] variable', service[0])

    return (
        <>
            <div>
                {/* <h2>Services By {freelancer.name}</h2>
                <h5>Email: {freelancer.email}</h5>  */}
                {/* { (freelancer.profile[0]) ? (
                                <div><small>
                                Bio: { freelancer.profile[0].aboutMe }
                                </small></div>
                                ) : (
                                    <p>user does not have a profile yet.</p>
                            )} */}
            </div>
            <Container className='fluid'>
                {freelancerServices}
            </Container>
        </>
    )
}



                {/* <Card>
                    <Card.Header>{ freelancer.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            { (freelancer.profile[0]) ? (<div><img src={ freelancer.lancer.profile[0].image }/></div>) : (<p>no profile pic yet</p>)}
                            <div><small>Name: { freelancer.name }</small></div>
                            <div><small>Email: { freelancer.email }</small></div>
                            { (freelancer.profile[0]) ? (
                                <div><small>
                                Bio: { freelancer.profile[0].aboutMe }
                                </small></div>
                                ) : (
                                    <p>user does not have a profile yet.</p>
                            )} */}


export default ShowFreelancer