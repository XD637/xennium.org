import localFont from "next/font/local";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App"; // Import the App component
import Script from "next/script"; // Import the Script component for external scripts
import { SpeedInsights } from "@vercel/speed-insights/next"; // Import SpeedInsights

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
    image: "https://xennium.org/Xen.png", // Ensure this image exists in the public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-23X6JNL9XL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-23X6JNL9XL');
          `}
        </Script>

        {/* Google reCAPTCHA v3 */}
        <Script
  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
  strategy="lazyOnload"
/>


        {/* Speed Insights */}
        <SpeedInsights />

        {/* Wrapping children inside App component */}
        <App>{children}</App>
      </body>
    </html>
  );
}
