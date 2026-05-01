# Syncro - MERN Chat Application
Syncro is a real-time, full-stack chat application built using the MERN stack. It features secure user authentication with OTP verification, private messaging, and a modern, responsive user interface.

## 🚀 Live Demo
Frontend: https://syncro-mern-chat-app.vercel.app

Backend API: https://syncro-mern-chat-app.onrender.com

## 🛠 Architecture Overview
Syncro utilizes a decoupled architecture to ensure scalability and performance:

Frontend (Vercel): React, Redux Toolkit, Tailwind CSS, and Socket.io-client.

Backend (Render): Node.js, Express, and Socket.io.

Database: MongoDB Atlas (using Mongoose).

Storage: Cloudinary for user avatars and media.

Email Service: Brevo for transactional OTP verification emails.

## ✨ Features
Real-Time Messaging: Instant message delivery using WebSockets (Socket.io).

Secure Authentication: JWT-based authentication with OTP email verification via Brevo.

User Profiles: Customizable profiles with image uploading via Cloudinary.

Conversation Management: Organized message history and active conversation tracking.

Responsive UI: Fully optimized for mobile, tablet, and desktop screens.

## ⚙️ Installation & Setup
### Prerequisites
Node.js (v24+ recommended)

MongoDB Atlas Account

Brevo SMTP Account

Cloudinary Account

### 1. Clone the Repository
Bash
git clone https://github.com/mubix-dev/Syncro-Mern-Chat-App.git
cd Syncro-Mern-Chat-App
### 2. Backend Setup
Navigate to the backend directory.

Install dependencies: npm install.

Create a .env file and add the following:

### Code snippet
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://syncro-mern-chat-app.vercel.app
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_user
SMTP_PASS=your_brevo_password
SENDER_EMAIL=your_verified_email
Start the server: npm start.

### 3. Frontend Setup
Navigate to the frontend directory.

Install dependencies: npm install.

Update your API_BASE_URL to point to your Render backend.

Start the development server: npm run dev.

### 🛡 Security Implementation
The project follows a secure OTP flow:

Signup: User details are temporarily stored in a TempUser collection in MongoDB.

Verification: An OTP is sent to the user's email.

Completion: Upon correct OTP entry, the user is moved to the permanent Verified User collection, and a JWT is issued.

## 📄 License
Distributed under the MIT License.

## 👥 Contact
Mubeen Khan - GitHub
