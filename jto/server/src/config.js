const dotenv = require("dotenv").config();

module.exports = {
  // If last .env var can be read, env variables are online
  //.................
  WORKING: process.env.WORKING || "offline",
  //.................
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET || "test-jwt-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "180d",
  APIS: {
    CLOUDINARY: {
      CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
  },
  REGEX: {
    VALID_USERNAME: /(^[A-Za-z0-9\-\_]+$)/,
    VALID_PWD: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/,
    HAS_SPACES: /^\S*$/,
    CARD_THEMES: /^\S*\b(cursive|cursive-plus|handwritten-bold|handwritten|indie|kiddo|pen|quill|roboto|sharpie|typed)\b/,
  },
};
