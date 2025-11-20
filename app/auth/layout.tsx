export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
            <div className="w-full max-w-md relative z-10">
                {children}
            </div>
        </div>
    );
}
