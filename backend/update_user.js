require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.log("Usage: node update_user.js <new_username> <new_password>");
  process.exit(1);
}

const update = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";
    await mongoose.connect(mongoUri);
    
    // Find the existing admin user
    let user = await User.findOne();
    if (!user) {
      // If no user exists, create a new one
      user = new User({ username, password });
    } else {
      // Update the existing user
      user.username = username;
      user.password = password;
    }
    
    await user.save();
    console.log("-----------------------------------------");
    console.log("Successfully updated admin credentials! ✅");
    console.log(`Username set to: ${username}`);
    console.log("Password has been successfully hashed and saved.");
    console.log("-----------------------------------------");
    process.exit(0);
  } catch (error) {
    console.error("Error updating credentials:", error.message);
    process.exit(1);
  }
};

update();
