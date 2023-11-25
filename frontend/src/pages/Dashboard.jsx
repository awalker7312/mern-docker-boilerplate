// Import necessary libraries and components
import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import Material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// Import custom components
import AuthApi from "../utils/Auth-Api";

// Dashboard Component
function Dashboard() {
    const { user, setUser, setAuth } = useContext(AuthApi);
    const navigate = useNavigate();

    // Send cookies with every request
    axios.defaults.withCredentials = true;

    const handleLogout = async () => {
        try {
            // Send a request to the logout endpoint
            await axios.get("/api/user/logout");

            // Clear user data from context
            setUser(null);
            setAuth(false);

            // Redirect to the login page
            navigate("/signin");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    // Render the dashboard
    return (
        <>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        MERN-DOCKER-BOILERPLATE
                    </Typography>
                    <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                {user && (
                    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                        Welcome {user.firstName}!
                    </Typography>
                )}
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    This project is a showcase of authentication using the MERN stack (MongoDB, Express.js, React.js,
                    and Node.js) within a Docker environment. It demonstrates the ability to create secure and scalable
                    applications using containerization and modern web technologies.
                </Typography>
            </Container>
        </>
    );
}

export default Dashboard;
