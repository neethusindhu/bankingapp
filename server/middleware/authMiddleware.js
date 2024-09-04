// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//     try {
//   const token = req.headers.authorization?.split(' ')[1];
//   console.log('Token:', token); // Log token for debugging
//   if (!token) return res.status(401).json({ message: 'No token provided' });


//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded Token:', decoded); // Log decoded token for debugging

    
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };




// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token); // Log token for debugging

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log decoded token for debugging

    // Attach userId to the request object for further use
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Log error for debugging
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
