const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, userController.getUser);
router.get('/transactions', authenticate, userController.getTransactions);
router.post('/deposit', authenticate, userController.deposit);
router.post('/withdraw', authenticate, userController.withdraw);

module.exports = router;
