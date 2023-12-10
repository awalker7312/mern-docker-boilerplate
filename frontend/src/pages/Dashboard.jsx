// Import necessary libraries and components
import {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// Import Material UI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import GitHubIcon from '@mui/icons-material/GitHub';
// Import custom components
import AuthApi from '../contexts/Auth';

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

// Dashboard Component
function Dashboard() {
	const {user, setUser, setAuth} = useContext(AuthApi);
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// Send cookies with every request
	axios.defaults.withCredentials = true;

	const handleLogout = async () => {
		try {
			// Send a request to the logout endpoint
			await axios.get('/api/user/logout');

			// Clear user data from context
			setUser(null);
			setAuth(false);

			// Redirect to the login page
			navigate('/signin');
		} catch (error) {
			console.error('Failed to log out', error);
		}
	};

	const handleAdminSettings = async () => {
		try {
			const response = await axios.get('/api/user/admin');
			if (response.status === 200) alert(response.data.message, 'success');
		} catch (error) {
			console.error('Failed to get admin settings');
		}
	};

	// Render the dashboard
	return (
		<>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}>
				<Toolbar sx={{flexWrap: 'wrap'}}>
					<Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
						MERN-DOCKER-BOILERPLATE
					</Typography>
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ml: 2}}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}>
							<Avatar sx={{width: 32, height: 32, fontSize: '0.875rem'}}>
								{user.firstName.charAt(0)}
								{user.lastName.charAt(0)}
							</Avatar>
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1
								},
								'&:before': {
									content: '""',
									display: 'block',
									position: 'absolute',
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0
								}
							}
						}}
						transformOrigin={{horizontal: 'right', vertical: 'top'}}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
						<MenuItem onClick={handleClose}>
							<Avatar />
							My Profile
						</MenuItem>
						<Divider />
						{user && user.role === 'admin' && (
							<MenuItem onClick={handleAdminSettings}>
								<ListItemIcon>
									<Settings fontSize="small" />
								</ListItemIcon>
								Admin Settings
							</MenuItem>
						)}
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<Container
				disableGutters
				maxWidth="md"
				component="main"
				sx={{pt: 8, pb: 6}}>
				{user && (
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom>
						Welcome {user.firstName}!
					</Typography>
				)}
				<Typography
					variant="h5"
					align="center"
					color="text.secondary"
					component="p">
					This project is a showcase of authentication using the MERN stack
					(MongoDB, Express.js, React.js, and Node.js) within a Docker
					environment. It demonstrates the ability to create secure and scalable
					applications using containerization and modern web technologies.
				</Typography>
				<GitHubLink />
			</Container>
		</>
	);
}

export default Dashboard;
