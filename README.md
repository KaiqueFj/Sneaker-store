# 👟 Sneakers Store — Modern E-commerce Experience

A fully responsive and dynamic sneaker e-commerce platform inspired by **Nike’s UI/UX**, built with **Next.js**, **Supabase**, **NextAuth**, and **Toastify**.

---

## 🚀 Overview

This project delivers a complete, modern online shopping experience.  
Users can browse sneakers, add them to the cart, manage quantities, simulate orders, update their profile, and log in with Google — all wrapped in a clean, Nike-inspired interface.

This is more than a frontend: it’s a **full-stack web application** with authentication, real dynamic data, and a powerful shopping workflow.

---

## ✨ Key Features

### 🖥️ Fully Responsive UI

- Mobile-first layout
- Smooth, modern design modeled after Nike's website
- Adaptive navbar, dropdowns, modals, and dynamic pages

### 🔐 Authentication

- Sign in with **Google** (via NextAuth)
- Protected pages for account, orders, and profile

### 🛒 Shopping Cart

- Add sneakers to the cart
- Manage item quantity
- Remove items
- Cart saved through context/state
- Realtime UI updates

### 📦 Order Simulation System

- Place a simulated order
- Orders stored in Supabase
- View previous orders
- Order details page

### 👤 User Profile Management

- Update profile information
- Track orders
- Manage account settings

### 🗄️ Supabase Backend

- Database for sneakers, users, and orders
- OAuth login
- Realtime-capable backend

### 🔔 Toastify Notifications

- Success and error alerts
- Smooth UX feedback

---

## 🧰 Tech Stack

### Frontend

- **Next.js 14**
- **React**
- **Tailwind CSS**
- **Context API** / custom hooks

### Backend

- **Supabase**
- **NextAuth**

### Utilities

- **Toastify**
- **Heroicons**
- **Next/Image**

---

## 📁 Project Structure

```
├── app/                             # Next.js App Router
│   ├── _components/                 # Shared UI components
│   ├── _styles/                     # Global & component styles
│
│   ├── (auth)/                      # Auth route group
│   │   ├── login/
│   │   ├── signup/
│   │   └── password-reset/
│
│   ├── (cart-checkout)/             # Cart & checkout route group
│   │   ├── cart/
│   │   └── checkout/
│
│   ├── (products)/                  # Products route group
│   │   ├── favorites/
│   │   ├── sneaker/
│   │   └── sneakers/
│
│   ├── account/                     # Account pages
│   │   ├── orders/
│   │   ├── profile/
│   │   └── updatePassword/
│
│   ├── hooks/                       # App-scoped custom hooks
│
│   ├── error.js                     # Error boundary
│   ├── icon.png                     # App icon
│   ├── layout.js                    # Root layout
│   ├── not-found.js                 # 404 page
│   └── page.js                      # Home page
│
├── context/                         # Global contexts (cart, user, sneakers)
├── lib/                             # Configs, services, API helpers
├── public/                          # Static assets
├── utils/                           # Utility functions & helpers
│
├── .env                             # Environment variables
├── jsconfig.json                    # Path aliases
├── proxy.js                         # Proxy configuration (auth / redirects)

```

---

## 🧪 Features Preview

- 🏠 Homepage
- 👟 Sneaker listing
- 📄 Sneaker details
- 🛒 Cart
- 🔐 Login
- 📦 Orders
- 👤 Profile

---

## 🌎 Take a look at the live project

[https://sharkf-store.netlify.app](https://sharkf-store.netlify.app)

---

## 🤝 Contributing

Contributions are welcome!  
Open an issue or submit a pull request to propose changes.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you enjoyed this project, consider giving the repository a **star** on GitHub!  
It helps a lot and motivates further improvements.
