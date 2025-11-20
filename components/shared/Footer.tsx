import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            Mentra.
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Connecting wisdom with ambition. Real mentors, real growth.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Platform</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/mentors" className="hover:text-foreground">Browse Mentors</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-foreground">How It Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Company</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Legal</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Mentra Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
