# Food Ordering Website

A full-stack MERN Food Ordering Website with authentication, cart management, order processing, admin dashboard, and online payment integration.

---

# Features

## User Features
- User Signup & Login
- JWT Authentication using Cookies
- Browse Food Items
- Search & Filter Food Items
- Add to Cart
- Place Orders
- Online Payment Integration using Razorpay
- View My Orders
- Responsive UI for Mobile, Tablet, and Desktop

---

## Admin Features
- Admin Dashboard
- Add Food Items
- Edit Food Items
- Delete Food Items
- Upload Food Images using Cloudinary
- View All Orders
- Update Order Status (Processing / Delivered)

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite
- Context API

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Razorpay Payment Gateway
- CORS

---

# Cloud Services
- Cloudinary (Image Hosting)
- MongoDB Atlas

---

# Folder Structure

```bash
food_odering_website
│
├── backend
│
├── frontend
│
├── .gitignore
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-link>
```

---

## Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
```

---

# Run Project

## Backend

```bash
npm run server
```

## Frontend

```bash
npm run dev
```

---

