# 💰 Finance Tracker API (Node.js + MongoDB)

A RESTful backend API built using **Node.js, Express, MongoDB, and MVC Architecture** for managing personal finance including transactions, budgets, and analytics.

# 🚀 Features

## 👤 User Management

- Register new user
- Login with JWT authentication

## 💳 Transactions

- Add income or expense
- Fetch all transactions
- Fetch single transaction
- Update transaction
- Delete transaction

## 🎯 Budget Management

- Set monthly spending goal
- Set savings target
- Fetch budget details

## 📊 Analytics & Summary

- Total income calculation
- Total expense calculation
- Remaining balance
- Budget comparison
- Savings target status

---

# 🏗 Architecture

---

## ✨ Highlights

- JWT Authentication
- MongoDB Aggregation Analytics
- Modular MVC Architecture
- Centralized Route Management
- Security Middleware (Helmet + Rate Limit)
- Automated API Testing

## 🧩 Architecture Overview

- Controllers → handle HTTP requests and responses
- Services → contain business logic
- Models → database schema layer
- serverRoutes → centralized route loader to keep app.js clean
- Middleware → authentication, logging, error handling


## 🔄 Request Flow

Client Request
   ↓
app.js (bootstrap)
   ↓
serverRoutes (CommonRoutes)
   ↓
Route Handlers
   ↓
Controllers
   ↓
Services
   ↓
Database (MongoDB)


---

Project follows MVC pattern:

project-root/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── serverRoutes/         👈 CommonRoutes (central route loader)
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   └── db/
│
├── tests/                   👈 API test cases (tap + supertest)
│   └── server.test.js
│
├── app.js                   👈 Application bootstrap (Express setup)
├── package.json
├── .env
└── README.md





---

# ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Express Middleware
- TAP + Supertest (Testing)

---

# 📦 Installation

Clone repository:

```bash
git clone https://github.com/amityadav2611/Airtribe_Group05.git
cd project-folder

Install dependencies:
npm install


🔑 Environment Variables

Create .env file:
PORT=5002
MONGO_URL=mongodb://localhost:27017/finance or atlas string url
JWT_SECRET=your_secret_key


▶️ Run Server

Development mode:
npm run dev

Production:
npm start

Health check:
GET /health


🔐 Authentication

Protected routes require:
Authorization: Bearer <TOKEN>
Token generated after login.


📡 API Endpoints
👤 User
1.Register
POST /users

Body:
{
  "name": "test",
  "email":"test@gmail.com",
  "password":"123456"
}

2.Login
POST /users/login
Response:
{
 "token":"JWT_TOKEN"
}


💳 Transactions
Add Transaction
POST /transactions
body:
{
 "type":"income",
 "category":"salary",
 "amount":5000
}

Get All Transactions
GET /transactions

Get Single Transaction
GET /transactions/:id

Update Transaction
PATCH /transactions/:id

Delete Transaction
DELETE /transactions/:id


🎯 Budget
Set Budget
POST /budget
body:
{
 "monthlyGoal":30000,
 "savingTarget":10000
}

Get Budget
GET /budget


📊 Summary Analytics
GET /summary
Response:
{
 "totalIncome":50000,
 "totalExpense":25000,
 "balance":25000,
 "monthlyGoal":30000,
 "savingTarget":10000,
 "budgetStatus":"Within Budget",
 "savingStatus":"Saving Target Achieved"
}


📊 Analytics Logic
-Summary endpoint uses MongoDB aggregation:
-Groups transactions by type
-Calculates income and expense totals
-Computes balance
-Compares with budget targets


🧪 Testing

Run API tests:
npm run test

Testing stack:
-TAP
-Supertest
-Tests include:
-User authentication
-Transaction CRUD
-Budget API
-Summary analytics


🔐 Middleware Used

-JWT authentication middleware
-Global error handler
-Request logger
-Rate limiter
-Helmet security headers


📈 Future Improvements

-Category-based analytics
-Monthly trend dashboard
-Redis caching
-Role-based access control
-Swagger API documentation
