const User = require("../models/userModel");

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ["id", "username", "email", "role"],
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateUserRole(req, res) {
    const { role } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.role = role;
        await user.save();
        res.json({ message: `User role updated to ${role}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getUsers, updateUserRole };