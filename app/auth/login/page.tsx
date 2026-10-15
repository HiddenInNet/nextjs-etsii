// app/auth/login/page.tsx
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "vinext/shims/metadata";

export const metadata: Metadata = {
  title: "Inicia sesión - ETSII APP",
  description: "Entra y sigue explorando.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 p-4 font-mono text-neutral-950">
      <LoginForm />
    </div>
  );
}
