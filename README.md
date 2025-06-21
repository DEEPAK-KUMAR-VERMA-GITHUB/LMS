# 📚 LMS (Learning Management System)

A full-featured, modern Learning Management System (LMS) built with the latest technologies for seamless online education, course management, analytics, and user engagement. This project is divided into a **Next.js + React** frontend and a robust **Node.js + Express** backend, with real-time features, analytics, and a beautiful, responsive UI.

---

## 🌟 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Frontend](#frontend-setup)
  - [Backend](#backend-setup)
- [Core Features & Modules](#core-features--modules)
- [Security & Best Practices](#security--best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

### User Features
- **Authentication**: Secure login, signup, and email verification.
- **Profile Management**: Update profile, change password, view enrolled courses.
- **Course Catalog**: Browse, search, and filter courses by category or keyword.
- **Course Details**: View course content, media, and details.
- **Course Player**: Stream video lessons, track progress, and access resources.
- **Enroll & Payment**: Stripe-powered checkout for course enrollment.
- **Reviews & Ratings**: Leave feedback and rate courses.
- **FAQ & Support**: Access frequently asked questions and support.

### Admin Features
- **Dashboard**: Overview of platform metrics and quick actions.
- **Course Management**: Create, edit, preview, and delete courses.
- **Content Management**: Add sections, videos, resources, and quizzes.
- **User Management**: View, search, and manage all users.
- **Order & Invoice Management**: Track enrollments, payments, and invoices.
- **Analytics**: Visualize user, course, and order analytics with charts.
- **Customization**: Edit homepage hero, categories, and FAQ.
- **Notifications**: Real-time notifications for new orders and events.
- **Team Management**: Manage admin and support team members.

### Platform Features
- **Responsive Design**: Fully responsive and mobile-friendly UI.
- **Dark Mode**: Theme switcher for light/dark mode.
- **Real-Time**: Socket.io-powered notifications and updates.
- **Security**: Protected routes, anti-copy, and anti-devtools measures.
- **SEO Optimized**: Meta tags, keywords, and best practices for discoverability.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**: App router, SSR, and modern React features.
- **React 19**: Component-based UI, hooks, and context.
- **Redux Toolkit**: State management for user, course, and admin data.
- **Material UI (MUI)**: Professional, accessible UI components.
- **Tailwind CSS**: Utility-first CSS for rapid styling.
- **Socket.io Client**: Real-time communication for notifications.
- **Stripe.js**: Secure payment integration.
- **Formik & Yup**: Form management and validation.
- **React Hot Toast**: Beautiful notifications.
- **Timeago.js**: Human-readable timestamps.
- **React Icons**: Iconography.
- **Next Themes**: Dark/light mode support.

#### Dev Tools
- **ESLint**: Linting and code quality.
- **TypeScript**: Type safety and modern JS features.

### Backend

- **Node.js & Express**: Fast, scalable server.
- **MongoDB & Mongoose**: Flexible, schema-based NoSQL database.
- **Socket.io**: Real-time server for notifications and updates.
- **JWT**: Secure authentication and authorization.
- **Bcrypt.js**: Password hashing.
- **Cloudinary**: Media storage and management.
- **Stripe**: Payment processing.
- **Nodemailer**: Email notifications (activation, order confirmation, etc).
- **Redis**: Caching and session management.
- **EJS**: Email templating.
- **Express Rate Limit**: API rate limiting and security.
- **Dotenv**: Environment variable management.

#### Dev Tools
- **TypeScript**: Type safety.
- **ts-node-dev**: Fast development with hot reload.

---

## 🗂️ Project Structure

```
lms/
  frontend/
    app/
      components/      # All UI components (Admin, Auth, Course, Profile, etc.)
      pages/           # API routes (Next.js)
      redux/           # Redux slices and API logic
      styles/          # Global and component styles
      utils/           # Utility functions and helpers
      ...              # Feature directories (admin, courses, profile, etc.)
    public/            # Static assets (images, icons)
    ...                # Config, README, etc.
  server/
    controllers/       # Express controllers for all resources
    models/            # Mongoose models
    routes/            # API endpoints
    middleware/        # Auth, error handling, etc.
    utils/             # Utility functions (JWT, mail, etc.)
    db/                # Database and Redis connection
    mails/             # EJS email templates
    ...                # Config, README, etc.
```

---

## ⚡ Getting Started

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   # or yarn or pnpm
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file based on your deployment needs (MongoDB URI, JWT secret, Stripe keys, etc).

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **API will be available at:**
   - [http://localhost:5000](http://localhost:5000) (or your configured port)

---

## 🧩 Core Features & Modules

### User Side

- **Authentication:** Email/password, session management, and verification.
- **Course Catalog:** Browse, search, and filter courses.
- **Course Player:** Stream video, view resources, and track progress.
- **Profile:** Manage personal info, enrolled courses, and password.
- **Checkout:** Secure Stripe payments for course enrollment.
- **Reviews:** Submit and view course reviews.
- **FAQ & Policy:** Access platform FAQs and policies.

### Admin Side

- **Dashboard:** Metrics, quick links, and notifications.
- **Course Management:** Create, edit, preview, and delete courses.
- **Content Management:** Add videos, sections, and resources.
- **User Management:** View and manage all users.
- **Order Management:** Track orders, payments, and invoices.
- **Analytics:** Visualize platform data with charts.
- **Customization:** Edit homepage hero, categories, and FAQ.
- **Notifications:** Real-time updates for new events.
- **Team Management:** Manage admin/support team.

### Platform

- **Real-Time:** Socket.io for notifications and updates.
- **Security:** Protected routes, anti-copy, anti-devtools, and rate limiting.
- **SEO:** Optimized meta tags and keywords.
- **Responsive:** Mobile-first, accessible design.
- **Dark Mode:** User-selectable theme.

---

## 🔒 Security & Best Practices

- **Protected Routes:** Only authenticated users/admins can access sensitive pages.
- **Rate Limiting:** Prevents API abuse.
- **Password Hashing:** All passwords are securely hashed.
- **JWT Auth:** Secure, stateless authentication.
- **Anti-Copy & DevTools:** Client-side measures to deter copying and devtools access.
- **Environment Variables:** Sensitive data is never hardcoded.

---

## 🤝 Contributing

We welcome contributions! Please open issues and pull requests for improvements, bug fixes, or new features.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

> Built with ❤️ by Deepak Kumar Verma and contributors.
