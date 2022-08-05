import FreelancerIndex from "./freelancers/FreelancerIndex"
import ProfileForm from "../components/shared/ProfileForm"
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			<h2> - Welcome to Freelancr -</h2>
			<FreelancerIndex msgAlert={ msgAlert } />
		</>
	)
}

export default Home
