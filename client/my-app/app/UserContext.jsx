import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    async function fetchAndSetUser() {
      try {
        const response = await fetch("http://127.0.0.1:5555/session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          if (user) {
            setLoggedInUser(user);
          } else {
            // console.log(loggedInUser);
          }
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      console.log("Fetch and state update complete.");
    }
    fetchAndSetUser();
  }, []);
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}
