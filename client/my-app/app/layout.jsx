"use client"
import "@styles/globals.css";
// import Nav from "./Nav/Nav";

// export const metadata = {
//   title: "Cars",
//   description: "Trade or Buy Cars",
// };
// const RootLayout = ({ children }) => {
//   return (
//     <html lang="en">
//       <body>
//         <Nav />
//         <main>{children}</main>
//       </body>
//     </html>
//   );
// };

// export default RootLayout;
import React from 'react';
import Nav from './Nav/Nav';
import { UserProvider } from './UserContext'; // Import the UserProvider

// export const metadata = {
//   title: "Cars",s
//   description: "Trade or Buy Cars",
// };

const RootLayout = ({ children }) => {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Nav />
          <main>{children}</main>
        </body>
      </html>
    </UserProvider>
  );
};

export default RootLayout;
