const express = require("express");
const router = express.Router();
const { getUsers, updateUserRole } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// Only admins can view/update users
router.get("/", authMiddleware, requireRole("admin"), getUsers);
router.patch("/:id/role", authMiddleware, requireRole("admin"), updateUserRole);
module.exports = router;