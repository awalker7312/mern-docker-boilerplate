exports.isAuthenticated = async (req, res, next) => {
    if (req.session.user && req.session.user.isLoggedIn === true) {
        next();
    } else {
        res.status(403).json({ message: "Access denied" });
    }
};

exports.isAdmin = async (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied" });
    }
};

exports.setSession = (req, user) => {
    req.session.user = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isLoggedIn: true,
    };
};
