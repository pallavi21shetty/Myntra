// routes/product.js
const express = require('express');
const { auth } = require('../middleware/auth');
const Product = require('../models/product');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create Product
router.post('/create', [
  auth, // Ensure the user is authenticated
  check('name').not().isEmpty().withMessage('Product name is required'),
  check('description').not().isEmpty().withMessage('Product description is required'),
  check('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  check('category').not().isEmpty().withMessage('Category is required'),
  check('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], handleValidationErrors, async (req, res) => {
  const { name, description, price, category, stock, imageUrl } = req.body;
  const user = req.user;

  // Check if the user is a staff member
  if (user.userType !== 'staff') {
    return res.status(403).send('Access forbidden: Staff only');
  }

  try {
    const newProduct = new Product({ name, description, price, category, stock, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get Single Product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Update Product by ID
router.put('/:id', [
  auth, // Ensure the user is authenticated
  check('name').optional().not().isEmpty().withMessage('Product name is required'),
  check('description').optional().not().isEmpty().withMessage('Product description is required'),
  check('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  check('category').optional().not().isEmpty().withMessage('Category is required'),
  check('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], handleValidationErrors, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, { name, description, price, category, stock, imageUrl }, { new: true, runValidators: true });
    if (!product) return res.status(404).send('Product not found');
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Product by ID
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).send('Product not found');
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
