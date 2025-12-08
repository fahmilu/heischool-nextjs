import "@/public/styles/globals.scss";
// import Header from "@/components/Partials/Header";
import Footer from "@/components/Partials/Footer";
import { ReactLenis } from "lenis/react";
import DynamicHeaderWrapper from "@/components/Partials/DynamicHeaderWrapper";
import FloatingButton from "@/components/floatingButton";
import StoreProvider from "@/redux/StoreProvider";

export const metadata = {
  title: "Hei Schools Indonesia",
  description: "Hei Schools Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" >
        <StoreProvider>
          <DynamicHeaderWrapper />
          <ReactLenis root>
            <main>
              {children}
            </main>
          </ReactLenis>
          <Footer />
          <FloatingButton />
        </StoreProvider>
      </body>
    </html>
  );
}
