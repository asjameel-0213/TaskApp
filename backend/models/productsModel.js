const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define(
    "Product", // singular model name (table will be pluralized automatically)
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false, // Required field
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0, // Prevent negative prices
            },
        },
        inStock: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true, // Optional
            validate: {
            isUrl: true, // Ensure it's a valid URL format
            },
        },
    },

    {
        timestamps: true, // Adds createdAt and updatedAt
        tableName: "products", // explicitly set table name to control casing
    }
);

module.exports = Product;