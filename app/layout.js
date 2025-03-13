import Providers from "./Provider";
import App from "./App"; // Import the App component
import Script from "next/script"; // Import the Script component for external scripts
import { SpeedInsights } from "@vercel/speed-insights/next"; // Import SpeedInsights
import localFont from "next/font/local";

import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
    description:
      "Discover Xennium Token (XENX), With It's unique rule - Last Coin Transfer Restriction (LCTR), It is the way of modern utility token",
    url: "https://xennium.org", // Update this if necessary
    image: "https://xennium.org/Xen.png", // Ensure this image exists in the public folder
  },
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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

        {/* Speed Insights */}
        <SpeedInsights />

        {/* Wrap with Redux Provider */}
        <Providers>
          <App session={session}>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
