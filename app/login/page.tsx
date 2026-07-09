import type { Metadata } from "next";
import { Toaster } from "sonner";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your DG Club account.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060813] px-4 py-16">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-1/4 -left-1/4 h-[550px] w-[550px] rounded-full bg-primary-600/15 blur-[130px]" />
        <div className="absolute -right-1/4 bottom-0 h-[450px] w-[450px] rounded-full bg-gold-500/08 blur-[110px]" />
        {/* Grid pattern overlay */}
        <div
          className="ambient-grid-overlay absolute inset-0 opacity-100"
          style={{
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 90%)"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        <AuthForm mode="login" />
      </div>

      <Toaster theme="dark" position="top-right" richColors closeButton />
    </main>
  );
}
