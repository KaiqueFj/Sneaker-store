import { Inter } from "next/font/google";
import "./_styles/globals.css";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Sneakers Store",
  description: "Shop the latest sneakers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} relative  min-h-screen antialiased  flex flex-col text-primary-500`}
      >
        <Providers>
          <Header />

          <div className="grid flex-1 overflow-hidden mx-2 py-12">
            <main className="w-full max-w-full 0">{children}</main>
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
