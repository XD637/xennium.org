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

  openGraph: {
    title: "Xennium - Next Gen Crypto",
    description: "Discover the power of Xennium Token (XENX), the future of cryptocurrency.",
    url: "https://xennium.org", // Update this if necessary
    image: "https://xennium.org/Xen.png", // Ensure this image exists in public folder
  },
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
