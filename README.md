# 🍔 Food Delivery App

A full-stack food delivery application where users can browse menu items, add/delete items from their cart, and place orders. Admins can manage the menu and track orders.

---

## 🚀 Tech Stack

**Frontend:**
- React.js (v19)
- Tailwind CSS
- React Router DOM
- Axios
- JWT Decode
- Lucide Icons

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (Authentication)
- bcryptjs (Password Hashing)
- dotenv, cors

---

## 📦 Features

### User Features:
- User registration and login (JWT-based)
- Browse menu items
- Add, update, or remove items in cart
- Place an order and track status

### Admin Features:
- Add/update/delete menu items
- View and update order statuses

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Food-Delivery-App.git
cd Food-Delivery-App
```
Setup Backend

cd server
npm install
node index.js or npm start

Setup Frontend

cd client
npm install
npm run dev

Challenges:
Ensuring secure JWT handling across requests

Managing persistent cart updates synced with backend

Limitations:
No payment gateway integration (mock order placement)

Role-based access is basic (Admin/User distinction only)
