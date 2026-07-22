"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useActiveSection from "@/components/hooks/useActiveSection";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Learning", href: "/", id: "learning" },
  { label: "Consulting", href: "/", id: "consulting" },
  { label: "Products", href: "/products", id: "products" },
  { label: "Insights", href: "/insights", id: "insights" },
  { label: "Careers", href: "/careers", id: "careers" },
  { label: "About", href: "/about", id: "about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const scrollToSection = (id: string) => {
    if (!isHomepage) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpen(false);
  };

  const handleNavigation = (link: { label: string; href: string; id: string }) => {
    if (link.href === "/") {
      scrollToSection(link.id);
    } else {
      setOpen(false);
    }
  };

  return (
    <header className="fixed left-1/2 top-5 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
      <div className="mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.45)]" />

            <div className="text-left">
              <div className="text-xs font-bold tracking-widest sm:text-sm">
                ARCHON
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-slate-400">
                Since 2013
              </div>
            </div>
          </Link>

          <nav className="hidden gap-8 text-sm lg:flex">
            {links.map((link) => {
              const isActive = isHomepage && active === link.id;
              const isCurrentPage = pathname === link.href;

              if (link.href === "/") {
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
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative transition ${
                    isCurrentPage
                      ? "text-cyan-300"
                      : "text-white hover:text-cyan-200"
                  }`}
                >
                  {link.label}

                  {isCurrentPage && (
                    <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link href="/contact">
            <Button className="hidden rounded-full bg-cyan-400 text-black hover:bg-cyan-300 sm:block">
              Talk to an Advisor
            </Button>
          </Link>

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
              {links.map((link) => {
                const isActive = isHomepage && active === link.id;
                const isCurrentPage = pathname === link.href;

                if (link.href === "/") {
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        handleNavigation(link);
                      }}
                      className={`text-left ${
                        isActive ? "text-cyan-300" : "text-white"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-left ${
                      isCurrentPage ? "text-cyan-300" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full rounded-full bg-cyan-400 text-black hover:bg-cyan-300">
                  Talk to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
