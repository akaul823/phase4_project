import { UserProvider } from "./UserContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
// import { AuthProvider } from "./AuthContext";

// export default function MyApp({ Component, pageProps }) {
//   return (
//     <AuthProvider>
//       {/* Rest of your layout or app components */}
//       <Component {...pageProps} />
//     </AuthProvider>
//   );
// }
