const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const auth = require("../util/auth");
const express = require("express");
const router = express.Router();

// Handling user registration endpoint
router.post("/register", async (req, res) => {
    try {
        // Extracting user information from the request body
        const { firstName, lastName, email, password, role } = req.body;
        
        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                error: "A user with this email already exists",
            });
        }

        // Hashing the user's password with bcrypt for security
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            // By default the role is a user if not specified
            role,
        };

        // Creating a new user in the database with hashed password
        const user = await User.create(newUser);

        req.session.user = { email: email, role: role, isLoggedIn: true };

        // Sending a success response with the token and user information
        res.status(201).json({
            status: "success",
            userId: user._id,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message,
        });
    }
});

router.get("/list", auth.isAuthenticated, async (req, res) => {
    try {
        const users = await User.find({}, { email: 1, _id: 0 });
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message,
        });
    }
});

router.post("/login", async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Query the database to find a user with the provided email
    const user = await User.findOne({ email });

    // Return a 404 status with an error message if the user is not found
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify the provided password against the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return a 400 status with an error message
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    // User is logged in successfully, create a session
    req.session.user = { email: email, role: user.role, isLoggedIn: true };

    // Send a successful response with the generated token and user information
    res.status(200).json({
        status: "success",
        userId: user._id,
    });
});

module.exports = router;
