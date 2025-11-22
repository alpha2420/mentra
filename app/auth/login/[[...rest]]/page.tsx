import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
            <SignIn path="/auth/login" />
        </div>
    );
}
