import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';  // Import the App component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Xennium",
  description: "NEXT GEN CRYPTO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrapping children inside App component */}
        <App>{children}</App>
      </body>
    </html>
  );
}
