const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// OTP endpoint
app.post('/api/auth/send-login-otp', (req, res) => {
  res.json({ success: true, code: '123456', message: 'Test OTP' });
});

// Catch all for debugging
app.use('*', (req, res) => {
  res.json({ path: req.originalUrl, method: req.method });
});

exports.handler = serverless(app);