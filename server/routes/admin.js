const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const adminAuth = require('../middleware/adminAuth');

router.get('/users', authenticate, adminAuth, adminController.getUsers);
router.patch('/users/:userId/disable', authenticate, adminAuth, adminController.disableUser);
router.get('/users/:userId', authenticate, adminAuth, adminController.getUserById); // View a specific user


module.exports = router;
