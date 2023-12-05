// Import necessary libraries and components
import {useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// Import Material UI components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// Import custom components
import AuthApi from '../utils/Auth-Api.jsx';

// Copied from https://mui.com/getting-started/templates/sign-up/
// and modified to work with our backend

// Copyright Component
function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://alanwalker.dev/">
				Alan Walker
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function SignUp() {
	// Use context to get authApi
	const authApi = useContext(AuthApi);

	// Use navigate for routing
	const navigate = useNavigate();

	// Set axios defaults
	axios.defaults.withCredentials = true;

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();

		// Convert form data to JSON
		const data = new FormData(event.currentTarget);
		const json = Object.fromEntries(data.entries());

		// Post the form data to the register endpoint
		axios
			.post('/api/user/register', json)
			.then((response) => {
				// If the user was created successfully, set auth and user then redirect to the dashboard
				if (response.data.user) {
					authApi.setAuth(true);
					authApi.setUser(response.data.user);
					navigate('/dashboard');
				} else {
					// If the user was not created successfully, redirect to the signup page
					navigate('/signup');
				}
			})
			.catch((error) => {
				// Handle errors
				if (error.response && error.response.status === 400) {
					// Handle 400 error here
					alert(error.response.data.error);
				} else {
					// Handle other errors here
					console.error(error);
				}
			});
	};

	// Return the signup form
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}>
				<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{mt: 5}} />
		</Container>
	);
}
