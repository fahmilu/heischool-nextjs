import localFont from "next/font/local";

import { DM_Sans } from "next/font/google";
import "@/public/styles/globals.scss";
import Header from "@/components/Partials/Header";
import Footer from "@/components/Partials/Footer";
import { ReactLenis } from "lenis/react";
import DynamicHeaderWrapper from "@/components/Partials/DynamicHeaderWrapper";
const DMSans = DM_Sans({
  variable: "--font-dmsans",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const Noyh = localFont({
  src: [
    {
      path: "../../public/fonts/Noyh-Black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Noyh-Heavy.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Noyh-Bold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Noyh-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Noyh-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Noyh-SemiLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Noyh-Light.woff",
      weight: "200",
      style: "normal",
    }
  ],
  variable: "--font-noyh",
});

export const metadata = {
  title: "Hei Schools Indonesia",
  description: "Hei Schools Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${DMSans.variable} ${Noyh.variable} antialiased`} >
        <DynamicHeaderWrapper />
        <ReactLenis root>
          <main>
            {children}
          </main>
        </ReactLenis>
        <Footer />
      </body>
    </html>
  );
}
