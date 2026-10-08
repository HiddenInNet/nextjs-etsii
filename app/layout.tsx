import "@/app/globals.css";
import Header from "@/components/header/Header";
import { Merriweather } from "next/font/google";
import { ToastProvider } from "@/components/toast/ToastContext";
import { AuthProvider } from "@/context/AuthContext";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="es" className={`${merriweather.variable}`}>
        <body className="antialiased">
          <ToastProvider>
            <AuthProvider>
              <Header />
              <main>{children}</main>
            </AuthProvider>
          </ToastProvider>
        </body>
      </html>
  );
}
