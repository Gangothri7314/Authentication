Authentication Demo (Signup, Login & Forgot Password with OTP)

This is a simple authentication system built using Node.js (Backend) and HTML, CSS, JavaScript (Frontend).

It includes:

✅ User Signup

✅ User Login

✅ Forgot Password

✅ OTP sent to Email

✅ Password Reset using OTP

✅ JWT Authentication

🛠️ Tech Stack

Backend:

Node.js

Express.js

bcrypt

jsonwebtoken (JWT)

Nodemailer (for sending OTP email)

MySQL / MongoDB

dotenv

Frontend:

HTML

CSS

JavaScript (Fetch / Axios)

📁 Project Structure
Authentication-Demo/
│
├── Backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── .env
│
├── Frontend/
│   ├── signup.html
│   ├── login.html
│   ├── forgot-password.html
│   ├── reset-password.html
│
└── README.md

🚀 Features
📝 Signup

User registers with name, email, and password

Password is hashed using bcrypt

Data stored in database

🔐 Login

User logs in with email and password

JWT token generated after successful login

🔁 Forgot Password

User enters registered email

OTP is generated

OTP sent to user’s email

User verifies OTP

User sets new password

⚙️ Backend Setup
1️⃣ Go to Backend Folder
cd Backend

2️⃣ Install Dependencies
npm install


If needed manually:

npm install express bcrypt jsonwebtoken nodemailer dotenv cors
npm install mysql2   # if using MySQL
npm install mongoose # if using MongoDB

3️⃣ Create .env File

Inside Backend folder create .env:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=authentication_db

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


⚠️ For Gmail, use App Password, not your normal password.

4️⃣ Run Backend Server
node index.js


OR

npx nodemon index.js


Server runs at:

http://localhost:5000

🌐 Frontend Setup

Go to Frontend folder:

cd ../Frontend


Open signup.html or login.html in browser

OR use Live Server in VS Code.

🔑 API Endpoints
📌 Signup

POST /api/auth/register

📌 Login

POST /api/auth/login

📌 Send OTP

POST /api/auth/forgot-password

📌 Verify OTP & Reset Password

POST /api/auth/reset-password

🔒 Security

Passwords hashed using bcrypt

JWT authentication

OTP verification for password reset

Environment variables stored in .env

👩‍💻 Author

Gangothri Gollaeshwar
Java Full Stack Developer
