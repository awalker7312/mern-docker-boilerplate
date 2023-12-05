// Import necessary libraries and components
import {useState, useEffect} from 'react';
import axios from 'axios';
// Import Material UI components
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// Import custom components
import AppRoutes from './routes/App-Routes.jsx';
import AuthApi from './utils/Auth-Api.jsx';

// App Component
function App() {
	// Use state to store auth and user
	const [auth, setAuth] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [hasTimedOut, setHasTimedOut] = useState(false);

	// Send cookies with every request
	axios.defaults.withCredentials = true;

	// Check if the user is authenticated
	const checkAuth = async () => {
		try {
			const response = await axios.get('/api/user/session');
			if (response.data.user) {
				setUser(response.data.user);
				setAuth(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	// Check if the user is authenticated on component mount
	useEffect(() => {
		checkAuth();
	}, []);

	// Show loading screen if loading is true and error if loading takes too long
	useEffect(() => {
		let timer;
		if (loading) {
			timer = setTimeout(() => {
				setHasTimedOut(true);
			}, 5000); // 5 seconds
		} else {
			setHasTimedOut(false);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [loading]);

	if (loading) {
		if (hasTimedOut) {
			return (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh'
					}}>
					<ErrorOutlineIcon color="error" sx={{fontSize: 75, mb: 2}} />
					<Typography variant="h4" component="h4" gutterBottom>
						Error Contacting Server
					</Typography>
				</Box>
			);
		}

		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh'
				}}>
				<Typography variant="h4" component="h4" gutterBottom>
					Loading...
				</Typography>
				<CircularProgress />
			</Box>
		);
	}

	// Return the app
	return (
		<div className="wrapper">
			<AuthApi.Provider value={{auth, setAuth, user, setUser}}>
				<AppRoutes />
			</AuthApi.Provider>
		</div>
	);
}

export default App;
