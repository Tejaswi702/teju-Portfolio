const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "portfolio_secret_key_123";

// Helper to auto-create a default admin if none exists
const checkDefaultAdmin = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      const defaultUser = new User({
        username: "admin",
        password: "adminpassword123" // Will be hashed automatically by pre-save middleware
      });
      await defaultUser.save();
      console.log("-----------------------------------------");
      console.log("Created default admin user: 👤");
      console.log("Username: admin");
      console.log("Password: adminpassword123");
      console.log("Please log in and change these credentials!");
      console.log("-----------------------------------------");
    }
  } catch (error) {
    console.error("Failed to check/create default admin:", error.message);
  }
};

// Run check
checkDefaultAdmin();

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token, message: "Logged in successfully! 🚀" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update credentials (secured endpoint)
router.post("/update-credentials", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const { newUsername, newPassword } = req.body;
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (newUsername) user.username = newUsername;
    if (newPassword) user.password = newPassword; // Will be hashed automatically

    await user.save();
    res.json({ message: "Credentials updated successfully! ✅" });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = { router, JWT_SECRET };
