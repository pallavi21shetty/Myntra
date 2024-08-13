const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { JWT_SECRET, EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = require('../config/config');
const { auth } = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register User
router.post('/register', [
  check('email').isEmail().withMessage('Enter a valid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], handleValidationErrors, async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login User
router.post('/login', [
  check('email').isEmail().withMessage('Enter a valid email address'),
  check('password').exists().withMessage('Password is required')
], handleValidationErrors, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Forgot Password
router.post('/forgot-password', [
  check('email').isEmail().withMessage('Enter a valid email address')
], handleValidationErrors, async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You can reset your password by clicking the following link: http://localhost:3000/reset-password?token=${token}`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).send('Error sending email');
      }
      res.send('Reset password email sent');
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Reset Password Route
router.post('/reset-password', auth, async (req, res) => {
    const { newPassword } = req.body;
    let user = req.user
  
    try {  
      // Hash the new password and save it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.send('Password has been reset');
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

// Protected Route Example
router.get('/profile', auth, async (req, res) => {
  try {
    const user = req.user; // user is added to req by authMiddleware
    res.json({
      email: user.email,
      // Add more user info if needed
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;