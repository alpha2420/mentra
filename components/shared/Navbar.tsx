import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";

import Image from "next/image";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                    <div className="relative h-12 w-40">
                        <Image
                            src="/logo.png"
                            alt="Mentra"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-base font-medium">
                    <Link href="/" className="relative group transition-colors hover:text-primary">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/mentors" className="relative group transition-colors hover:text-primary">
                        Find a Mentor
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/chat" className="relative group transition-colors hover:text-primary">
                        Messages
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/about" className="relative group transition-colors hover:text-primary">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/become-mentor" className="relative group transition-colors hover:text-primary">
                        Become a Mentor
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost" className="text-sm font-medium">
                                Login
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button>Get Started</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-10 h-10"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
