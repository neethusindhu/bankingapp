const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();


module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
//   const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"


  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
