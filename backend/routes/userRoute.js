const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// Handling user registration endpoint
router.post("/register", async (req, res) => {
    try {
        // Extracting user information from the request body
        const { firstName, lastName, email, password, role } = req.body;

        // Hashing the user's password with bcrypt for security
        const hashedPassword = await bcrypt.hash(password, 12);

        // Creating a new user in the database with hashed password
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            // By default the role is a user if not specified
            role,
        });

        // Generating a JWT token for the newly registered user
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });

        // Sending a success response with the token and user information
        res.status(201).json({
            status: "success",
            token,
            user,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message,
        });
    }
});

router.get("/list", auth.protect, async (req, res) => {
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

module.exports = router;
