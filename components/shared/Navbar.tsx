import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                    <Link href="/auth/login" className="hidden md:block text-sm font-medium hover:underline">
                        Login
                    </Link>
                    <Button asChild>
                        <Link href="/auth/register">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
