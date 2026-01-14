// controllers/productController.js
const Product = require("../models/productsModel");
// @desc Get all products
// @route GET /api/products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error("Error in getProducts:", err.message); // For debugging
        next(err);
    }
};

// @desc Get a single product by ID
// @route GET /api/products/:id
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        console.error("Error in getProductById:", err.message); // For debugging
        next(err);
    }
};

// @desc Create a new product
// @route POST /api/products
exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, inStock, imageUrl } = req.body;
        const product = await Product.create({ name, price, inStock, imageUrl });
        res.status(201).json(product);
    } catch (err) {
        console.error("Error in createProduct:", err.message); // For debugging
        next(err);
    }
};

// @desc Update a product
// @route PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const { name, price, inStock, imageUrl } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.inStock = inStock ?? product.inStock;
        product.imageUrl = imageUrl ?? product.imageUrl;
        await product.save();
        res.json(product);
    } catch (err) {
        console.error("Error in updateProduct:", err.message); // For debugging
        next(err);
    }
};

// @desc Delete a product
// @route DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error in deleteProduct:", err.message); // For debugging
        next(err);
    }
};