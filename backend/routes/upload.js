const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");

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

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Saves files directly into the frontend folder
    cb(null, path.join(__dirname, "../../frontend/"));
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "resume") {
      cb(null, "Tejaswi-resume.pdf");
    } else if (file.fieldname === "profile") {
      cb(null, "teju.png");
    }
  }
});

const upload = multer({ storage });

// Media upload endpoint (requires authentication)
router.post("/media", requireAuth, upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profile", maxCount: 1 }
]), (req, res) => {
  try {
    res.json({ message: "Files successfully uploaded! 🚀" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
