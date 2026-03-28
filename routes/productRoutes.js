const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', getProducts);

// POST /api/products - Create a new product
router.post('/', addProduct);

module.exports = router;
