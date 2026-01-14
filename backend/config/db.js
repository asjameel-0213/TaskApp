const { Sequelize } = require("sequelize");
// Load environment variables
require("dotenv").config();
// Create Sequelize instance
// Option 1: Using DATABASE_URL (recommended for Render)
const sequelize = process.env.DATABASE_URL ? new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false, // Disable SQL logs for cleaner output
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Render requires SSL
        },
    },
}) 
: // Option 2: Using individual environment variables (fallback)
    new Sequelize(
        process.env.DB_NAME, // Database name
        process.env.DB_USER, // Username
        process.env.DB_PASS, // Password
    {
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT || 5432,
        dialect: "postgres", // We are using PostgreSQL
        logging: false, // Disable SQL logs for cleaner output
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Render requires SSL
            },
        },
    }
);

// Function to test connection
const connectDB = async () => {
try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected!");
} catch (error) {
    console.error("❌ PostgreSQL Connection Failed:", error.message);
    process.exit(1);
    }
};

module.exports = { sequelize, connectDB };