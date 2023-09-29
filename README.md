

# Car Marketplace Web Application

Welcome to the Car Marketplace Web Application! This platform allows users to seamlessly buy and sell cars online. With a robust backend supporting user interactions and a responsive frontend, the application provides a complete, user-friendly experience.

## Overview

The Car Marketplace Web Application has been carefully designed to ensure user-friendliness and security. While the frontend provides an interactive platform for users to explore car listings, the backend manages user authentication, session management, and various API endpoints to facilitate these interactions.

---

## Backend Details

### Technologies Used:
- Python
- Flask
- Flask-Bcrypt
- SQLAlchemy
- SQLite
- Flask-CORS

### Installation:
```bash
git clone git@github.com:akaul823/phase4_project.git
cd /server
pipenv install Flask Flask-SQLAlchemy Flask-Migrate Flask-CORS Flask-Bcrypt SQLAlchemy sqlalchemy-serializer
python server/app.py
```

### Core Features:
1. **User Authentication**: Uses Flask-Bcrypt for password hashing and checks credentials during login.
2. **Session Management**: Assigns session IDs upon login, and stores user-specific data. Sessions can be configured to expire for enhanced security.
3. **API Endpoints**: Supports operations like retrieving, adding, editing, and deleting cars, specifications, and user details.

---

## Frontend Details

### Technologies Used:
- Next.js
- Next Router
- React
- Tailwind CSS

### Installation:
```bash
git clone git@github.com:akaul823/phase4_project.git
cd /client
npm install next
npm run dev
```
### Demo:
Placeholder

### Project Structure:
- **/App**: Root of the Next.js application.
- **/Login**: Handles user authentication.
- **/Nav**: Navigation component for the app.
- **/SellCar**: Allows users to list cars.
- **/ProfilePage**: Displays user profile.
- **/Register**: Registration route for new users.
- **/Transactions**: Showcases transaction history.
- **/Mycars**: Lists user's cars.
- **/cars**: Main car listing route.
- **/cars/carId**: Individual car details route.

### Key Components:
- **RootLayout**: Serves as the top-most layout component, providing a consistent structure across pages.
- **UserContext**: Provides global user data using React's useContext hook.
- **Login**: Manages user login and interacts with the backend to authenticate users.

---

## User Authorization and Session Management

Our application uses a synchronized frontend and backend approach for user authorization and session management:

**Frontend**: Utilizes React and Next.js for logging in users and maintaining session persistence. The `UserContext` ensures global access to user data.

**Backend**: Ensures secure user login by hashing passwords with Flask-Bcrypt. A session is initiated upon successful login, with the session ID stored for subsequent user interactions. The server can also terminate sessions during logouts.

---

Thank you for using the Car Marketplace Web Application. Your feedback is always appreciated!
