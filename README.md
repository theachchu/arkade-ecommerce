# Arkade Backend Assessment

This is a complete Express + MongoDB backend for the Arkade e-commerce assessment, fully integrated with the provided frontend.

---

## Features

- User registration and login with JWT
- Password hashing using bcryptjs
- Product listing and single product retrieval
- Optional filtering by category and search
- Order creation for authenticated users
- Automatic stock reduction when orders are placed
- Protected routes using JWT authentication middleware
- Database seeding with sample products
- Admin endpoint to update order status (bonus)

---

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors

---

## Folder Structure

```bash
ARKADE/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── index.html
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

---

## Setup

### Install dependencies

```bash
cd backend
npm install
cp .env.example .env
```

Update the `.env` file with your MongoDB connection string and JWT secret.

---

## Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```
http://localhost:5001
```

> Port 5001 was used instead of 5000 because port 5000 was already in use during development.

---

### Start Frontend

Open a new terminal:

```bash
cd ..
serve
```

Frontend runs on:

```
http://localhost:3000
```

---

## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products (admin only)

Optional filters:

- ?category=apparel  
- ?search=tee  

### Orders

- POST /api/orders (protected)
- GET /api/orders/myorders (protected)
- PATCH /api/orders/:id/status (admin only)

---

## Frontend Integration

The frontend connects to the backend using:

```js
const API = 'http://localhost:5001/api';
```

All mock data was replaced with real API calls using `fetch()`.

---

## Testing

The application was tested using both browser-based interaction and API testing via curl.

Verified functionality includes:

- Product listing and filtering
- Product detail retrieval
- User registration and login
- JWT-based authentication
- Order creation
- Retrieval of user-specific orders

---

## Notes

- Admin-only routes require `isAdmin = true` in MongoDB
- New users are created as non-admin by default
