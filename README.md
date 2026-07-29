# 🌿 EcoHaven — Frontend

A full-stack eco-friendly e-commerce marketplace developed as a final-year undergraduate project. EcoHaven enables users to discover and purchase sustainable products through a modern, responsive, and user-friendly shopping experience. The platform also includes an admin dashboard for managing products, orders, and users.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- CSS
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt Password Hashing

### Deployment
- Frontend: Local Development
- Backend: Local Development

---

## ✨ Features

### 👤 Customer

- 🏠 Home page
- 🛍️ Browse eco-friendly products
- 🔍 Product search
- 📂 Product categories
- 📄 Product details
- 🛒 Shopping cart
- 💳 Checkout
- ❤️ Wishlist
- 👤 User Registration & Login
- 📦 Order History
- 🚚 Order Tracking
- 📱 Fully Responsive Design

### 🔐 Admin

- 📊 Dashboard
- 📦 Product Management
- 📋 Order Management
- 👥 User Management
- 🔐 Role-based Authentication
- 📈 Sales Overview

---

## 📁 Project Structure

```
app/
├── admin/                 # Admin dashboard
├── cart/                  # Shopping cart
├── checkout/              # Checkout
├── login/                 # User login
├── register/              # User registration
├── orders/                # Order history
├── product/               # Product details
├── shop/                  # Shop page
├── track-order/           # Order tracking
├── wishlist/              # Wishlist
├── components/            # Reusable UI components
├── context/               # Context API
├── hooks/                 # Custom hooks
├── lib/                   # Helper functions
└── public/                # Images & static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/srijal0/finalll_project.git

# Navigate into project
cd finalll_project

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📱 Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Shop | `/shop` |
| Product Details | `/product/:id` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Login | `/login` |
| Register | `/register` |
| Wishlist | `/wishlist` |
| Orders | `/orders` |
| Track Order | `/track-order` |
| Admin Dashboard | `/admin` |

---

## 🎨 Design Theme

EcoHaven follows a clean and modern design inspired by sustainability.

| Color | Hex |
|--------|------|
| Primary Green | `#2E7D32` |
| Light Green | `#81C784` |
| Background | `#F5F9F5` |
| White | `#FFFFFF` |
| Dark Text | `#263238` |

---

## 🔐 Authentication

- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes
- Role-based Authorization (Admin & Customer)

---

## 📦 Backend

The frontend communicates with a separate Express.js backend.

Backend Features:

- REST API
- JWT Authentication
- Product CRUD Operations
- Order Management
- User Management
- MongoDB Database

---

## 📈 Future Improvements

- Product Reviews & Ratings
- Discount Coupons
- Email Notifications
- Online Payment Gateway
- AI-based Product Recommendations
- Product Comparison
- Dark Mode

---

## 👨‍💻 Developer

**Shreejal Shrestha**

BSc (Hons) Computing

Softwarica College of IT & E-Commerce

---

## 📄 License

This project was developed for educational purposes as a final-year undergraduate project.