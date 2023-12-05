// Import React and useNavigate hook
import {useNavigate} from 'react-router-dom';
// Import Material UI components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NotFound() {
	// Use navigate hook
	const navigate = useNavigate();

	// Function to go back to the previous page
	const goBack = () => {
		navigate(-1);
	};

	// Render the NotFound page
	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					mt: 8,
					mb: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}>
				<Typography variant="h2" gutterBottom>
					404
				</Typography>
				<Typography variant="subtitle1" align="center">
					Sorry, the page you are looking for does not exist.
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={goBack}
					sx={{mt: 3}}>
					Go Back
				</Button>
			</Box>
		</Container>
	);
}

export default NotFound;
