import "@styles/globals.css";
import Nav from "./Nav/Nav";

export const metadata = {
  title: "Cars",
  description: "Trade or Buy Cars",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;