import FreelancerIndex from "./freelancers/FreelancerIndex"
import ProfileForm from "../components/shared/ProfileForm"
import { Container } from "react-bootstrap"
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			<Container className="basicBackground">
				<h2 className="showProf"> - Welcome to Freelancr -</h2>
				<hr></hr>
				<FreelancerIndex msgAlert={ msgAlert } />
			</Container>
		</>
	)
}

export default Home
