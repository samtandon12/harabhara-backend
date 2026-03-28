const User = require('../models/User');

// @desc    Get user by phone
// @route   GET /api/users/:phone
const getUserByPhone = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save or update user
// @route   POST /api/users
const saveUser = async (req, res) => {
  try {
    const { phone, name, address } = req.body;

    let user = await User.findOne({ phone });

    if (user) {
      // Update existing user
      user.name = name || user.name;
      user.address = address || user.address;
      const updatedUser = await user.save();
      return res.json(updatedUser);
    }

    // Create new user
    user = new User({ phone, name, address });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserByPhone, saveUser };
