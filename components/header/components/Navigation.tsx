// components/header/Navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navlinks } from "@/data/navlinks.json";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 p-1.5 backdrop-blur-sm md:flex">
      {navlinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase ${
              isActive
                ? "border border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
                : "text-neutral-300 hover:bg-neutral-800/50 hover:text-yellow-400"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
