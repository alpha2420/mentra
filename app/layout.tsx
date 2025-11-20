import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { AIChatWidget } from "@/components/shared/AIChatWidget";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentra | Real Mentors. Real Wisdom.",
  description: "Connect with experienced mentors for career clarity and life guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <AIChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
