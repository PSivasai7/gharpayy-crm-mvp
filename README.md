# Gharpayy Lead Management System (MVP)

A custom internal CRM system designed to ensure every lead is captured, assigned, tracked, and converted efficiently. Built as a Minimum Viable Product (MVP) for the Gharpayy CRM Assignment.

---

## 🚀 Core Features

This application successfully implements all mandatory assignment objectives:

### Automated Lead Capture
A universal webhook (`/api/leads/webhook`) captures leads automatically from external sources (Tally, Calendly, Google Forms) without manual entry.

### Intelligent Lead Assignment
Implements a backend round-robin algorithm to ensure every lead has exactly one clear owner.

### Pipeline Management
Features both a **Kanban Board** and a **List View** to track conversations and move leads across all required stages.

### Visit Scheduling
Dedicated UI and database schemas for agents to:
- Select a property
- Choose a visit date/time
- Mark the visit outcome

### Automated Follow-up Reminders
A **Node.js background cron job** checks for leads inactive for **24 hours** and flags a **Day 1 follow-up reminder** on the dashboard.

### Real-time Dashboard
Displays:
- Total leads received
- Leads in each pipeline stage
- Visits scheduled
- Bookings confirmed

---

## ⭐ Bonus Features Implemented

To go beyond the basics, the following advanced features were added to showcase system thinking and product design:

### WhatsApp API Integration Concept
One-click chat buttons dynamically generated from lead phone numbers.

### Lead Activity Timeline
An embedded audit trail in the database tracks every interaction and stage change for full historical visibility.

### Agent Performance Leaderboard
Automatically calculates and ranks top-performing agents based on confirmed bookings.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|-------------|
| Database | MongoDB, Mongoose |
| Backend | Node.js, Express.js, node-cron |
| Frontend | React (Vite), Tailwind CSS, Axios |

---

## 💻 Local Setup Instructions

Follow these steps to run the working MVP on your local machine.

### Prerequisites
- Node.js installed on your machine
- A MongoDB connection string (URI)

---

## 1️⃣ Backend Setup

Open your terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

Start the backend server:

```bash
node server.js
```

---

## 2️⃣ Database Seeding (Recommended)

To populate the database with test agents and trigger the webhook with dummy leads, open a **second terminal window** in the backend folder and run:

```bash
node seed.js
```

---

## 3️⃣ Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to the local host URL provided by **Vite** (usually):

```
http://localhost:5173
```

---

## 📌 Project Goal

The goal of this project is to demonstrate how a lightweight CRM can:
- Capture leads automatically
- Assign ownership intelligently
- Track lead lifecycle
- Improve conversion efficiency
- Provide operational visibility for teams

---

## 📄 License

This project was created as part of the **Gharpayy CRM Assignment** and is intended for demonstration purposes.
