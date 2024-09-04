const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  isDisabled: { type: Boolean, default: false },
});
// Add an index to email for faster queries
userSchema.index({ email: 1 });

// Ensure to add timestamps for createdAt and updatedAt
userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);
