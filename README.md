# Arkade Backend Assessment

This is a complete Express + MongoDB backend for the Arkade e-commerce platform, fully integrated with a custom frontend.

---

## Overview

The system supports full e-commerce functionality including authentication, product browsing, and order management. All features were tested through both the frontend interface and API requests.

---

## Features

- User registration and login with JWT authentication
- Secure password hashing using bcryptjs
- Product listing and individual product retrieval
- Filtering by category and search queries
- Order creation for authenticated users
- Automatic stock reduction when orders are placed
- Protected routes using authentication middleware
- Database seeding with sample product data
- Admin endpoint to update order status

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors

---

## Project Structure

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

---

## Environment Variables

Create a .env file inside the backend folder:

PORT=5001  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_super_secret_jwt_key  

---

## Setup

Install dependencies:

cd backend  
npm install  
cp .env.example .env  

Update the .env file with your MongoDB connection string and JWT secret.

---

## Running the Application

Start backend:

cd backend  
npm run dev  

Backend runs on:  
http://localhost:5001  

Port 5001 is used to avoid conflicts with the frontend server.

Start frontend (in a new terminal):

cd ..  
npx serve .  

Frontend runs on:  
http://localhost:3000  

---

## API Endpoints

Authentication:

POST /api/auth/register  
POST /api/auth/login  

Products:

GET /api/products  
GET /api/products/:id  
POST /api/products (admin only)  

Optional filters:

?category=apparel  
?search=tee  

Orders:

POST /api/orders (protected)  
GET /api/orders/myorders (protected)  
PATCH /api/orders/:id/status (admin only)  

---

## Example API Usage

Register:

POST /api/auth/register  

{
  "email": "test@example.com",
  "password": "123456"
}

Get products:

GET /api/products  

Create order:

POST /api/orders  

Authorization: Bearer <token>  

---

## Frontend Integration

The frontend connects to the backend using:

const API = 'http://localhost:5001/api';

All mock data was replaced with real API calls using fetch().

---

## Testing

The application was tested using both browser interaction and API requests.

Verified functionality includes:

- Product listing and filtering
- Product detail retrieval
- User registration and login
- JWT authentication
- Order creation
- Retrieval of user-specific orders

---

## Notes

- If the name field is not provided during registration, the backend derives a username from the email.
- Admin routes require isAdmin to be set to true manually in the database.
- New users are created as non-admin by default.
- The backend follows a modular structure using controllers, routes, and middleware.

---

## Author

Dilakshan Palasundaram
Backend Developer
