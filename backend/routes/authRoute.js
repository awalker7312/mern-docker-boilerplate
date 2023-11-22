const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

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

    // If the user is authenticated, generate a JWT token
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
    });

    // Send a successful response with the generated token and user information
    res.status(200).json({
        status: "success",
        token,
        user,
    });
});

module.exports = router;
