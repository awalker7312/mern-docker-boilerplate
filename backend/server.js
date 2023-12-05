const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
require('./config/database');

// Create an express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use(
	session({
		name: 'session',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, httpOnly: true },
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			collectionName: 'sessions'
		})
	})
);

// Set the port to the environment variable PORT or default to 3000
const port = process.env.PORT || 3000;

// Define the routes for the API
app.use('/user', require('./routes/userRoute'));

// Define a route for the root path that sends a simple health check response
app.get('/', (req, res) => {
	res.send('Backend server is up and running!');
});

// This will be executed if no previous route handlers matched the request
app.use((req, res) => {
	res.status(404).send('There is nothing to see here!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
	console.log(`app is running on port ${port}`);
});
