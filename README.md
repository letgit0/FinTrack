# FinTrack

> A full-stack **personal finance tracking** application built with the MERN stack — helping you take control of your money through smart categorization, real-time analytics, and a clean, intuitive dashboard.

[![TypeScript](https://img.shields.io/badge/TypeScript-97.5%25-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk&logoColor=white)](https://clerk.com/)

---

## ✨ Features

### 🔐 User Authentication
- Secure sign-in via **Clerk** with support for:
  - Google · GitHub 
- Protected routes — only authenticated users access their data

### 💸 Transaction Management (Full CRUD)
- Add income and expense records
- Edit or delete existing transactions
- View complete transaction history in a structured layout

### 📊 Dynamic Dashboard
- Real-time financial summary — **Total Income**, **Total Expenses**, **Current Balance**
- Automatically updates as transactions are added or modified

### 🏷️ Categorization System
- Assign categories and payment methods to each transaction
- Enables better financial segmentation and analysis

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Vite, React Router, Context API |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Auth** | Clerk |

---

## 📁 Project Structure

```bash
FinTrack/
│
├── client/                  # React + TypeScript frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level pages (Dashboard, Transactions, etc.)
│   │   ├── context/         # Context API for global state
│   │   └── main.tsx
│   ├── .env
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── src/
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route handlers
│   │   └── index.ts
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ✅ Prerequisites

Make sure the following are installed / set up before you begin:

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Clerk](https://clerk.com/) account for authentication keys

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/letgit0/FinTrack.git
cd FinTrack
```

---

## ⚙️ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

Backend runs at → `http://localhost:5000`

---

## 💻 Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 📦 Available Scripts

### Client

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Server

```bash
npm run dev       # Start development server (ts-node / nodemon)
npm run build     # Compile TypeScript to JS
npm start         # Start production server
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🌸 Author

Built with ❤️ by [Smita](https://github.com/letgit0) using React, TypeScript, and Node.js.