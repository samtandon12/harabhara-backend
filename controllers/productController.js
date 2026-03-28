const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
const addProduct = async (req, res) => {
  try {
    const { name, sizes, image, category, inStock } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Product name is required' });
    }

    if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: 'At least one size is required' });
    }

    const product = new Product({
      name,
      sizes,
      image,
      category,
      inStock
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sizes, image, category, inStock } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (sizes && Array.isArray(sizes)) updateData.sizes = sizes;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (inStock !== undefined) updateData.inStock = inStock;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
