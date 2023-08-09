// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  // console.log(loggedInUser);
  const logIn = (user) => {
    setLoggedInUser(user);
    console.log(user);
    console.log(loggedInUser);
  };

  const logOut = () => {
    setLoggedInUser(null);
  };
  fetch("127.0.0.1:5555/session")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((user) => {
      if (user) {
        setLoggedInUser(user);
      }
    });

  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
