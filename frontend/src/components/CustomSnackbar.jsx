// CustomSnackbar.jsx
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const CustomSnackbar = ({open, handleClose, message, severity}) => {
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
				{message}
			</Alert>
		</Snackbar>
	);
};

CustomSnackbar.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired
};

export default CustomSnackbar;
