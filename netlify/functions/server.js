const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/auth/send-login-otp', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Test OTP endpoint working',
    code: '123456'
  });
});

// Catch-all for debugging
app.use('*', (req, res) => {
  res.json({ 
    message: 'Function is running', 
    path: req.originalUrl,
    method: req.method
  });
});

exports.handler = serverless(app);