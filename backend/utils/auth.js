const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "changeme-secret"; // Use .env in real projects
const JWT_EXPIRES_IN = "1h";

// Hash password
async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// Compare password
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Generate JWT
function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT
function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
};