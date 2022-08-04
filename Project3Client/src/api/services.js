import apiUrl from "../apiConfig";
import axios from "axios";

// READ => INDEX
export const getAllServices = () => {
    return axios(`${apiUrl}/services`);
}

// READ => SHOW
export const getOneService = (id) => {
    return axios(`${apiUrl}/services/${id}`)
}

// CREATE

export const createService = (user, newService) => {
    console.log('createService in API was hit')
    // in our createService form, we're building an object
    // when we pass that object into the api createService function, it's going to look like the services in our database
    // we're going to refer to this as newService
    console.log('this is user:', user)
    console.log('this is newService', newService)
	return axios({
		url: apiUrl + '/services',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
        // since newService and service have the same fields, we just have to do this!
		data: { service: newService } ,
	})
}


// UPDATE
export const updateService = (user, updatedService) => {
    // console.log('createPet in API was hit')
    // in our createPet form, we're building an object
    // when we pass that object into the api createPet function, it's going to look like the pets in our database
    // we're going to refer to this as newPet
    console.log('this is updated service', updatedService)
	return axios({
		url: `${apiUrl}/services/${updatedService.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
        // since newPet and pet have the same fields, we just have to do this!
		data: { service: updatedService } ,
	})
}

// DELETE
export const removeService = (user, serviceId) => {
    // 
    console.log('this is deleted service id', serviceId)
	return axios({
		url: `${apiUrl}/services/${serviceId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}