const express = require('express');
const router = express.Router();
const { getUserByPhone, saveUser } = require('../controllers/userController');

// GET /api/users/:phone - Get user by phone
router.get('/:phone', getUserByPhone);

// POST /api/users - Save or update user
router.post('/', saveUser);

module.exports = router;
