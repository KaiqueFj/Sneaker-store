import { auth } from "@/lib/auth";
import { Inter } from "next/font/google";
import Footer from "./_components/Footer";
import Header from "./_components/Header/Header";
import "./_styles/globals.css";
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

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={` ${inter.className} relative  min-h-screen antialiased  flex flex-col text-primary-600`}
      >
        <Providers session={session}>
          <Header />

          <div className="grid flex-1 overflow-hidden  ">
            <main className="w-full max-w-full 0">{children}</main>
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
