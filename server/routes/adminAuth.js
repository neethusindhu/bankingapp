
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register admin
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login admin
// router.post('/login', async (req, res) => {
//     console.log('Login attempt:', req.body); // Log login attempt details
//   const { email, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin || !(await admin.comparePassword(password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.post('/login', async (req, res) => {
    console.log('Login attempt:', req.body); // Log login attempt details
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        console.log('Admin not found');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      if (!(await admin.comparePassword(password))) {
        console.log('Password does not match');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Token generated:', token); // Log generated token
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error); // Log error for debugging
      res.status(500).json({ error: 'Server error' });
    }
  });
  


module.exports = router;
