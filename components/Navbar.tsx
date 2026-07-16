"use client";

import Link from "next/link";
import { OrnatePanel } from "./OrnatePanel";
import  logo  from "@/public/assets/NewLogo.jpeg";

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Gameplay", href: "#gameplay" },
  { label: "World", href: "#world" },
  { label: "Mechanics", href: "#mechanics" },
  { label: "Boss", href: "#boss" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
];

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <OrnatePanel className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logo.src} alt="AtherFall Logo" className="h-12 w-12 rounded-full" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-[0.18em] font-heading">
                AETHERFALL
              </div>
              <div className="text-xs text-white/60">Medieval Scratch RPG Docs</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="rounded-xl px-3 py-2 text-xs tracking-wide text-white/75 hover:text-white hover:bg-white/5 transition"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#play"
              className="rounded-xl border border-stroke bg-gradient-to-b from-gild/20 to-ember/10 px-4 py-2 text-xs font-semibold hover:from-gild/25 hover:to-ember/15 transition shadow-gild"
            >
              Play / Demo
            </Link>
          </div>
        </OrnatePanel>
      </div>
    </header>
  );
}