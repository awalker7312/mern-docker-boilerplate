// Import necessary libraries and components
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import Material UI components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// Import custom components
import AuthApi from "../utils/Auth-Api.jsx";

// Copied from https://mui.com/getting-started/templates/sign-in-side/
// and modified to work with our backend

// Copyright Component
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="https://alanwalker.dev/">
                Alan Walker
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// SignIn Component
export default function SignIn() {
    const authApi = useContext(AuthApi);
    const navigate = useNavigate();

    // Handle remember me
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
            passwordRef.current.focus();
        } else {
            emailRef.current.focus();
        }
    }, []);

    // Send cookies with every request
    axios.defaults.withCredentials = true;

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Convert form data to JSON
        const data = new FormData(event.currentTarget);
        const json = Object.fromEntries(data.entries());

        if (rememberMe) {
            localStorage.setItem("email", json.email);
        } else {
            localStorage.removeItem("email");
        }

        // Post the form data to the login endpoint
        axios
            .post("/api/user/login", json)
            .then((response) => {
                if (response.status === 200) {
                    authApi.setAuth(true);
                    authApi.setUser(response.data.user);
                    navigate("/", { replace: true });
                } else {
                    navigate("/signin");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // Handle 401 error here
                    alert("Invalid Credentials");
                } else {
                    // Handle other errors here
                    console.error(error);
                }
            });
    };

    // Return the sign in form
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
