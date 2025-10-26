const User = require('../models/User');
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate & Send OTP
exports.sendOTP = async (req, res) => {
    const { phone } = req.body;

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP in database
        let user = await User.findOne({ phone });
        if (!user) {
            user = new User({ phone, otp });
        } else {
            user.otp = otp;
        }
        await user.save();

        // Send OTP via Twilio
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;

    try {
        const user = await User.findOne({ phone });
        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.isVerified = true;
        user.otp = null;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
