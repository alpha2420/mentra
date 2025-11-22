import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SocketProvider } from "@/components/providers/SocketProvider";


import { syncUser } from "@/lib/sync-user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentra | Real Mentors. Real Wisdom.",
  description: "Connect with experienced mentors for career clarity and life guidance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SocketProvider>
            <Navbar />
            <main className="min-h-screen bg-background">{children}</main>
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
