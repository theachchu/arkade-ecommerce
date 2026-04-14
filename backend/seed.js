const Product = require('./models/Product');

const seedProducts = [
  {
    name: 'Varsity Tee',
    description: 'Heavyweight cotton tee with contrast stitching and embroidered logo. Garment-dyed for a worn-in look from day one.',
    price: 49.99,
    category: 'apparel',
    countInStock: 12,
    emoji: '👕',
    badge: 'NEW',
  },
  {
    name: 'Arc Shell Jacket',
    description: 'Windproof nylon shell with taped seams and a minimal silhouette. Goes from city to trail without missing a beat.',
    price: 189.99,
    category: 'apparel',
    countInStock: 6,
    emoji: '🧥',
    badge: 'HOT',
  },
  {
    name: 'Low Pro Sneaker',
    description: 'Clean vulcanised sole with premium suede upper. A blank canvas that goes with everything.',
    price: 129.0,
    category: 'footwear',
    countInStock: 8,
    emoji: '👟',
  },
  {
    name: 'Trail Hiker Boot',
    description: 'Full-grain leather with Vibram outsole. Waterproof membrane keeps you dry in all conditions.',
    price: 219.0,
    category: 'footwear',
    countInStock: 4,
    emoji: '🥾',
  },
  {
    name: 'Logo Cap',
    description: 'Unstructured 6-panel cap in washed cotton twill. Adjustable strap for a perfect fit every time.',
    price: 34.99,
    category: 'accessories',
    countInStock: 20,
    emoji: '🧢',
    badge: 'NEW',
  },
  {
    name: 'Utility Tote',
    description: 'Waxed canvas with leather reinforcements. Carries everything you need, looks good doing it.',
    price: 79.0,
    category: 'accessories',
    countInStock: 9,
    emoji: '👜',
  },
  {
    name: 'Cargo 30L Pack',
    description: 'Laptop sleeve, water bottle pocket, and padded harness. The only pack you will ever need.',
    price: 149.0,
    category: 'gear',
    countInStock: 5,
    emoji: '🎒',
  },
  {
    name: 'Neck Gaiter',
    description: 'Recycled polyester fleece. Versatile enough for mountain cold or urban commutes.',
    price: 24.99,
    category: 'accessories',
    countInStock: 25,
    emoji: '🧣',
  },
];

const seedProductsIfEmpty = async () => {
  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany(seedProducts);
    console.log('Products seeded');
  } else {
    console.log('Products already exist, skipping seed');
  }
};

module.exports = { seedProductsIfEmpty, seedProducts };
