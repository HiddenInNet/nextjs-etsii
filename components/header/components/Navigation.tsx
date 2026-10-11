// components/header/Navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navlinks } from "@/data/navlinks.json";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 rounded-full border-2 border-neutral-950 bg-white px-2 py-1.5 shadow-[2px_2px_0_#0a0a0a] md:flex">
      {navlinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase transition-all ${
              isActive
                ? "border-2 border-neutral-950 bg-yellow-300 text-neutral-950 shadow-[2px_2px_0_#0a0a0a]"
                : "text-neutral-800 hover:bg-neutral-200 hover:text-neutral-950"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
