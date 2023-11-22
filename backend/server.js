const express = require("express");

// Load environment variables from .env file
require("dotenv").config();

// Connect to the database
require("./config/database");

// Create an express application
const app = express();

// Set the port to the environment variable PORT or default to 3000
const port = process.env.PORT || 3000;

// Use express.json() middleware to parse incoming JSON requests
app.use(express.json());

// Define the routes for the API
app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));

// Define a route for the root path that sends a simple health check response
app.get("/", (req, res) => {
    res.send("Backend server is up and running!");
});

// This will be executed if no previous route handlers matched the request
app.use((req, res, next) => {
    res.status(404).send("There is nothing to see here!");
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
