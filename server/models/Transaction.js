const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Add index to userId for faster queries
transactionSchema.index({ userId: 1 });

// Ensure to add timestamps for createdAt and updatedAt
transactionSchema.set('timestamps', true);

module.exports = mongoose.model('Transaction', transactionSchema);
