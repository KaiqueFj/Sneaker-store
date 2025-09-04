import { Inter, Inter_Mono } from "next/font/google";
import "./_styles/globals.css";
import Header from "./_components/Header/Header";
import { SneakerProvider } from "./_components/Sneakers/SneakerContext";
import Footer from "./_components/Footer";

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
        <SneakerProvider>
          <Header />

          <div className="grid flex-1 mx-2 py-12">
            <main className="w-full  max-w-full">{children}</main>
          </div>
        </SneakerProvider>

        <Footer />
      </body>
    </html>
  );
}
