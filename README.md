# Sai Scissors Men's Parlour

[![Live Demo](https://img.shields.io/badge/Live_Demo-sai--scissors.vercel.app-C9A84C?style=for-the-badge&logo=vercel)](https://sai-scissors.vercel.app/)

**Sai Scissors** is a premium, modern booking and management platform designed specifically for a luxury men's salon. Built with a focus on high-end aesthetics (dark theme with gold accents) and a perfect mobile-first user experience. 

It provides an end-to-end solution including a public website, an AI-powered styling assistant, an Admin Dashboard for operations, and a Barber Portal for staff management.

---

## 🌟 Key Features

### For Customers
*   **Premium Public Website:** Fast, responsive, and beautifully designed using modern CSS techniques (glassmorphism, Framer Motion animations).
*   **Seamless Booking Flow:** An intuitive multi-step booking process allowing customers to select services, choose a specific barber, and pick available time slots.
*   **AI Grooming Assistants:** Integrated with Google Gemini to offer intelligent, personalized advice for hairstyles, grooming routines, and product recommendations based on face shape and hair type.

### For Admins
*   **Centralized Dashboard:** Monitor daily bookings, revenue, and top-performing services at a glance.
*   **Booking & Schedule Management:** Approve, cancel, or mark bookings as complete. 
*   **CMS & Gallery Management:** Easily update hero banners, services, offers, and upload to the gallery (integrated with Cloudinary).
*   **Review Moderation:** Approve or reject customer reviews before they appear on the public site.

### For Barbers
*   **Personalized Portal:** Dedicated dashboard for barbers to track their daily schedule, manage their availability, and view their service history.

---

## 🛠 Tech Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore, Authentication)
*   **AI Integration:** [Google Gemini API](https://ai.google.dev/)
*   **Media Storage:** [Cloudinary](https://cloudinary.com/)
*   **Icons & Animation:** Lucide React, Framer Motion
*   **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/ThirupathiBurra/SaiScissors.git
cd SaiScissors
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add the following variables. (Refer to `.env.example` for the template):

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary Setup (For Gallery & CMS Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Project Structure

```text
├── app/               # Next.js App Router pages and layouts (Admin, Barber, Booking, AI, etc.)
├── components/        # Reusable React components (UI, Sections, Modals)
├── hooks/             # Custom React hooks containing business logic & state
├── lib/               # Utility libraries (Firebase client/admin init, Gemini AI engine, Cloudinary)
├── repositories/      # Data access layer (Firestore CRUD operations)
├── types/             # TypeScript interfaces and type definitions
├── constants/         # Global constants (Roles, Routes, Status enums)
└── public/            # Static assets and images
```

---

## ☁️ Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Add the Environment Variables listed in `.env.local` into the Vercel project settings.
4. Click Deploy.

*(The `GEMINI_API_KEY` and `CLOUDINARY_API_SECRET` must not have the `NEXT_PUBLIC_` prefix to ensure they remain securely on the server-side).*
