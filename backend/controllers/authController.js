const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/auth");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    const { username, email, password, role } = req.body; // include role
    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashed = await hashPassword(password);
        const user = await User.create({
            username, email, password: hashed,role: role || "user", // allow override if admin is passed
        });

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            id: user.id, username: user.username,
            email: user.email, role: user.role, token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    async function login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                id: user.id, username: user.username, email: user.email,
                role: user.role, token,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

module.exports = { register, login };