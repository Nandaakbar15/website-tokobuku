const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Sama dengan yang di login controller

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer <token>
    
    if (!token) {
        return res.status(403).json({
            statusCode: 403,
            message: "Access denied. No token provided!"
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Simpan data user ke req.user
        next();
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            message: "Invalid token!"
        });
    }
};

