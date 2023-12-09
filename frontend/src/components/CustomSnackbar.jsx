// CustomSnackbar.jsx
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const CustomSnackbar = ({open, handleClose, message, severity}) => {
	const [isOpen, setIsOpen] = React.useState(open);

	React.useEffect(() => {
		setIsOpen(open);
	}, [open]);

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsOpen(false);
		handleClose();
	};

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={6000}
			onClose={handleCloseSnackbar}>
			<Alert
				onClose={handleCloseSnackbar}
				severity={severity}
				sx={{width: '100%'}}>
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
