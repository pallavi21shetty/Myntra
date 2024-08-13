// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  userType: { 
    type: String, 
    enum: ['staff', 'admin', 'customer', 'vendor', 'delivery_partner'], 
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);
