WTWR (What to Wear?) — Back End

This project is the back-end server for the WTWR (What to Wear?) application.
It provides an API for managing users and clothing items, with authentication and secure data handling.

The server connects to a MongoDB database and implements proper error handling, validation, and RESTful routing.
It’s part of a full-stack application that helps users decide what to wear depending on the weather.

Functionality

👤 User registration and authentication (JWT-based)
👕 CRUD operations for clothing items (Create, Read, Delete)
🔒 Secure password hashing with bcrypt
⚠️ Error handling with standardized status codes
✅ Centralized validation using Celebrate/Joi
🗄️ MongoDB integration via Mongoose

Technologies Used

Node.js & Express — server and routing
MongoDB & Mongoose — database and ODM
PM2 — process manager for production
Celebrate/Joi — validation
dotenv — environment variable management
Winston & Morgan — logging
ESLint — code style consistency

Running the Project

npm run start # Launch the server
npm run dev # Launch the server with hot reload (Nodemon)
MongoDB must be running locally or accessible remotely.

🌐 Deployed Project Links

Backend domain: https://api.wearapp.jumpingcrab.com
Frontend GitHub repo: https://github.com/rfrederic/se_project_react
Live frontend: https://wearapp.jumpingcrab.com

🎥 Project Pitch Video
Check out [![Watch the video] (https://youtu.be/YrTK34LsiyQ)] where I present the project, explain my process, and describe the challenges I overcame while building it.
