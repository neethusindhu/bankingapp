const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Import Admin model
require('dotenv').config();

// Middleware to check if the user is an admin
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decodedToken.adminId);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.isAdmin = true; // Set this flag if the user is an admin
    req.admin = admin; // Attach admin to request object for further use if needed

    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate token' });
  }
};
