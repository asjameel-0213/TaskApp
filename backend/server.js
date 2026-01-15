require("dotenv").config(); // Load environment variables

// Import necessary packages
const express = require("express");
const cors = require("cors");
const User = require("./models/userModel"); // Ensure model is imported
const authRoutes = require("./routes/authRoutes");
const { connectDB, sequelize } = require("./config/db");
const Product = require("./models/productsModel"); // Ensure model is imported
const apiRoutes = require("./routes/apiRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorhandler");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");


// Initialize the app
const app = express();
// Use port from .env or default to 8888
const PORT = process.env.PORT || 8888;
// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
// Routes
// Example route
app.get("/", (req, res) => {
    res.send("API is running and connected to PostgreSQL!");
});

// Mount API routes under /api
app.use("/api", apiRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// Error handling middleware (MUST come after all routes)
// 404 handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error); // Send to errorHandler
});
// Global error handler 
app.use(errorHandler);
// Connect and sync database
connectDB();
sequelize
.sync() // Automatically creates the tables if they do not exist
.then(() => console.log("✅ Tables synchronized"))
.catch((err) => console.error("❌ Sync failed:", err.message));

sequelize.sync({ alter: true })
.then(() => console.log("✅ Database synced with role field"))
.catch(err => console.error("❌ Sync failed:", err));
