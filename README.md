📚 MERN Stack Learning Management System (LMS)
A full-stack Learning Management System (LMS) built using the MERN stack — designed for course creation, purchase, enrollment, and progress tracking. This is my first major Web Development project, built to demonstrate solid backend logic, secure authentication, and real-world architecture.

🚀 Features
🧑‍🎓 User Authentication (JWT + Cookie)
🧑‍🏫 Instructor Dashboard for Course & Lecture Management
💳 Stripe Payments for Secure Checkout
📦 Cloudinary Integration for Image & Video Uploads
📊 Lecture-wise Progress Tracking per User
🔍 Course Search with Category and Price Filters
📁 Role-based Access (Student / Instructor)
🔐 Protected Routes via Custom Middleware
🎯 Built with RTK Query, Redux Toolkit, React Router, Mongoose
🛠️ Tech Stack
Frontend:
React.js + Vite
Redux Toolkit + RTK Query
Tailwind CSS + ShadCN/UI
React Router DOM
React Toast Notifications (Sonner)
Backend:
Node.js + Express.js
MongoDB with Mongoose ODM
JWT Authentication
Cloudinary (Image & Video Hosting)
Multer (File Upload Middleware)
Stripe (Payment Gateway)
🔐 Authentication Flow
Passwords hashed via bcrypt
JWT generated and stored in HTTP-only cookies
Authenticated users protected via custom isAuthenticated middleware
On app load, user session restored using RTK Query loadUser API
💳 Payment & Enrollment
Users can purchase paid courses using Stripe Checkout
Upon success, lectures are unlocked & progress tracking begins
Course and user enrollment updated in MongoDB
📽️ Media Handling
Images and videos are uploaded using Multer and stored on Cloudinary
Cloudinary’s publicId is used for updating/deleting media securely
Profile photos and course thumbnails are served via secure URLs
📊 Progress Tracking
Each user’s course progress is stored in a CourseProgress document
Users can mark lectures as watched
Full completion marks the course as "Completed"
🧠 Concepts Demonstrated
RESTful API Design
Full-Stack Authentication
RTK Query Integration
Protected Routes & Role-Based Access
Cloud File Management (Cloudinary)
Stripe Webhooks & Metadata Handling
Redux Architecture + Centralized State Management
Clean MVC Pattern in Express.js
📷 Screenshots
Add screenshots of:

Landing page
Instructor Dashboard
Course creation form
Lecture list
Stripe Checkout page
Course progress bar
✅ How to Run Locally
Backend
cd server
npm install
npm run dev
