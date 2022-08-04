import React from 'react';
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'

// service model fields:
// name, type, description, location, rate

const ServiceForm = (props) => {
    const { service, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor='Name'>Service Name</Form.Label>
                <Form.Control 
                    name="name" 
                    id="Name" 
                    type="text" 
                    placeholder="Enter Service Name"
                    value={ service.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor='type'>Service Type</Form.Label>
                <Form.Control 
                    name="type" 
                    id="type" 
                    type="text" 
                    placeholder="Enter Service Type"
                    value={ service.type }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor='description'>Service Description</Form.Label>
                <Form.Control 
                    name="description" 
                    id="description" 
                    type="text" 
                    placeholder="Enter Service Description"
                    value={ service.description }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor='location'>Service Location</Form.Label>
                <Form.Control 
                    name="location" 
                    id="location" 
                    type="text" 
                    placeholder="Enter Service Location"
                    value={ service.location }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor='rate'>Service Rate</Form.Label>
                <Form.Control 
                    name="rate" 
                    id="rate" 
                    type="number" 
                    placeholder="Enter Service Rate"
                    value={ service.rate }
                    onChange={ handleChange }
                />
                <Button 
                    variant="primary" 
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default ServiceForm;
