# 🎉 Bellcorp Event Management Application

A full-stack **Event Discovery & Registration Platform** where users can explore events, register securely, and manage their event history through a personalized dashboard.



## 📌 Project Overview

The **Bellcorp Event Management Application** is designed to provide a seamless experience for discovering and registering for events.

Users can:

* 🔍 Search and filter events
* 🔐 Create accounts & login securely
* 📝 Register for events
* 📊 View upcoming and past registrations


## 🛠 Tech Stack

### 💻 Frontend

* **React.js** (Functional Components & Hooks)

  * `useState`
  * `useEffect`
  * `useContext` / Redux
* React Router
* Axios (API calls)
* Tailwind CSS / CSS Modules (Optional)

### 🖥 Backend

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)** / SQLite
* **JWT (jsonwebtoken)** for authentication
* **bcryptjs** for password hashing

### 🚀 Deployment & Tools

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Version Control: Git & GitHub
* API Testing: Postman / Insomnia


## 📂 Project Structure

```
root/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── middleware/
│   │   └── protect.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── EventCard.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Events.js
│   │   │   ├── EventDetails.js
│   │   │   └── Dashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   └── App.js
│   └── package.json
│
└── README.md
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/bellcorp-event-management.git
cd bellcorp-event-management
```


### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```


### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```


## 🔐 Authentication Flow

### 📝 Signup

* Validates user input
* Hashes password using `bcryptjs`
* Stores user in database

### 🔑 Login

* Verifies email & password
* Returns JWT token
* Token stored in localStorage

### 🛡 Protected Routes

* Middleware verifies JWT
* Prevents unauthorized access


## 🎯 Core Features

### 🔍 Event Discovery

* Search events (Regex search)
* Filter by category & location
* Dynamic fetching based on filters

### 📝 Event Registration

* Prevent duplicate registration
* Check event capacity before confirming
* Store User ↔ Event relation

### 📊 User Dashboard

* Fetch logged-in user registrations
* Categorize:

  * Upcoming Events (future date)
  * Past Events (previous date)


## 🧠 Database Models

### 👤 User

* name
* email (unique)
* password (hashed)

### 🎉 Event

* name
* organizer
* location
* date
* description
* capacity
* category

### 📌 Registration

* userId (ref: User)
* eventId (ref: Event)


## 🧪 Testing

Use:

* Postman
* Insomnia

Test:

* User signup/login
* Protected routes
* Registration logic
* Capacity validation


## 🚀 Deployment Guide

### Backend

* Push to GitHub
* Deploy to Render / Railway
* Add environment variables

### Frontend

* Deploy to Vercel / Netlify
* Update API base URL to live backend


## 🎥 Demo Checklist

* Register a new user
* Login
* Search & filter events
* Register for an event
* View dashboard
* Show folder structure
* Explain DB relations


## 📌 Best Practices

* ✅ Validate data on backend
* ✅ Use proper HTTP status codes
* ✅ Secure JWT secret
* ✅ Handle errors gracefully
* ✅ Use environment variable

## 📄 License

This project is developed for educational and assessment purposes.

## 👨‍💻 Author

**Eslavath Anil**
Full-Stack Developer

