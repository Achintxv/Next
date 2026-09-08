# 🚀 Issue Tracker — Project Management Dashboard

### ✨ A Modern, High-Performance Full-Stack Issue & Task Management App

Built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **MongoDB**, and **Lucide React**.

![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Framework-38BDF8?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

---

## 🌌 About The Project

This is a **full-stack issue tracking dashboard** designed to give teams and developers clear visibility into project progress, task metrics, and status workflows.

The project focuses on:

- ✨ **Clean Presentational Architecture**
- ⚡ **Optimized Data Flow & State Management**
- 🎨 **Modern Dark Glassmorphism UI**
- 🛡️ **Protected Dynamic API Routes**
- 🧠 **Robust Status Normalization Engine**
- 🚀 **Zero Layout Shift Performance**

---

## 🖼️ Features

### 📊 Real-Time Metrics & Progress Tracking

- Auto-calculated issue distribution progress bar
- Dynamic state counters for `Open`, `In-Progress`, and `Closed` tasks
- Real-time percentage completion rates
- Status normalization engine handling workflow aliases (`todo`, `backlog`, `doing`, `inreview`, `done`, `resolved`)

### 🎭 Full CRUD Operations & Workflows

- Unified issue creation and editing modal (`IssueModal`)
- Safe item deletion with event isolation (`stopPropagation`)
- Interactive issue filtering (`All`, `Open`, `In Progress`, `Closed`)
- Responsive status badges with custom color indicators

### 🔒 Secure Backend Architecture

- Next.js App Router dynamic endpoints (`/api/issue/[id]`)
- Session authentication validation via `getCurrentUser`
- Project-level authorization checks on all `PATCH`, `GET`, and `DELETE` requests

### 📱 Responsive UI

Optimized for:

- 📲 Tablets
- 💻 Laptops
- 🖥️ Large Screens

---

## 🛠️ Tech Stack

### ⚛️ Frontend

- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **JavaScript (ES6+)**

### 🎨 UI & Icons

- **Lucide React**
- **Glassmorphism & Custom Utility Classes**

### 🗄️ Backend & Database

- **Next.js Server Route Handlers**
- **MongoDB & Mongoose ODM**
- **Custom Auth Session Middleware**

---

## ⚡ Installation

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/Achintxv/issue-tracker.git](https://github.com/Achintxv/issue-tracker.git)
```

### 2️⃣ Navigate to the Project Folder

```bash
cd issue-tracker
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Install Dependencies

```bash
npm install
```

### 5️⃣ Run the Development Server

```bash
npm run dev
```

---

## 📦 Dependencies Used

Install core dependencies:

```bash
npm install lucide-react
npm install mongoose
npm install jsonwebtoken
```

---

## 🎨 Core Components

| Component | Description |
| :--- | :--- |
| `ProjectView` | Main dashboard container, metrics calculator, and API orchestrator |
| `IssueList` | Presentational task list component with status filtering & row deletion |
| `IssueModal` | Reusable modal dialog handling issue creation and updates |
| `StatusBadge` | Visual indicator tag utilizing status normalization logic |
| `status.js` | Utility script normalizing status aliases to maintain UI consistency |

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/issue?project={id}` | Fetches all issues belonging to a specific project |
| `GET` | `/api/issue/[id]` | Fetches single issue details after authorization check |
| `POST` | `/api/issue` | Creates a new issue tied to the active project |
| `PATCH` | `/api/issue/[id]` | Updates title, description, status, or priority |
| `DELETE` | `/api/issue/[id]` | Permanently removes an issue |

---

## 🌟 Performance Optimizations

✅ **Zero Layout Shift:** Static paddings (`px-3`) on interactive rows prevent dynamic layout jumps on hover.  
✅ **Event Isolation:** Handled `e.stopPropagation()` on row action triggers to prevent unwanted modal popups.  
✅ **Container / Presentational Pattern:** API state isolated to parent orchestrator, keeping child views purely presentational.  
✅ **Centralized Normalization:** Custom string cleaner prevents data mismatch bugs across diverse database records.  
✅ **Server Authorization:** Verification of project ownership before executing database mutations.

---

## 🔥 Future Improvements


- 👤 **Member Assignment System:** Assign tasks to team members with visual user avatars
- 🔍 **Global Search & Sorting:** Filter issues by priority, title search, or creation date
- 💬 **Activity & Comment Threads:** Historical audit log and discussion threads per task
- 🔔 **Real-Time Updates:** WebSockets / SSE integration for team session synchronization

---

## 👨‍💻 Author

### Achint Verma

**Full-Stack Developer • Software Engineer**


---

## ⭐ Support

If you liked this project:

⭐ Star the Repository  
🍴 Fork the Project  
🧠 Share Feedback  
🚀 Connect With Me

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 💫 Final Note

### *"Building robust software architectures paired with living, responsive user interfaces."*

Made with ❤️ by **Achint Verma**