# 🚀 Kanto

> **A personal productivity workspace for ideas, tasks, focus, and everyday tools — all in one place.**

Kanto is a full-stack productivity web application designed to bring multiple everyday tools into a single, focused workspace.

Instead of switching between separate apps for tasks, ideas, timers, calculations, and information, Kanto brings them together through a unified dashboard with a warm, minimal, and distraction-free interface.

Built with **Next.js, React, Node.js, Express, MongoDB, and Tailwind CSS**, Kanto combines full-stack functionality with a modern product-focused UI.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected dashboard access
* User-specific data
* Secure logout flow
* Persistent authentication state

---

### 🧠 Idea Workspace

A Kanban-style workspace for capturing and organizing ideas.

* Create ideas quickly
* Organize ideas into:

  * 💡 Todo
  * ⏳ In Progress
  * ✓ Completed
* Move ideas between stages
* Delete ideas
* Persistent database storage
* Animated card transitions
* Live idea counts

The Kanban board remains the main workspace of the dashboard so ideas are always visible.

---

### 📝 Task Manager

A lightweight daily task system designed for quick execution.

* Add tasks
* Complete tasks
* Delete tasks
* Completion animations
* Task progress tracking
* User-specific task storage
* Automatic task statistics

---

### ⏱️ Pomodoro Focus Timer

A focused timer for working in distraction-free sessions.

* Custom duration between 15–60 minutes
* Start / pause / resume
* Reset functionality
* Circular progress indicator
* Visual focus state
* Minimal plant-inspired interface 🌱

---

### 🎵 Music Player

A built-in music player designed to stay out of the way while you work.

* Play / pause
* Previous / next track
* Track selection
* Progress seeking
* Volume control
* Mute functionality
* Local audio support
* Playback progress tracking

The player uses a warm turntable-inspired interface to give it a distinct personality within the workspace.

---

### 🏏 Live Cricket Scores

A dedicated cricket utility for quickly checking ongoing matches.

* Live match information
* Dynamic match cards
* Refresh functionality
* Automatic updates
* Live status indicators

---

### 🧮 Calculator

A compact calculator available directly inside the workspace.

* Basic arithmetic operations
* Keyboard-friendly interaction
* Clean calculator interface
* Quick access without leaving the dashboard

---

### 🤖 Quick AI Assistant

A small AI utility for everyday productivity tasks.

Supports:

* Summarization
* Grammar correction
* Email writing
* Sentiment analysis
* Yes / No decisions
* General questions

AI functionality is designed as a quick utility rather than replacing the main productivity workflow.

---

### 👤 User Profile

A profile dropdown integrated directly into the dashboard.

* Backend-driven user information
* User avatar / initials
* Email display
* Online status
* Task statistics
* Idea statistics
* Logout functionality

The profile is accessible from the main dashboard header without taking the user away from their workspace.

---

## 🎨 Design System

Kanto follows a consistent **warm productivity OS** visual language.

### Visual direction

* Warm cream backgrounds
* Soft white surfaces
* Orange / amber accent colors
* Subtle shadows
* Rounded cards
* Minimal borders
* Small ambient gradients
* Restrained animations
* Clean typography

### Color language

| Purpose             | Color     |
| ------------------- | --------- |
| Background          | `#FAF8F4` |
| Main surface        | `#FFFDF9` |
| Primary text        | `#29251F` |
| Orange accent       | `#F97316` |
| Green / success     | Emerald   |
| AI                  | Purple    |
| Destructive actions | Red       |

The goal is to make Kanto feel like a **calm personal workspace**, rather than a traditional admin dashboard.

---

## 🛠️ Tech Stack

### Frontend

* **Next.js** — App Router
* **React**
* **Tailwind CSS**
* **Framer Motion** — animations and transitions
* **Zustand** — State Management
* **Axios** — API communication
* **React Icons**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**

### AI

* **Google Gemini API**

---

## 📁 Project Structure

```text
client/
├── app/
│   ├── dashboard/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   └── page.js
│
├── components/
│   ├── Calculator.jsx
│   ├── PlayfulTodolist.jsx
│   ├── KanbanBoard.jsx
│   ├── LiveSports.jsx
│   ├── Pomodoro.jsx
│   ├── QuickAi.jsx
│   └── Profile.jsx
│
├── services/
├── lib/
├── store/
└── public/

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

### Frontend

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_api_key
```

> Never commit `.env` or `.env.local` files to GitHub.

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone git@github.com:Achintxv/Next.git

cd project-folder
```

---

### 2. Setup the backend

```bash
cd server

npm install

npm run dev
```

---

### 3. Setup the frontend

Open another terminal:

```bash
cd client

npm install

npm run dev
```

---

### 4. Open the application

Visit:

```text
http://localhost:3000
```

---

## 🔒 Authentication Flow

Kanto uses JWT-based authentication.

The general flow is:

```text
Register
   ↓
Login
   ↓
Backend validates credentials
   ↓
JWT issued
   ↓
Client stores authentication state
   ↓
Dashboard access
   ↓
User-specific API requests
```

Protected resources are associated with the authenticated user so tasks and ideas are not shared between accounts.

---

## 🧩 Dashboard Architecture

The dashboard is designed around a simple principle:

> **Keep the main work visible while making secondary tools accessible when needed.**

```text
┌─────────────────────────────────────────────────────────┐
│ Kanto                         User Profile               │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│ Workspace    │                                          │
│              │             Idea Workspace               │
│ 💡 Ideas     │                                          │
│ 📝 Tasks     │       ┌────────┬────────┬────────┐      │
│              │       │  Todo  │ Doing  │  Done  │      │
│ Utilities    │       └────────┴────────┴────────┘      │
│              │                                          │
│ ⏱ Focus     │                                          │
│ 🏏 Cricket  │                                          │
│ 🧮 Calculator│                                         │
│ 🤖 Quick AI │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

The Kanban workspace remains the primary visual area, while utilities open within focused overlays or panels.

---

## 🔮 Future Improvements

Potential future additions include:

* Drag-and-drop Kanban cards
* YouTube / external music integration
* AI conversation history
* AI-powered task suggestions
* Real-time updates with WebSockets
* Notifications and reminders
* Calendar integration
* Keyboard shortcuts
* Mobile-first dashboard improvements
* Custom themes
* User preferences
* Productivity analytics

---

## 💡 Motivation

Kanto started from a simple idea:

> **Why should productivity require switching between ten different applications?**

Tasks, ideas, focus sessions, music, calculations, information, and AI assistance are all small parts of a person's daily workflow.

Kanto brings those pieces together into one personal workspace while keeping the interface simple enough that the tools don't become distractions themselves.

---

## 📌 Author

**Achint Verma**

Full-stack developer building Kanto as an exploration of:

* Full-stack web development
* Modern React architecture
* REST APIs
* Authentication
* Database-driven applications
* State management
* Product UI/UX
* Interactive frontend experiences

---

## ⭐ Final Note

Kanto is a full-stack productivity application demonstrating how multiple independent tools can be combined into a cohesive product experience.

The project brings together:

* 🔐 Authentication
* 🗄️ Database persistence
* 🔌 REST API integration
* ⚛️ React / Next.js
* 🎨 Modern UI/UX
* 🧠 Kanban workflows
* ⏱️ Productivity tools
* 🤖 AI integration
* 📊 Dynamic user statistics
* 🏏 Live data

Built with the goal of making everyday productivity feel **simple, focused, and personal**.