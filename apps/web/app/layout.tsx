import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cookies } from 'next/headers';
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "E-Store",
  description: "...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('session_token')?.value;
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
        <Header isLoggedIn={isLoggedIn}/>
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
