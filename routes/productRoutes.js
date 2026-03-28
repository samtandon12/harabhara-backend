const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', getProducts);

// POST /api/products - Create a new product
router.post('/', addProduct);

// PUT /api/products/:id - Update a product by ID
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
