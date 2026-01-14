const express = require("express");
const router = express.Router();
const {
    getProducts, getProductById,
    createProduct, updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);
// Authenticated users can create/update
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
// Only admins can delete
router.delete("/:id", authMiddleware, requireRole("admin"), deleteProduct);
module.exports = router;