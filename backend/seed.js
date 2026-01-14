// seed.js
const { faker } = require("@faker-js/faker");
const Product = require("./models/productsModel");
const { sequelize } = require("./config/db");

(async () => {
    await sequelize.sync({ force: true }); // Reset DB
    console.log(" Seeding products...");

    for (let i = 0; i < 10; i++) {
        await Product.create({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            inStock: faker.datatype.boolean(),
            // Reliable Picsum Photos - unique image per product
            imageUrl: `https://picsum.photos/300/300?random=${i + 1}`,
        });
    }

    console.log(" Database seeded with fake products");
    process.exit();
})();
