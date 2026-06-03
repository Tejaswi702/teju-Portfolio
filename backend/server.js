const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoute = require("./routes/contact");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/contact", contactRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});