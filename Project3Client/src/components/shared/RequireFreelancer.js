import { Navigate } from 'react-router-dom'

export default function RequireFreelancer({ user, children }) {

	return user.isFreelancer !== false ? children : <Navigate to='/' replace />
}
