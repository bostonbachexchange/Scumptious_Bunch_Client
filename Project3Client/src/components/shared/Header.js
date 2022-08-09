import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import RequireFreelancer from './RequireFreelancer'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const freelancerOptions = (
		<>
			<Nav.Item className="m-2">
				<Link to='services/create-service' style={linkStyle}>
					Create Service
				</Link>
			</Nav.Item>
		</>
)

const profileOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='services/create-service' style={linkStyle}>
				Create Service
			</Link>
		</Nav.Item>
	</>
)

const authenticatedOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='profile/create' style={linkStyle}>
			{/* <Link to='profile/:userId' style={linkStyle}> */}
				Add Profile
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='profile' style={linkStyle}>
				Show Profile
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="m-2">
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className="m-2">
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='/services/' style={linkStyle}>
				View All Services
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='dark' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                Freelancr
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
				{user && user.isFreelancer ? freelancerOptions : null}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
