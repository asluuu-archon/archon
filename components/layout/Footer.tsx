import {
  ArrowUpRight,
  BriefcaseBusiness,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Radio,
} from "lucide-react";

import SAPIndependenceDisclosure from "@/components/ui/SAPIndependenceDisclosure";
import { archonContact } from "@/lib/contact";

const navigation = [
  { label: "Learning", href: "/#learning" },
  { label: "Consulting", href: "/#consulting" },
  { label: "Products", href: "/#products" },
  { label: "Impact", href: "/#stories" },
  { label: "Insights", href: "/insights" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: archonContact.social.facebook,
    icon: Globe2,
  },
  {
    label: "Instagram",
    href: archonContact.social.instagram,
    icon: MessageCircle,
  },
  {
    label: "LinkedIn",
    href: archonContact.social.linkedin,
    icon: BriefcaseBusiness,
  },
  {
    label: "YouTube",
    href: archonContact.social.youtube,
    icon: Radio,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816] px-6 pb-8 pt-16 text-white md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.72fr_1.15fr]">
          <div>
            <a href="/#hero" className="inline-flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.34)]" />
              <span>
                <span className="block text-lg font-bold tracking-[0.12em] text-white">
                  ARCHON
                </span>
                <span className="mt-1 block text-[8px] uppercase tracking-[0.34em] text-slate-500">
                  Since 2013
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              A global technology ecosystem for practical learning, enterprise
              consulting, future products, and human potential.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Archon on ${label}`}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-slate-400 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-300/[0.08] hover:text-cyan-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <div className="text-[9px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Explore Archon
            </div>
            <ul className="mt-6 space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Speak with Archon
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-400">
              <a
                href={archonContact.phoneHref}
                className="group flex items-start gap-3 transition hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-slate-600">
                    Call
                  </span>
                  <span className="mt-1 block">{archonContact.phone}</span>
                </span>
              </a>

              <a
                href={archonContact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 transition hover:text-white"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-slate-600">
                    WhatsApp
                  </span>
                  <span className="mt-1 block">{archonContact.whatsapp}</span>
                </span>
              </a>

              <a
                href={archonContact.emailHref}
                className="group flex items-start gap-3 transition hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-slate-600">
                    Email
                  </span>
                  <span className="mt-1 block">{archonContact.email}</span>
                </span>
              </a>

              <a
                href={archonContact.mapHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 transition hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <address className="not-italic leading-6">
                  {archonContact.address}
                </address>
              </a>
            </div>
          </div>
        </div>

        <SAPIndependenceDisclosure className="mt-12" />

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Archon Solutions. All rights reserved.</span>
          <span>Dream without limits. Build with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
