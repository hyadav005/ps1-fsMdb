const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:12027/products', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("DB Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
