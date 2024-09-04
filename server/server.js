

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const Transaction = require('./models/Transaction');
const User = require('./models/User');
const adminRoutes = require('./routes/admin');
const adminAuthRoutes = require('./routes/adminAuth'); // Import admin auth routes
const transactionRoutes = require('./routes/transactionRoutes');
const adminAuthMiddleware = require('./middleware/adminAuth');
require('dotenv').config();  // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const authMiddleware = require('./middleware/authMiddleware');
// const transactionRoutes = require('./routes/transactionRoutes');
// const adminAuthRoutes = require('./routes/adminAuth'); // Import admin auth routes

app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes); // Ensure user routes are also protected
app.use('/api/admin', adminAuthMiddleware, adminRoutes); // Admin routes
app.use('/api/admin/auth', adminAuthRoutes); // Admin auth routes

// Apply adminAuthMiddleware to admin routes
app.use('/api/admin', adminAuthMiddleware, adminRoutes); // Admin routes



app.get('/api/user', async (req, res) => {
  try {
    const userId = req.userId; // Use authenticated user's ID
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const userId = req.userId; // Use authenticated user's ID
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/transactions', async (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
