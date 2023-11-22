const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
    // 1) Getting token and check if its there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "You are not logged in! Please log in to gain access." });
    }
    // 2) Verify token
    let decoded;
    try{
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token! Please log in again." });
    }
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.user_id);
    if (!currentUser) {
        return res.status(401).json({ message: "The logged in user no longer exists!" });
    }
    // Grant Access to protected route
    req.user = currentUser;
    next();
};
