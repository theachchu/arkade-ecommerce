const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const getProducts = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.search) {
    filter.name = { $regex: req.query.search, $options: 'i' };
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, countInStock, emoji, badge } = req.body;

  if (!name || !description || price === undefined || !category) {
    res.status(400);
    throw new Error('Missing required product fields');
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    countInStock: countInStock ?? 0,
    emoji,
    badge,
  });

  res.status(201).json(product);
});

module.exports = { getProducts, getProductById, createProduct };
