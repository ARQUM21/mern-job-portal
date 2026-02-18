# 🚀 MERN Job Portal - Full Stack Recruitment Platform

<div align="center">

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)

**A Modern, Production-Ready Job Board & Recruitment Management System**

[Live Demo](https://your-demo-link.com) • [Documentation](#documentation) • [Report Bug](https://github.com/ARQUM21/mern-job-portal/issues) • [Request Feature](https://github.com/ARQUM21/mern-job-portal/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**MERN Job Portal** is a comprehensive full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This modern job board platform connects job seekers with employers, featuring an intuitive interface for job postings, applications, and recruitment management.

### 🎯 Perfect For:
- Job seekers looking for opportunities
- Companies posting job openings
- HR departments managing recruitment
- Freelancers and recruiters
- Career development platforms

---

## ✨ Key Features

### 👥 For Job Seekers
- ✅ **Browse Jobs** - Search and filter through thousands of job listings
- 📄 **Easy Applications** - One-click apply with resume upload
- 📊 **Application Tracking** - Monitor application status in real-time
- 🔔 **Job Alerts** - Get notified about new opportunities
- 💼 **Profile Management** - Create and manage professional profile

### 🏢 For Recruiters/Companies
- 📝 **Post Jobs** - Create detailed job postings with rich text editor
- 👨‍💼 **Manage Applications** - Review, accept, or reject candidates
- 📈 **Dashboard Analytics** - Track job performance and applicants
- 🎯 **Candidate Management** - Organize and filter applications
- 🔒 **Secure Authentication** - Protected recruiter dashboard

### 🎨 User Experience
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🌓 **Modern UI/UX** - Clean, professional interface with Tailwind CSS
- ⚡ **Fast Performance** - Optimized loading and smooth transitions
- 🔍 **Advanced Search** - Filter by location, category, level, salary
- 📦 **File Management** - Resume upload and download functionality

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Quill** - Rich text editor
- **Clerk** - User authentication
- **Moment.js** - Date formatting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Git** - Version control
- **Vercel** - Deployment platform

---

## 📸 Screenshots

### Home Page
![Home Page](screenshot-url-here)

### Job Listings
![Job Listings](screenshot-url-here)

### Recruiter Dashboard
![Dashboard](screenshot-url-here)

### Application Management
![Applications](screenshot-url-here)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Quick Start
```bash
# Clone the repository
git clone https://github.com/ARQUM21/mern-job-portal.git

# Navigate to project directory
cd mern-job-portal

# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install

# Set up environment variables (see below)

# Run development servers
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

Visit `http://localhost:5173` for frontend and `http://localhost:4000` for backend.

---

## ⚙️ Installation

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=4000
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

4. Start development server:
```bash
npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Server
PORT=4000
NODE_ENV=development

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
# Backend API
VITE_BACKEND_URL=http://localhost:4000

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
```

---

## 📁 Project Structure
```
mern-job-portal/
├── client/                  # Frontend React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images, icons, data
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── JobCard.jsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── ApplyJob.jsx
│   │   │   ├── Applications.jsx
│   │   │   └── Dashboard/
│   │   ├── context/        # React context
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Backend Node.js application
│   ├── controllers/        # Request handlers
│   │   ├── companyController.js
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── models/             # Database models
│   │   ├── Company.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── User.js
│   ├── routes/             # API routes
│   │   ├── companyRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/         # Custom middleware
│   │   └── authMiddleware.js
│   ├── config/             # Configuration files
│   │   └── db.js
│   ├── server.js           # Entry point
│   └── package.json
│
└── README.md               # You are here!
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### User Authentication (Clerk)
```http
POST /api/users/register
POST /api/users/login
GET /api/users/profile
PUT /api/users/update-resume
```

#### Company Authentication
```http
POST /api/company/register
POST /api/company/login
```

### Job Endpoints
```http
GET /api/jobs              # Get all jobs
GET /api/jobs/:id          # Get single job
POST /api/jobs             # Create job (Auth required)
PUT /api/jobs/:id          # Update job (Auth required)
DELETE /api/jobs/:id       # Delete job (Auth required)
```

### Application Endpoints
```http
GET /api/applications           # Get user applications
POST /api/applications/:jobId   # Apply for job
PUT /api/applications/:id       # Update status (Recruiter only)
```

---

## 🎨 Features in Detail

### Job Search & Filtering
- **Category Filter** - Programming, Design, Marketing, etc.
- **Location Filter** - Remote, On-site, Hybrid options
- **Experience Level** - Entry, Mid, Senior positions
- **Salary Range** - Filter by compensation
- **Keyword Search** - Find specific job titles

### Application Management
- **Status Tracking** - Pending, Accepted, Rejected
- **Resume Management** - Upload and update resume
- **Application History** - View all past applications
- **Email Notifications** - Get updates on application status

### Recruiter Dashboard
- **Job Analytics** - View applicant count and trends
- **Applicant Screening** - Review candidate profiles
- **Bulk Actions** - Accept/reject multiple applications
- **Job Visibility** - Show/hide job postings

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Muhammad Arqum**

- GitHub: [@ARQUM21](https://github.com/ARQUM21)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Clerk Authentication](https://clerk.com)

---

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/ARQUM21/mern-job-portal?style=social)
![GitHub forks](https://img.shields.io/github/forks/ARQUM21/mern-job-portal?style=social)
![GitHub issues](https://img.shields.io/github/issues/ARQUM21/mern-job-portal)
![GitHub license](https://img.shields.io/github/license/ARQUM21/mern-job-portal)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ by [Muhammad Arqum](https://github.com/ARQUM21)

</div>
