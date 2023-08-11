"use client";
import "@styles/globals.css";
import { UserProvider } from "./UserContext";
import Nav from "./Nav/Nav";

// export const metadata = {
//   title: "Cars",s
//   description: "Trade or Buy Cars",
// };

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
