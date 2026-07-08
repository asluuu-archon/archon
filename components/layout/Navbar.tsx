"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useActiveSection from "@/components/hooks/useActiveSection";

const links = [
  { label: "Learning", id: "learning" },
  { label: "Consulting", id: "consulting" },
  { label: "Products", id: "products" },
  { label: "Stories", id: "stories" },
  { label: "Company", id: "founder" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  return (
    <header className="fixed left-1/2 top-5 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
      <div className="mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.45)]" />

            <div className="text-left">
              <div className="text-xs font-bold tracking-widest sm:text-sm">
                ARCHON
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-slate-400">
                Since 2013
              </div>
            </div>
          </button>

          <nav className="hidden gap-8 text-sm lg:flex">
            {links.map((link) => {
              const isActive = active === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative transition ${
                    isActive
                      ? "text-cyan-300"
                      : "text-white hover:text-cyan-200"
                  }`}
                >
                  {link.label}

                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
                  )}
                </button>
              );
            })}
          </nav>

          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden rounded-full bg-cyan-400 text-black hover:bg-cyan-300 sm:block"
          >
            Talk to an Advisor
          </Button>

          <button
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 px-5 pb-5 pt-3 lg:hidden">
            <div className="flex flex-col gap-4 text-sm text-slate-200">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left ${
                    active === link.id ? "text-cyan-300" : "text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <Button
                onClick={() => scrollToSection("contact")}
                className="mt-2 rounded-full bg-cyan-400 text-black hover:bg-cyan-300 sm:hidden"
              >
                Talk to an Advisor
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}