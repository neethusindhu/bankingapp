const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

router.use(authMiddleware); // Apply authMiddleware to all routes in this router



router.post('/', async (req, res) => {
  const { type, amount } = req.body;

  if (!type || !amount) {
    return res.status(400).json({ error: 'Type and amount are required' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (type === 'deposit') {
      user.balance += amount;
    } else if (type === 'withdrawal') {
      if (user.balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }
      user.balance -= amount;
    } else {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }

    await user.save();

    const transaction = new Transaction({
      userId: user._id,
      type,
      amount,
    });
    await transaction.save();

    res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
