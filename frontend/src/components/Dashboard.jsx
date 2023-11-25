import React from "react";
import Appbar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function Dashboard() {
    const userData = localStorage.getItem("user");
    if (!userData) {
        window.location.href = "/signin";
    }

    const user = JSON.parse(userData);

    return (
        <Appbar position="static">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Welcome {user.firstName}
                    </Typography>
                    <Button color="inherit" href="/logout">
                        Logout
                    </Button>
                </Toolbar>
            </Container>
        </Appbar>
    );
}

export default Dashboard;
