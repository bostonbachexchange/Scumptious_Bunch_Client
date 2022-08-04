import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneFreelancer } from '../../api/freelancers'
import messages from '../shared/AutoDismissAlert/messages'

// import ShowToy from '../toys/ShowToy'

// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowFreelancer = (props) => {
    const [freelancer, setFreelancer] = useState(null)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the freelancer in showPet', freelancer)
    // destructuring to get the id value from our route parameters
    console.log(id)
    useEffect(() => {
        console.log('get one freelancers')
        getOneFreelancer(id)
            .then(res => {
                console.log('HAYDEN READ HERE', res.data.user)
                setFreelancer(res.data.user)
            })
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting pet',
                    message: messages.getFreelancersFailure,
                    variant: 'danger'
                })
                // navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // let freelancerCards
    // if (freelancer) {
    //     if (freelancer.toys.length > 0) {
    //         toyCards = pet.toys.map(toy => (
    //             <ShowToy 
    //                 key={toy._id}
    //                 toy={toy}
    //                 pet={pet}
    //                 user={user}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    //     }
    // }

    if (!freelancer) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
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
                            )}
                            
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </Container>
            {/* NEED TO DO THIS BUT WITH SERVICES <Container style={cardContainerLayout}>
                {toyCards}
            </Container> */}
        </>
    )
}

export default ShowFreelancer