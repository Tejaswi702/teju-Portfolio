const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "portfolio_secret_key_123";

// Authentication middleware
const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized access - Token missing" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized access - Invalid token" });
  }
};

// Get portfolio data
router.get("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found. Run seed script first." });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update portfolio data
router.post("/", requireAuth, async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      {}, // Empty filter matching the first/only document
      req.body,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ message: "Portfolio updated successfully! ✅", data: updatedPortfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
