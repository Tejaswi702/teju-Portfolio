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

// Endpoint to provide the reCAPTCHA sitekey to the frontend
router.get("/config", (req, res) => {
  res.json({
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY"
  });
});

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message, recaptchaToken } = req.body;

    const SECRET_KEY = process.env.RECAPTCHA_SECRET || "YOUR_RECAPTCHA_SECRET_KEY";

    // Only verify if a secret key is set and it is not the default placeholder
    if (SECRET_KEY && SECRET_KEY !== "YOUR_RECAPTCHA_SECRET_KEY") {
      if (!recaptchaToken) {
        return res.status(400).json({
          success: false,
          message: "reCAPTCHA verification token is missing ❌"
        });
      }

      const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
      const verificationResponse = await fetch(verifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${SECRET_KEY}&response=${recaptchaToken}`
      });

      const verification = await verificationResponse.json();

      if (!verification.success || verification.score < 0.5) {
        return res.status(400).json({
          success: false,
          message: "Spam detected or reCAPTCHA verification failed! ❌"
        });
      }
    }

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