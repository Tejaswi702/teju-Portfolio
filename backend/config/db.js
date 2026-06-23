const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.log("MongoDB Error ❌", error.message);
  }
};

module.exports = connectDB;