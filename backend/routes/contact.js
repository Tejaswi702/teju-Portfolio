const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

/* Schema + Model inside same file */
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();

    res.status(200).json({
      success: true,
      message: "Message stored in MongoDB successfully ✅"
    });
  } catch (error) {
    console.error("Save Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save data ❌"
    });
  }
});

module.exports = router;