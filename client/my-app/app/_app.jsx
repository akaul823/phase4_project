import { AuthProvider } from "./AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* Rest of your layout or app components */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
