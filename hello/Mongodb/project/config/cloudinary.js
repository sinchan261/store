const cloudinary = require("cloudinary").v2;
require('dotenv').config(); // Load environment variables from .env file

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Loaded from environment
    api_key: process.env.CLOUDINARY_API_KEY,        // Loaded from environment
    api_secret: process.env.CLOUDINARY_API_SECRET,  // Loaded from environment
});

// Export the configured instance
module.exports = cloudinary;

