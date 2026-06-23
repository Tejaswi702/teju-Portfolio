require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoute = require("./routes/contact");
const portfolioRoute = require("./routes/portfolio");
const authRoute = require("./routes/auth").router;
const uploadRoute = require("./routes/upload");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/contact", contactRoute);
app.use("/portfolio", portfolioRoute);
app.use("/auth", authRoute);
app.use("/upload", uploadRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});