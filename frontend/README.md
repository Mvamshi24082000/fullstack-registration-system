
# Fullstack Registration System

A beginner-friendly Fullstack Developer Assessment project that allows users to register and view registered users using a modern tech stack.

---

## 🔧 Tech Stack

### 📌 Frontend

- React.js (Create React App)
- Axios
- React Router DOM
- CSS (Responsive + Dark Mode)

### 📌 Backend

- Python (Flask)
- MySQL
- Flask-CORS
- mysql-connector-python

---

## 🚀 Features

- User Registration form with:
  - Name, Email, Date of Birth, Gender, Mobile Number
- Registered Users page (Read/Delete functionality)
- Backend API (CRUD support)
- Smooth UI styling with animations

---

## 💻 Installation & Run

### ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # For Windows
pip install -r requirements.txt
python app.py  # Runs on http://127.0.0.1:5000
```

### 📦 Frontend Setup

```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

### ✅ MySQL Setup

```sql
CREATE DATABASE registration_db;
USE registration_db;
CREATE TABLE Registration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  dob DATE,
  gender VARCHAR(10),
  mobile VARCHAR(15)
);
```

---

## 📂 Project Structure

```
fullstack-assessment/
├── backend/
│   ├── app.py
│   ├── db_config.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── RegistrationForm.js
│   │   ├── UsersList.js
│   │   └── App.css
│   └── package.json
└── README.md
```

---

## 🔗 Deployment

You can deploy this project on:

- **Frontend**: Netlify, Vercel
- **Backend**: Render, Railway, or local deployment using `flask run`

---

## 🙌 Credits

Built by **Vamshi Krishna Reddy** as part of a Fullstack Developer Assessment.

---

## 📌 License

This project is for learning purposes only. Feel free to reuse and improve!


