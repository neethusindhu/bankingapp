const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get user details
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user details' });
  }
};

// Get transaction history
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

// Handle deposits
exports.deposit = async (req, res) => {
  const { amount } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += amount;
    await user.save();

    const transaction = new Transaction({ userId: user._id, type: 'Deposit', amount });
    await transaction.save();

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'Error processing deposit' });
  }
};

// Handle withdrawals
exports.withdraw = async (req, res) => {
  const { amount } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({ userId: user._id, type: 'Withdrawal', amount });
    await transaction.save();

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'Error processing withdrawal' });
  }
};
