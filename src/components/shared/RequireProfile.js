import { Navigate } from 'react-router-dom'

export default function RequireFreelancer({ user, children }) {

	return user.profile !== ''  && user ? children : <Navigate to='/' replace />
}
