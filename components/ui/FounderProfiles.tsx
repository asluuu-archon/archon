"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Profile = {
  label: string;
  detail: string;
  href: string;
  icon: ReactNode;
};

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M21.2 7.2a2.8 2.8 0 0 0-2-2C17.4 4.7 12 4.7 12 4.7s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.8 29 29 0 0 0-.5-4.8Z" />
      <path d="m10 9 5 3-5 3Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7" />
      <path d="M8 7.2v.1" />
      <path d="M12 17v-4a3 3 0 0 1 6 0v4" />
      <path d="M12 10v7" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22Z" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17" />
      <path d="M3.5 15h17" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

const profiles: Profile[] = [
  {
    label: "Instagram",
    detail: "@the_sap_guru",
    href: "https://www.instagram.com/the_sap_guru/",
    icon: <InstagramIcon />,
  },
  {
    label: "YouTube",
    detail: "The SAP Guru",
    href: "https://www.youtube.com/@the_SAP_Guru",
    icon: <YouTubeIcon />,
  },
  {
    label: "LinkedIn",
    detail: "Mohamed Aslam",
    href: "https://www.linkedin.com/in/mohamed-aslam-62098816/",
    icon: <LinkedInIcon />,
  },
  {
    label: "SAP Guru Blog",
    detail: "Insights and guidance",
    href: "https://the-sap-guru.mohamed-aslam.com/",
    icon: <BlogIcon />,
  },
  {
    label: "Personal Website",
    detail: "mohamed-aslam.com",
    href: "https://www.mohamed-aslam.com/",
    icon: <WebsiteIcon />,
  },
];

export default function FounderProfiles() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75 }}
      className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]/70 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-300">
            Public Profiles
          </div>

          <div className="mt-2 text-lg font-semibold text-white">
            Connect with the founder
          </div>
        </div>

        <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.24em] text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          Public
        </div>
      </div>

      <div className="grid sm:grid-cols-2">
        {profiles.map((profile, index) => {
          const finalItem = index === profiles.length - 1;

          return (
            <motion.a
              key={profile.label}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              whileHover={{ y: -3 }}
              className={`group relative flex items-center gap-4 border-white/10 p-5 transition duration-300 hover:bg-cyan-300/[0.055] ${
                index % 2 === 0 && !finalItem ? "sm:border-r" : ""
              } ${index < profiles.length - 2 ? "border-b" : ""} ${
                finalItem
                  ? "border-t border-white/10 sm:col-span-2"
                  : ""
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition duration-300 group-hover:border-cyan-300/45 group-hover:bg-cyan-300/10">
                {profile.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white">
                  {profile.label}
                </div>

                <div className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  {profile.detail}
                </div>
              </div>

              <div className="shrink-0 text-slate-600 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300">
                <ExternalArrowIcon />
              </div>

              <div className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-300 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}