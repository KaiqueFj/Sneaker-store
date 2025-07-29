import { Inter, Inter_Mono } from "next/font/google";
import "./_styles/globals.css";
import Header from "./_components/Header/Header";

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
        className={`${inter.variable} relative min-h-screen antialiased bg-primary-50 flex flex-col text-primary-600`}
      >
        <Header />

        <div className="grid flex-1 mx-20 px-8 py-12">
          <main className="w-full mx-10 max-w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
