import apiUrl from "../apiConfig";
import axios from "axios";

// READ => SHOW
export const getOneProfile = (id) => {
    return axios(`${apiUrl}/profile/${id}`)
}

// CREATE
export const createProfile = (user, newProfile) => {
    console.log('createProfile in API was hit')
    // in our createProfile form, we're building an object
    // when we pass that object into the api createProfile function, it's going to look like the profile in our database
    // we're going to refer to this as newProfile
    console.log('this is user:', user)
    console.log('this is newProfile', newProfile)
	return axios({
		// POST /profile/<user_id>
		url: apiUrl + `/profile/${user.id}`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
        // since newProfile and profile have the same fields, we just have to do this!
		data: { profile: newProfile } ,
	})
}


// UPDATE
export const updateProfile = (user, updatedProfile) => {
    // console.log('updateProfile in API was hit')
    console.log('this is updated profile', updatedProfile)
	return axios({
		url: `${apiUrl}/updateProfile/`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
        // since newPet and pet have the same fields, we just have to do this!
		data: { profile: updatedProfile } ,
	})
}

// DELETE
export const removeProfile = (user) => {
    // 
    console.log('this is deleted service id')
	return axios({
		url: `${apiUrl}/profile}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}