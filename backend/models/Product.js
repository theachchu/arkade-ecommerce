const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['apparel', 'footwear', 'accessories', 'gear'],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    emoji: {
      type: String,
      default: '📦',
    },
    badge: {
      type: String,
      enum: ['NEW', 'HOT', null],
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Product', productSchema);
