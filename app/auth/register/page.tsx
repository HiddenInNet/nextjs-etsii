// app/auth/register/page.tsx
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "vinext/shims/metadata";

export const metadata: Metadata = {
  title: "Crea tu cuenta - ETSII APP",
  description:
    "Crea tu cuenta personal y disfruta de todas las opciones disponibles en la web.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 p-4 pt-20 font-mono text-neutral-950 md:pt-0">
      <RegisterForm />
    </div>
  );
}
