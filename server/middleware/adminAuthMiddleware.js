const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Import Admin model

require('dotenv').config();

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token); // Log token for debugging
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log decoded token for debugging

    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return res.status(403).json({ message: 'Admin privileges required' });
    }

    req.isAdmin = true; // Indicate that the user is an admin
    req.admin = admin; // Attach admin to request object if needed

    next();
  } catch (error) {
    console.error('Token verification error:', error); // Log error for debugging
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminAuthMiddleware;
