const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

exports.adminOnly = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });
    next();
};
