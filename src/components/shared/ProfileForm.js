import React from 'react';
import {
    Form,
    Button,
    Container,
    Image
} from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// profile model fields:
// image, aboutMe, phone

const ProfileForm = (props) => {
    const { profile, handleChange, handleSubmit, heading } = props
    console.log('props.profile', props.profile)
    console.log('here are the props in ProfileForm', props)
    return (
        <Container className="justify-content-center basicBackground" style={{textAlign: "center"}}>
            <hr></hr>
            <h3 className='centerFontBuff'>{heading}</h3>
            <hr></hr>
            <Form onSubmit={handleSubmit}>
                {/* <Form.Label htmlFor='image'>Profile Image</Form.Label>
                <Form.Control 
                    name="image" 
                    id="image" 
                    type="text" 
                    placeholder="imageUrl"
                    value={ props.image }
                    onChange={ handleChange }
                /> */}
                <Row>
                    <Form.Label column="lg" lg={2} htmlFor='aboutMe' className="m-1.5"><strong>About Me:</strong></Form.Label>
                    <Col>
                        <Form.Control 
                            size='lg'
                            name="aboutMe" 
                            id="aboutMe" 
                            as="textarea" 
                            rows={2}
                            placeholder="Tell us about your self"
                            value={ props.aboutMe }
                            onChange={ handleChange }
                        />
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Form.Label column="lg" lg={2} htmlFor='phone' className="m-1.5"><strong>Phone: </strong></Form.Label>
                    <Col>
                        <Form.Control 
                            size="lg"
                            name="phone" 
                            id="phone" 
                            type="text" 
                            placeholder="555-555-5555"
                            value={ props.phone }
                            onChange={ handleChange }
                        />
                    </Col>
                </Row>
                <hr></hr>
                <h4 className="text-center m-3">Choose your avatar!</h4>
                <div className="avatarSelect text-center m-2" style={{width: "100%"}}>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/3v32ILx.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/3v32ILx.png" width="200px" alt="bunny" />
                    </Form.Label>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/mQDI1BF.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/mQDI1BF.png" width="200px" alt="lion" />
                    </Form.Label>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/NCUNWAp.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/NCUNWAp.png" width="200px" alt="cat" />
                    </Form.Label>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/8Lq6d0I.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/8Lq6d0I.png" width="200px" alt="dog" />
                    </Form.Label>
                </div>
                <div className="avatarSelect text-center" style={{width: "100%"}}>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/WJO9r5B.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/WJO9r5B.png" width="200px" alt="gorilla" />
                    </Form.Label>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/nZoOdxp.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/nZoOdxp.png" width="200px" alt="fox" />
                    </Form.Label>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/N1G6Nbk.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/N1G6Nbk.png" width="200px" alt="koala" />
                    </Form.Label>
                    <Form.Label htmlFor='image'>
                        <Form.Check 
                            type="radio"
                            id="image"
                            name="image"
                            value="https://i.imgur.com/HyANWIc.png" 
                            onChange={ handleChange }
                        />
                                <Image src="https://i.imgur.com/HyANWIc.png" width="200px" alt="tiger" />
                    </Form.Label>
                </div>
                <Button className='button'
                    variant="primary" 
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default ProfileForm;
