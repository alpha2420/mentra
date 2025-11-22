import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight">Mentra.</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/mentors" className="transition-colors hover:text-primary/80">
                        Find a Mentor
                    </Link>
                    <Link href="/chat" className="transition-colors hover:text-primary/80">
                        Messages
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-primary/80">
                        About
                    </Link>
                    <Link href="/become-mentor" className="transition-colors hover:text-primary/80">
                        Become a Mentor
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
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
