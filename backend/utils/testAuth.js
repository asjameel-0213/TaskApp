const { hashPassword, comparePassword, generateToken, verifyToken } = require("./auth");

(async () => {
    const plain = "mypassword";
    // Test hashing
    
    const hash = await hashPassword(plain);
    console.log("Hashed password:", hash);

    // Test comparison
    const match = await comparePassword(plain, hash);
    console.log("Password match?", match);

    // Test JWT generation
    const token = generateToken({ id: 1, username: "Bob" });
    console.log("Generated token:", token);

    // Test JWT verification
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded);
})();