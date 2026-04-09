const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const helmet = require('helmet');

// Import your existing controllers (adjust paths as needed)
const otpController = require('../../backend/src/controllers/otpController');
const authController = require('../../backend/src/controllers/authController');
const companyController = require('../../backend/src/controllers/companyController');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'https://bochaberi-suite.netlify.app',
  credentials: true
}));
app.use(express.json());

// ========== PUBLIC ROUTES ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/auth/send-login-otp', otpController.sendLoginOTP);
app.post('/api/auth/verify-login-otp', otpController.verifyLoginOTP);
app.post('/api/auth/send-registration-otp', otpController.sendRegistrationOTP);
app.post('/api/auth/verify-registration-otp', otpController.verifyRegistrationOTP);
app.post('/api/auth/resend-otp', otpController.resendOTP);
app.post('/api/auth/login', authController.login);
app.post('/api/companies/register', companyController.registerCompany);

// ========== PROTECTED ROUTES ==========
// Add your protected routes here...

exports.handler = serverless(app);