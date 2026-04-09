const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Your API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/auth/send-login-otp', (req, res) => {
  res.json({ success: true, message: 'OTP sent', code: '123456' });
});

// IMPORTANT: Export as a serverless function
exports.handler = serverless(app);