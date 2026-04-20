# 🚀 The Workspace

A full-stack productivity web application that combines everyday tools into a single, clean dashboard.
Built using **Next.js, Node.js, Express, and MongoDB**, this app helps users manage tasks, track ideas, stay focused, and get quick AI assistance — all in one place.

---

## ✨ Features

### 🔐 Authentication

* Secure user login & registration
* JWT-based authentication
* Protected routes using middleware

---

### 📝 Task Manager

* Add, delete, and view daily tasks
* Smooth UI with animated completion
* Data stored per user in backend

---

### 🧠 Idea Board (Kanban)

* Organize ideas into:

  * Todo
  * Doing
  * Done
* Move ideas across stages
* Delete ideas
* Persistent storage in database

---

### ⏱ Pomodoro Timer

* Custom timer (15–60 mins)
* Visual circular progress
* Start, pause, resume, reset
* Clean and minimal UI with plant & animation 🌱

---

### 🎵 Music Player

* Play / Pause / Next / Previous controls
* Continuous playback across tracks
* Local audio support

---

### 📊 Live Cricket Scores

* Fetches real-time cricket match data
* Displays ongoing matches dynamically

---

### 🤖 Quick AI Assistant

Supports small daily-use AI tasks:

* Summarization
* Grammar correction
* Email writing
* Sentiment analysis
* Yes/No decisions
* General Q&A (with safe fallback for outdated info)

---

### 👤 Profile Section

* User greeting
* Logout functionality
* Live stats:

  * Total tasks
  * Total ideas

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* React.js
* Tailwind CSS
* Framer Motion (animations)
* Zustand (state management)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### AI Integration

* Google Gemini API (Flash model)

---

## 📁 Project Structure

```
client/
  ├── app/
  │   ├── dashboard/
  │   ├── auth/
  │   └── page.js
  ├── components/
  │   ├── Calculator.jsx
  │   ├── PlayfulTodolist.jsx
  │   ├── KanbanBoard.jsx
  │   ├── MusicPlayer.jsx
  │   ├── LiveSports.jsx
  │   ├── Pomodoro.jsx
  │   └── QuickAI.jsx
  ├── services/
  ├── lib/
  └── store/

server/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── services/
  └── server.js
```

---

## ⚙️ Environment Variables

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (`.env`)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```
git clone 
cd project-folder
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd client
npm install
npm run dev
```

---

### 4️⃣ Open in browser

```
http://localhost:3000
```

---

## 🔒 Authentication Flow

* Token stored in cookies
* Middleware protects dashboard routes
* Backend verifies token using JWT

---

## 🎯 Future Improvements

* Drag & drop Kanban board
* Music upload / YouTube integration
* AI chat history per user
* Real-time updates with WebSockets
* Notifications & reminders
* Mobile responsiveness improvements

---

## 💡 Motivation

This project was built to combine multiple daily-use tools into a **single productivity ecosystem**, reducing the need to switch between apps and improving focus.

---

## 📌 Author

**Achint Verma**

---

## ⭐ Final Note

This is a fully functional full-stack application demonstrating:

* Authentication
* API integration
* State management
* Real-world UI/UX design