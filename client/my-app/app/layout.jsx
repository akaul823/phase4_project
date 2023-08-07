import "@styles/globals.css";
import Nav from "../components/Nav";

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
  //   <div>layout</div>;
};

export default RootLayout;
