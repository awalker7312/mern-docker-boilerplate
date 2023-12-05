import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
	const navigate = useNavigate();
	axios.defaults.withCredentials = true;

	useEffect(() => {
		// Check if there's a user in local storage
		if (localStorage.getItem('user')) {
			axios
				.post('/api/user/logout')
				.then(() => {
					// Remove user data from local storage
					localStorage.removeItem('user');
					// Navigate to sign-in page
					navigate('/signin');
				})
				.catch(() => {
					navigate('/signin');
				});
		} else {
			// If there's no user in local storage, just navigate to the sign-in page
			navigate('/signin');
		}
	}, [navigate]);

	// Render nothing
	return null;
}
