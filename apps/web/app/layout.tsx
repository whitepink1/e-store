import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { cookies } from 'next/headers';
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "E-Store",
  description: "Pet project E-store, created by kiruhat",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('session_token')?.value;
  return (
    <html lang="en" className={inter.className}>
      <body className='flex flex-col min-h-screen'>
        <Header isLoggedIn={isLoggedIn}/>
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
