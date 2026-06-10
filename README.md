# EduCanvas — GenAI Curriculum Platform

AI-powered educational curriculum design and student access portal built with React, Node.js, Firebase, and Groq API.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Recharts
- **Backend:** Node.js + Express (Groq API proxy)
- **Database & Auth:** Firebase Firestore + Firebase Authentication
- **AI:** Groq API (`llama3-70b-8192`)

## Quick Start

### 1. Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Register a web app and copy config values
3. Enable **Email/Password** authentication
4. Create Firestore database (production mode)
5. Paste rules from `firestore.rules` into Firestore Rules tab → Publish

### 2. Groq API Key

1. Get an API key from [console.groq.com](https://console.groq.com)
2. Add to `server/.env`

### 3. Environment Files

```bash
# server/.env
cp server/.env.example server/.env
# Edit GROQ_API_KEY

# client/.env
cp client/.env.example client/.env
# Edit VITE_FIREBASE_* values
```

### 4. Install & Run

```bash
# Server (port 5000)
cd server
npm install
npm run dev

# Client (port 3000) — new terminal
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## User Roles

| Role | Features |
|------|----------|
| **Teacher** | Generate AI curricula, post/edit/delete, PDF export, enrollment analytics, history with snapshots |
| **Student** | Browse college-scoped curricula, enroll, download PDFs, view history |

## College Access Control

Students only see curricula where `college` matches their profile. Enforced in Firestore queries and security rules.

## Project Structure

```
genai-curriculum-platform/
├── client/          # React frontend
├── server/          # Express + Groq proxy
├── firestore.rules  # Firebase security rules
└── README.md
```

## Recommended Firestore Indexes

Create composite indexes if prompted by console errors:

- `curricula`: `college` ASC, `isPublished` ASC, `postedAt` DESC
- `teacherHistory/{uid}/entries`: `timestamp` DESC
- `studentHistory/{uid}/entries`: `timestamp` DESC

---

*SmartBridge / Skill Wallet · v1.0.0*
