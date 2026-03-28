const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { name, phone, address, items, total } = req.body;

    // Save or update user
    let user = await User.findOne({ phone });

    if (user) {
      user.name = name || user.name;
      user.address = address || user.address;
      await user.save();
    } else {
      user = new User({ phone, name, address });
      await user.save();
    }

    // Create order
    const order = new Order({
      name,
      phone,
      address,
      items,
      total
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder };
