// Import necessary libraries and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App.jsx';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create default theme
const defaultTheme = createTheme();

// Render main app
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={defaultTheme}>
			<Router>
				<CssBaseline />
				<App />
			</Router>
		</ThemeProvider>
	</React.StrictMode>
);
