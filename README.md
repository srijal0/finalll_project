# 🌿 EcoHaven

## Sustainable & Eco-Friendly Product Marketplace

EcoHaven is a full-stack web marketplace that helps users discover and purchase eco-friendly and sustainable products. The project focuses on providing a simple, modern, and user-friendly shopping experience while encouraging environmentally responsible choices, backed by a role-based admin system for store management.

### Features

**Customer-facing**
* 🏠 Home Page
* 🛍️ Shop Page with category filters & sorting
* 🔍 Product Search
* 📄 Product Details
* 🛒 Shopping Cart & Checkout
* 👤 Login & Signup (JWT-based auth)
* 📦 Order Tracking & Order History
* ❤️ Wishlist / Favourites
* 📱 Responsive Design

**Admin Panel** (`/admin`)
* 📊 Dashboard overview (products, orders, users, revenue)
* 🛍️ Product management (create, edit, delete)
* 📦 Order management (view all orders, update status)
* 👤 User management (view users, promote/demote admin role)
* 🔐 Role-based access control (admin vs. customer)

### Technologies Used

**Frontend**
* Next.js (App Router)
* React
* TypeScript
* CSS
* Context API

**Backend**
* Node.js / Express
* MongoDB with Mongoose
* JWT authentication
* bcrypt password hashing

### Project Structure

This is a two-part project:
* `final_project/` — Next.js frontend (this repo)
* `ecoproduct-backend/` — Express + MongoDB API

Both need to be running for full functionality.

### Getting Started

**Frontend**

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

**Backend**

In the `ecoproduct-backend` directory:
```bash
npm install
npm start
```

The API runs on **http://localhost:5000** by default. Create a `.env` file (see `.env.example` if present) with your `MONGO_URI`, `JWT_SECRET`, and `PORT`.

### Admin Access

Admin accounts are assigned by setting `role: "admin"` on a user document in MongoDB. Once set, logging in with that account redirects automatically to `/admin`.

### Author

**Shreejal Shrestha**

BSc (Hons) Computing

Softwarica College of IT & E-Commerce