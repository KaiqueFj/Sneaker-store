# 👟 Sneakers Store — Modern E-commerce Experience

A fully responsive and dynamic sneaker e-commerce platform inspired by **Nike’s UI/UX**, built with **Next.js**, **Supabase**, **NextAuth**, and **React Toastify**.

---

## 🚀 Overview

**Sneakers Store** delivers a complete, production-style online shopping experience.

Users can:

- Browse products
- View detailed sneaker pages
- Add items to cart
- Manage quantities
- Simulate checkout
- Track orders
- Manage their profile
- Authenticate with Google

This project goes beyond UI styling — it implements real backend logic, authentication, database persistence, protected routes, and end-to-end user flows.

---

## 🎯 Project Goals

This project was built to simulate a real-world e-commerce platform and demonstrate:

- Secure authentication & protected routes
- Full CRUD operations with Supabase
- Scalable routing with Next.js App Router
- Clean and modern UI/UX design
- Structured and maintainable project architecture
- Real database relationships (products, reviews, users, orders)
- Performance optimization aligned with Lighthouse best practices

---

## 🧠 Architecture & Technical Decisions

### 🧩 Frontend Architecture

- **Next.js App Router** for scalable layouts and nested routing
- Route Groups for logical feature separation
- Server Components where possible for performance
- Client Components only where interactivity is required

### 🗄️ Backend Architecture

- **Supabase PostgreSQL** as primary database
- Relational schema with foreign keys
- Database triggers for rating recalculation
- Secure row-level logic for user-based operations

### 🔐 Authentication

- **NextAuth** for Google OAuth login
- Protected routes for account-related pages
- Session-based access control

### 🛒 State Management

- **React Context API**
  - Cart state
  - User state
- Lightweight and scalable without overengineering

### ⚡ Performance Considerations

- Next.js Image Optimization
- Optimized database queries
- Server-side data fetching
- Clean component boundaries
- Reduced unnecessary re-renders

---

## ✨ Key Features

### 🖥️ Fully Responsive UI

- Mobile-first layout
- Nike-inspired minimal aesthetic
- Adaptive navbar and modals
- Smooth transitions and UX feedback

---

### 🔐 Authentication System

- Sign in with Google (OAuth)
- Protected account pages
- Session management
- Secure user-based data access

---

### 👟 Product System

- Product listing page
- Dynamic product details pages
- Real-time average rating calculation
- Database-driven content

---

### 🛒 Shopping Cart

- Add to cart
- Update quantities
- Remove items
- Live UI updates
- Persistent cart state

---

### 📦 Order Simulation System

- Simulated checkout flow
- Orders stored in Supabase
- Order history page
- Detailed order view

---

### ⭐ Review System

- Authenticated users can leave reviews
- Automatic product rating recalculation via PostgreSQL trigger
- Reviews linked via foreign keys:
  - `reviews.product_id → products.id`
  - `reviews.client_id → users.id`

---

### 👤 User Profile Management

- Update profile information
- View past orders
- Manage account settings

---

### 🔔 Notifications

- Success & error feedback via **React Toastify**
- Smooth user experience with visual confirmation

---

## 🧰 Tech Stack

### Frontend

- **Next.js 14**
- **React**
- **Tailwind CSS**
- **Context API**
- **Next/Image**

### Backend

- **Supabase (PostgreSQL)**
- **NextAuth**

### Utilities & Libraries

- **React Toastify**
- **Heroicons**
- Custom utility helpers

---

## 📁 Project Structure

```
├── app/ # Next.js App Router
│ ├── _components/ # Shared UI components
│ ├── _styles/ # Global & component styles
│
│ ├── (auth)/ # Auth route group
│ │ ├── login/
│ │ ├── signup/
│ │ └── password-reset/
│
│ ├── (cart-checkout)/ # Cart & checkout route group
│ │ ├── cart/
│ │ └── checkout/
│
│ ├── (products)/ # Products route group
│ │ ├── favorites/
│ │ ├── sneaker/
│ │ └── sneakers/
│
│ ├── account/ # Account pages
│ │ ├── orders/
│ │ ├── profile/
│ │ └── updatePassword/
│
│ ├── hooks/ # App-scoped custom hooks
│
│ ├── error.js # Error boundary
│ ├── icon.png # App icon
│ ├── layout.js # Root layout
│ ├── not-found.js # 404 page
│ └── page.js # Home page
│
├── context/ # Global contexts (cart, user)
├── lib/ # Supabase configs & services
├── public/ # Static assets
├── utils/ # Utility functions
│
├── .env.local # Environment variables
├── jsconfig.json # Path aliases
└── proxy.js # Route protection logic

```

---

## 🧪 Feature Flow Overview

1. User visits homepage
2. Browses sneaker catalog
3. Views sneaker details
4. Adds item to cart
5. Authenticates with Google
6. Places simulated order
7. Order stored in database
8. User views order history
9. User leaves review
10. Product rating auto-recalculates

---

## 📊 Database Relationships

### Core Tables

- `users`
- `products`
- `reviews`
- `orders`
- `order_items`
- `coupons`

### Key Relationships

- `reviews.product_id → products.id`
- `reviews.client_id → users.id`
- `order_items.order_id → orders.id`
- `order_items.product_id → products.id`

Triggers ensure:

- Automatic rating recalculation
- Data consistency

---

## 🌎 Live Demo

🔗 **Live Project:**  
https://sharkf-store.netlify.app

## 📈 Performance Focus

This project aims for high Lighthouse scores through:

- Optimized images

- Server components

- Minimal client-side JavaScript

- Efficient database queries

- Clean layout structure

- Proper caching strategies

## 🤝 Contributing

1. Contributions are welcome.

2. Fork the repository

3. Create a feature branch

4. Commit changes

5. Open a Pull Request

## ⭐ Support

If you enjoyed this project, consider giving the repository a star on GitHub.
It helps support future improvements and new features.
