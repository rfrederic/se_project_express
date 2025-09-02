# WTWR (What to Wear?) — Back End

This project is the **back-end server** for the WTWR application.  
It provides an API for managing users and clothing items, with support for authentication and secure data handling.

The server connects to a MongoDB database and implements proper error handling, validation, and RESTful routing.  
It is designed as part of the full-stack WTWR application, which helps users choose what to wear depending on the weather.

---

## Functionality

- User registration and authentication
- CRUD operations for clothing items (create, read, delete)
- Secure storage of user data (passwords hashed)
- Error handling with proper status codes
- Centralized validation using `celebrate` and `Joi`
- MongoDB database integration via Mongoose

---

## Technologies Used

- **Node.js & Express** — server and routing
- **MongoDB & Mongoose** — database and ODM
- **Nodemon** — hot reload during development
- **Celebrate/Joi** — input validation
- **dotenv** — environment variable management
- **ESLint** — code linting and style consistency

---

## Running the Project

```bash
npm run start     # Launch the server
npm run dev       # Launch the server with hot reload
```
