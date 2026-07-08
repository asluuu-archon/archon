"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-7 py-4 backdrop-blur-xl">

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-cyan-400" />
          <div>
            <div className="text-sm font-bold tracking-widest">
              ARCHON
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              Since 2013
            </div>
          </div>
        </div>

        <nav className="hidden gap-8 text-sm lg:flex">
          <a href="#">Learning</a>
          <a href="#">Consulting</a>
          <a href="#">Products</a>
          <a href="#">Success Stories</a>
          <a href="#">Company</a>
        </nav>

        <Button className="rounded-full bg-cyan-400 text-black hover:bg-cyan-300">
          Talk to an Advisor
        </Button>

      </div>
    </header>
  );
}