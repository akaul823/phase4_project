# Car Marketplace Web Application - Frontend

Welcome to the frontend of the Car Marketplace Web Application! This frontend code is responsible for creating an intuitive and user-friendly interface for users to buy and sell cars online.

## Introduction

The Car Marketplace Web Application frontend provides an engaging user experience for individuals looking to explore and interact with car listings and transactions. It's built with a modern approach to ensure responsiveness and seamless navigation.

## Technologies Used

- Next.js
- Next Router
- React
- Tailwind CSS

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:akaul823/phase4_project.git
   cd /client
   ```

2. Install the required dependencies:
   ```sh
   npm install next
   ```

3. Run the application:
   ```sh
   npm start
   ```

## Project Structure

The frontend codebase is organized as follows:

- **/App**: The root folder containing the Next.js application.
  - **/Login**: The route for user authentication and login.
  - **/Nav**: The navigation component for consistent navigation throughout the app.
  - **/SellCar**: The route for users to list their cars for sale.
  - **/ProfilePage**: The user profile page showing personal information.
  - **/Register**: The route for new user registration.
  - **/Transactions**: The route displaying transaction history.
  - **/Mycars**: The user's own cars listing.
  - **/cars**: The main cars listing route.
  - **/cars/carId**: The route for individual car details.

The application follows a component hierarchy where the highest-level layout is managed by the `RootLayout` component, and different pages are rendered within it.

## Key Components

### RootLayout

The `RootLayout` component serves as the highest-level layout component. It wraps the entire application and provides a consistent structure across different pages.

```jsx
import React from "react";
import { UserProvider } from "./UserContext";
import Nav from "./Nav/Nav";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Nav />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

### UserContext

The `UserContext` context provides global user data using the `useContext` hook. It fetches the user's data upon initialization and makes it available throughout the application.

```jsx
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // ...
  // (UserProvider implementation, fetch user data)
  // ...
}
```

### Login

The `Login` component handles user authentication by sending login requests to the backend API. It uses the `UserContext` to manage user data.

```jsx
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // ...
  // (Login component implementation)
  // ...
};
```

Certainly! Here's an updated explanation in your README about how user authorization and session management work in your frontend codebase:

---

## User Authorization and Session Management

In this project, user authorization and session management play a crucial role in providing a secure and seamless experience for users. This is achieved through a combination of frontend and backend code. Let's dive into how it works:

### Frontend: User Authentication/Session Persistence

In the frontend code, user authentication is handled using React and the Next.js framework. The `Login` component is responsible for handling user login. Here's a breakdown of how it works:

1. When a user enters their credentials and clicks the "Sign in" button, the `handleLogIn` function is triggered.
2. The `handleLogIn` function constructs a `fetch` request to the server's login endpoint (`http://127.0.0.1:5555/login`). It sends the user's credentials in the request body as JSON.
3. The `credentials: "include"` option is set in the fetch request headers, indicating that cookies should be included with cross-origin requests.
4. If the server responds with a successful status (200 OK), the user's data is extracted from the response JSON, and the `setLoggedInUser` function from the `UserContext` is used to update the user's login status in the application.

### Backend: Server-Side Session Management

The backend of the application (not provided in this documentation) plays a vital role in session management. When a user successfully logs in, the server creates a session and assigns a session cookie. This cookie is sent with subsequent requests, enabling the server to identify and authenticate the user.

It's important to note that this documentation focuses on the frontend implementation of user authorization and session management. The backend part, including the server-side session management, is essential to make the entire process secure and functional.


