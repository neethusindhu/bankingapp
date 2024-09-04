const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

mongoose.connect('mongodb://localhost:27017/bankingapp', { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  try {
    // Create a new user
    const user = new User({
      name: 'Shibin Mohan',
      email: 'shibin@gmail.com',
      password: '12345',
      balance: 22500,
    });
    await user.save();

    // Create a new transaction for the user
    const transaction = new Transaction({
      userId: user._id,
      type: 'deposit',
      amount: 55000,
    });
    await transaction.save();

    console.log('Data seeded');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
