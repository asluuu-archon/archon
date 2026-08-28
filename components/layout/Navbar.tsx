"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { getWhatsAppEnquiryLink } from "@/lib/contact";

const navigation = [
  { label: "Learning", href: "/programs" },
  { label: "Consulting", href: "/consulting" },
  { label: "Products", href: "/#products" },
  { label: "Placements", href: "/placements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/testimonials" },
  { label: "Company", href: "/about" },
];

const advisorHref = getWhatsAppEnquiryLink("Hi Archon, I would like to talk to an advisor.");

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-5 z-[90] px-4 md:top-7 md:px-6">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#07111f]/80 px-3 py-2 shadow-[0_0_60px_rgba(34,211,238,0.07)] backdrop-blur-2xl md:px-4"
        >
          <a
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
            aria-label="Archon home"
          >
            <Image
              src="/brand/archon-logo.png"
              alt="Archon"
              width={36}
              height={30}
              className="h-8 w-auto object-contain"
              priority
            />
            <span>
              <span className="block text-xs font-bold tracking-[0.08em] text-white">ARCHON</span>
              <span className="block text-[7px] uppercase tracking-[0.32em] text-slate-500">
                Since 2013
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-4 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-2 text-[11px] font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href={advisorHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-[10px] font-semibold text-[#031018] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >
              Talk to an Advisor
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="archon-mobile-navigation"
            onClick={() => setMobileOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white sm:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={closeMenu}
            className="fixed inset-0 z-[80] bg-[#020611]/75 backdrop-blur-xl sm:hidden"
          />
          <div
            id="archon-mobile-navigation"
            className="fixed left-4 right-4 top-24 z-[85] overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#07111f]/95 p-5 shadow-[0_0_100px_rgba(34,211,238,0.13)] backdrop-blur-2xl sm:hidden"
          >
            <div className="mb-5 border-b border-white/10 pb-5">
              <div className="text-[9px] uppercase tracking-[0.28em] text-slate-500">Explore Archon</div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Make the next move</div>
            </div>

            <div className="space-y-2">
              {navigation.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-slate-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.09] hover:text-white"
                >
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-cyan-300">0{index + 1}</span>
                </a>
              ))}
            </div>

            <a
              href={advisorHref}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-5 flex w-full items-center justify-between rounded-2xl bg-cyan-300 px-5 py-4 font-semibold text-[#031018]"
            >
              Talk to an Advisor
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </>
      )}
    </>
  );
}
