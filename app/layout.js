import Providers from "./Provider";
import App from "./App";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/* Load Funnel Font */
const funnel = localFont({
  src: "./fonts/Funnel.ttf",
  variable: "--font-funnel",
  weight: "400", // Adjust weight if needed
  display: "swap", // Improves FCP
});

export const metadata = {
  title: "Xennium",
  description: "NEXT GEN CRYPTO",
  openGraph: {
    title: "Xennium - Next Gen Crypto",
    description:
      "Discover Xennium Token (XENX), With Its unique rule - Last Coin Transfer Restriction (LCTR), It is the way of modern utility token",
    url: "https://xennium.org",
    image: "https://xennium.org/logos/Xen.png",
  },
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={`${funnel.variable} antialiased`}>
        {/* Google Analytics Optimization */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-23X6JNL9XL"
          strategy="afterInteractive"
          async
          defer
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-23X6JNL9XL');
          `}
        </Script>

        {/* Speed Insights (Lazy Loaded) */}
        <SpeedInsights />

        {/* Wrap with Redux Provider */}
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
