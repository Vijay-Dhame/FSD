# Student Feedback Review System

## Overview
A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It features user authentication, protected routes, modern visual design, and CRUD operations for managing student feedback.

## Features
- **User Authentication**: Secure JWT-based login and signup.
- **Feedback Management**: Logged-in users can submit feedback with topics, ratings (1-5 stars), and detailed comments.
- **Filtering**: View all feedbacks and filter them dynamically by subject and rating.
- **Modern UI**: Dark mode premium aesthetic, fluid animations, and responsive components.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on standard port `27017`

### 1. Backend Setup
The backend runs on port 5000. It connects to the local MongoDB database mongodb://127.0.0.1:27017/student-feedback.

```bash
cd server
npm install
npm run dev
```

### 2. Frontend Setup
The frontend runs on port 5173.

```bash
cd client
npm install
npm run dev
```

Then visit `http://localhost:5173` in your browser.
