const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // Expecting "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // extract token after "Bearer"
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach decoded user payload (id, email, role) to request
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware