# Car Marketplace Web Application - Backend

Welcome to the backend of the Car Marketplace Web Application! This backend code is responsible for handling user authentication, session management, and various API endpoints to support the functionality of the Car Marketplace Web Application.

## Introduction

The Car Marketplace Web Application is designed to provide users with a platform to buy and sell cars online. This backend code is a crucial part of the application, handling user authentication, session management, and serving various API endpoints to facilitate user interactions.

## Technologies Used

- Python
- Flask
- Flask-Bcrypt
- SQLAlchemy
- SQLite
- Flask-CORS

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:akaul823/phase4_project.git
   cd /server
   ```

2. Install the required dependencies:
   ```sh
   pipenv install Flask Flask-SQLAlchemy Flask-Migrate Flask-CORS Flask-Bcrypt SQLAlchemy sqlalchemy-serializer
   ```

3. Run the Flask application:
   ```sh
   python server/app.py
   ```

## User Authentication

User authentication is essential to ensure the security of user accounts. Here's an overview of how user authentication works in the backend:

1. **Registration**: During user registration, passwords are securely hashed using Flask-Bcrypt. Hashed passwords are stored in the database for security.

2. **Login**: Users can log in using their username and password. Passwords are compared with hashed passwords stored in the database using Flask-Bcrypt's password checking mechanism. If they match, users are authenticated.

3. **Session Management**: After successful login, a session is established. A session ID is generated and stored in the Flask session. The session ID is also added to the `GLOBAL_SESSIONS` set, indicating an active session. The user's ID is stored in the session for user-specific data retrieval.

## Session Management

Session management ensures the persistence of user data and authentication state across different interactions within the application. Here's how session management is implemented:

1. **Session ID**: Each login generates a new session ID. This ID identifies the user's session in subsequent requests.

2. **Session Data**: The Flask session stores user-related information. In our implementation, the `user_id` is stored, allowing identification of the logged-in user and personalized data retrieval.

3. **Session Expiry**: While not explicitly shown in the code, sessions can be configured to expire after a period of inactivity or a specific time to enhance security.

4. **Logout**: Logging out terminates the session. The session ID is removed from both the Flask session and the `GLOBAL_SESSIONS` set, ending the user's session.

## API Endpoints

The backend code provides various API endpoints to support the Car Marketplace Web Application's functionality. These endpoints include:

- `/cars`: Retrieve or add cars to the database.
- `/cars/<int:id>`: Get, edit, or delete a specific car based on its ID.
- `/specs`: Retrieve or add specifications for cars.
- `/specs/<int:car_id>`: Get, edit, or delete specifications for a specific car.
- `/users/<int:id>`: Get or edit user information.
- `/registration`: Register a new user.
- `/transactions`: Retrieve or add transactions (car purchases) in the database.
- `/session`: Retrieve session information for the logged-in user.
- `/login`: User login to establish a session.
- `/logout`: Terminate the user's session.

---
For detailed code implementation and explanations, refer to the backend code files.
