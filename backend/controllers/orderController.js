const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }

  if (!shippingAddress || totalPrice === undefined) {
    res.status(400);
    throw new Error('Shipping address and total price are required');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (const item of orderItems) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }

      if (product.countInStock < item.qty) {
        const stockError = new Error(`${product.name} is out of stock`);
        stockError.statusCode = 400;
        throw stockError;
      }

      product.countInStock -= item.qty;
      await product.save({ session });
    }

    const [order] = await Order.create(
      [
        {
          user: req.user._id,
          orderItems,
          shippingAddress,
          totalPrice,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    res.status(error.statusCode || 400);
    throw new Error(error.message || 'Could not create order');
  } finally {
    session.endSession();
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['pending', 'processing', 'delivered'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

module.exports = { createOrder, getMyOrders, updateOrderStatus };
