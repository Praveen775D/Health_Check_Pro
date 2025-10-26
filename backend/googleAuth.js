// Load environment variables
require('dotenv').config();

// Use environment variables instead of hardcoded secrets
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET };
