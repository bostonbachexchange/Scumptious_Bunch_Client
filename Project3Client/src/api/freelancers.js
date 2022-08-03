import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllFreelancers = () => {
    return axios(`${apiUrl}/freelancers`)
}

// READ => SHOW
export const getOneFreelancer = (id) => {
    return axios(`${apiUrl}/freelancers/${id}`)
}