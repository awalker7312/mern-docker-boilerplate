// Import necessary libraries and components
import {useContext, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// Import Material UI components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Alert from '@mui/material/Alert';
// Import custom components
import AuthApi from '../contexts/Auth';

// Copied from https://mui.com/getting-started/templates/sign-in-side/
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

// GitHubLink Component
function GitHubLink() {
	return (
		<IconButton
			href="https://github.com/awalker7312/mern-docker-boilerplate"
			target="_blank"
			rel="noopener noreferrer"
			color="primary"
			sx={{
				position: 'fixed',
				bottom: 5,
				right: 5,
				fontSize: '2rem'
			}}>
			<GitHubIcon fontSize="inherit" />
		</IconButton>
	);
}

// SignIn Component
export default function SignIn() {
	const authApi = useContext(AuthApi);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({email: '', password: ''});
	// Handle form validation errors
	const [error, setError] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	// Handle remember me checkbox
	const [rememberMe, setRememberMe] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();

	// Send cookies with every request
	axios.defaults.withCredentials = true;

	// Set focus on email input if no email is saved in local storage, otherwise set focus on password input
	useEffect(() => {
		const savedEmail = localStorage.getItem('email');
		if (savedEmail) {
			setFormData((prevState) => ({...prevState, email: savedEmail}));
			setRememberMe(true);
			passwordRef.current.focus();
		} else {
			emailRef.current.focus();
		}
	}, []);

	// Handle form input change
	const handleChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value
		}));
	};

	// Handle form validation. Return true if email is in a valid format and password is at least 8 characters long.
	const validateForm = () => {
		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email.trim())) {
			setEmailError('Please enter a valid email address.');
			formData.password = '';
			emailRef.current.select();
			emailRef.current.focus();
			return false;
		}

		// Validate password
		if (formData.password.length < 8) {
			setPasswordError('Password must be at least 8 characters long.');
			passwordRef.current.select();
			passwordRef.current.focus();
			return false;
		}

		return true;
	};

	// Handle form submission
	const handleSubmit = (event) => {
		// Prevent form from submitting if there are any validation errors
		if (!validateForm()) {
			event.preventDefault();
			return;
		}
		event.preventDefault();

		// Convert form data to JSON
		const data = new FormData(event.currentTarget);
		const json = Object.fromEntries(data.entries());

		if (rememberMe) {
			localStorage.setItem('email', json.email);
		} else {
			localStorage.removeItem('email');
		}

		// Post the form data to the login endpoint
		axios
			.post('/api/user/login', json)
			.then((response) => {
				if (response.status === 200) {
					authApi.setAuth(true);
					authApi.setUser(response.data.user);
					navigate('/', {replace: true});
				} else {
					navigate('/signin');
				}
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					// Handle 401 error here
					setError(error.response.data.message);
					// Clear the password field and set focus
					setFormData((prevState) => ({
						...prevState,
						password: ''
					}));
					setPasswordError(true);
					passwordRef.current.focus();
				} else {
					// Handle other errors here
					setError('An unexpected error occurred.');
				}
			});
	};

	// Return the sign in form
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
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
					{error && (
						<Alert severity="error" sx={{mt: 1, mb: 1}}>
							{error}
						</Alert>
					)}
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						inputRef={emailRef}
						value={formData.email}
						onChange={(e) => {
							handleChange(e);
							setEmailError(false);
						}}
						error={Boolean(emailError)}
						helperText={emailError}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						inputRef={passwordRef}
						value={formData.password}
						onChange={(e) => {
							handleChange(e);
							setPasswordError(false);
						}}
						error={Boolean(passwordError)}
						helperText={passwordError}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
								name="rememberMe"
								color="primary"
							/>
						}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}>
						Sign In
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{mt: 8, mb: 4}} />
			<GitHubLink />
		</Container>
	);
}
