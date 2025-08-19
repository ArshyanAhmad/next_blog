import { SignupForm } from "@/components/signup-form";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Page() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Stars Background */}
            <div className="absolute inset-0 z-0">
                <StarsBackground />
                <ShootingStars />
            </div>

            {/* Login Form */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <SignupForm />
            </div>

        </div>
    );
}
