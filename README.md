# 🛒 EazyDeals AI - AI Powered E-Commerce Web Application

An AI-powered full-stack E-Commerce platform built using **Spring Boot, React, MySQL, Spring Security, JWT, Spring AI, and Ollama**. The application provides an intelligent shopping experience with AI-assisted product recommendations, natural language search, gift suggestions, and a modern admin dashboard.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- JWT Authentication
- Profile Management
- Browse Products
- Product Categories
- Product Search
- AI Natural Language Search
- Shopping Cart
- Wishlist
- Checkout
- Order History
- AI Shopping Assistant
- AI Gift Finder
- Personalized Recommendations
- Dark Mode

---

### 🤖 AI Features

Powered by **Spring AI + Ollama (Llama 3.2:1B)**

- AI Shopping Assistant
- Natural Language Product Search
- Gift Recommendation System
- Product Recommendation Engine
- AI Product Description Generator
- AI Review Summarizer
- Conversation History
- Prompt Validation
- Prompt Injection Protection

---

### 👨‍💼 Admin Features

Separate Admin Portal

- Dashboard
- Product Management
- Category Management
- User Management
- Order Management
- Inventory Management
- Sales Analytics
- Revenue Dashboard
- AI Product Description Generator

---

## 🏗️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Material UI

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring AI
- JWT Authentication
- Maven

### Database

- MySQL

### AI

- Ollama
- Llama 3.2:1B
- Spring AI

---

## 📂 Project Structure

```
E-Commerce-Web-Application
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── security
│   ├── ai
│   └── config
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── context
│   │   └── assets
│
└── README.md
```

---

# ✨ AI Capabilities

### AI Shopping Assistant

Ask questions naturally:

```
Suggest a laptop under ₹70000
```

```
Show me running shoes
```

```
Recommend a gaming mouse
```

---

### AI Gift Finder

Find gifts based on

- Budget
- Age
- Occasion
- Interests

Example

```
Gift for my brother under ₹2000
```

---

### AI Product Search

Search naturally instead of keywords

Example

```
Phone with best camera under ₹40000
```

```
Gaming laptop with RTX
```

---

## 🔐 Authentication

- JWT Authentication
- Role Based Access
- BCrypt Password Encryption
- Protected APIs
- Admin & User Roles

---

## 📸 Screens

- Home
- Products
- Product Details
- AI Chat
- AI Gift Finder
- Cart
- Wishlist
- Checkout
- Orders
- Profile
- Admin Dashboard

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/bhargavbhat18/E-Commerce-Web-Application.git
```

```bash
cd E-Commerce-Web-Application
```

---

## Backend Setup

### Create MySQL Database

```sql
CREATE DATABASE eazydeals;
```

### Configure

Update

```
backend/src/main/resources/application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/eazydeals
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

## Install Ollama

Install Ollama

https://ollama.com

Pull model

```bash
ollama pull llama3.2:1b
```

Run

```bash
ollama serve
```

Verify

```bash
ollama list
```

---

## Run Backend

```bash
cd backend
```

```bash
mvn spring-boot:run
```

Backend

```
http://localhost:8080
```

Swagger

```
http://localhost:8080/swagger-ui.html
```

---

## Run Frontend

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

## Demo Accounts

### Admin

```
Email

admin@eazydeals.com

Password

Admin@123
```

### User

```
Email

user@eazydeals.com

Password

User@123
```

---

## Future Enhancements

- Payment Gateway
- Stripe Integration
- Razorpay Integration
- Email Notifications
- Image Upload
- Voice Shopping
- AI Image Search
- Product Comparison
- Coupons
- Multi Vendor Support
- Recommendation Analytics

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

3. Commit your changes

4. Push your branch

5. Open a Pull Request

---

## 👨‍💻 Author

**Bhargav Bhat**


---

















