// Import necessary libraries and components
import {Routes, Route, Navigate} from 'react-router-dom';
import {useContext} from 'react';
import AuthApi from '../contexts/Auth';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashBoard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

// Main AppRoutes component
function AppRoutes() {
	// Use context to get authApi
	const authApi = useContext(AuthApi);

	// Render routes
	return (
		<Routes>
			{/* If user is authenticated, redirect from root to dashboard, else to signin*/}
			<Route
				path="/"
				element={
					authApi.auth ? (
						<Navigate to="/dashboard" />
					) : (
						<Navigate to="/signin" />
					)
				}
			/>
			{/* If user is not authenticated, show signin page, else redirect to dashboard */}
			<Route
				path="/signin"
				element={!authApi.auth ? <SignIn /> : <Navigate to="/dashboard" />}
			/>
			{/* If user is not authenticated, show signup page, else redirect to dashboard */}
			<Route
				path="/signup"
				element={!authApi.auth ? <SignUp /> : <Navigate to="/dashboard" />}
			/>
			{/* If user is authenticated, show dashboard, else redirect to signin */}
			<Route
				path="/dashboard"
				element={authApi.auth ? <DashBoard /> : <Navigate to="/signin" />}
			/>
			{/* For all other routes, show NotFound component */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AppRoutes;
