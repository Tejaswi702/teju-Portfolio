require("dotenv").config();
const mongoose = require("mongoose");
const Portfolio = require("./models/Portfolio");
const defaultData = require("./config/defaultData");

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding... 🔌");

    // Clean up existing portfolio data
    await Portfolio.deleteMany({});
    console.log("Cleared existing portfolio collection 🗑️");

    // Create new portfolio document
    const portfolio = new Portfolio(defaultData);
    await portfolio.save();

    console.log("-----------------------------------------");
    console.log("Successfully seeded default portfolio data! ✅");
    console.log("-----------------------------------------");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding portfolio database:", error.message);
    process.exit(1);
  }
};

seed();
