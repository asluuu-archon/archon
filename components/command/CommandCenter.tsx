"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  Cpu,
  GraduationCap,
  Home,
  Lightbulb,
  Network,
  Search,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";
import {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CommandAction = {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  icon: typeof Home;
  action: () => void;
};

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function CommandCenter() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const commands = useMemo<CommandAction[]>(
    () => [
      {
        id: "home",
        title: "Archon Home",
        description: "Return to the beginning of the Archon experience.",
        keywords: ["home", "hero", "start", "archon"],
        category: "Navigate",
        icon: Home,
        action: () => scrollToSection("hero"),
      },
      {
        id: "why",
        title: "Why Archon Exists",
        description:
          "Explore Archon’s philosophy of practical learning and mentorship.",
        keywords: ["why", "philosophy", "purpose", "mentorship"],
        category: "Discover",
        icon: Lightbulb,
        action: () => scrollToSection("problem"),
      },
      {
        id: "founder",
        title: "Founder Story",
        description:
          "Explore Mohamed Aslam’s story and the belief behind Archon.",
        keywords: [
          "founder",
          "mohamed",
          "aslam",
          "story",
          "profile",
        ],
        category: "Discover",
        icon: UserRound,
        action: () => scrollToSection("founder"),
      },
      {
        id: "journey",
        title: "Archon Journey",
        description:
          "See how one room became a global technology ecosystem.",
        keywords: ["journey", "history", "timeline", "2013"],
        category: "Discover",
        icon: Sparkles,
        action: () => scrollToSection("journey"),
      },
      {
        id: "ecosystem",
        title: "Trusted Ecosystem",
        description:
          "Explore enterprise experience, academic relationships and technologies.",
        keywords: [
          "clients",
          "partners",
          "academic",
          "enterprise",
          "technology",
          "trusted",
        ],
        category: "Trust",
        icon: Network,
        action: () => scrollToSection("ecosystem"),
      },
      {
        id: "global",
        title: "Global Presence",
        description:
          "Explore Archon across India, Belgium, the UK and Australia.",
        keywords: [
          "global",
          "india",
          "belgium",
          "uk",
          "australia",
          "sydney",
        ],
        category: "Discover",
        icon: Network,
        action: () => scrollToSection("global"),
      },
      {
        id: "learning",
        title: "Learning Ecosystem",
        description:
          "Explore SAP, software, data, AI, cloud and career pathways.",
        keywords: [
          "learning",
          "course",
          "internship",
          "sap",
          "software",
          "data",
          "ai",
          "cloud",
          "devops",
          "cybersecurity",
        ],
        category: "Learning",
        icon: GraduationCap,
        action: () => scrollToSection("learning"),
      },
      {
        id: "consulting",
        title: "Enterprise Consulting",
        description:
          "Explore SAP, engineering, integration, cloud, staffing and automation.",
        keywords: [
          "consulting",
          "sap consulting",
          "software",
          "migration",
          "integration",
          "staffing",
          "enterprise",
        ],
        category: "Business",
        icon: BriefcaseBusiness,
        action: () => scrollToSection("consulting"),
      },
      {
        id: "products",
        title: "Archon Products",
        description:
          "Explore AI Command Center, ArchRoom and SAP Guru Assistant.",
        keywords: [
          "products",
          "archroom",
          "sap guru",
          "command center",
          "ai",
        ],
        category: "Innovation",
        icon: Cpu,
        action: () => scrollToSection("products"),
      },
      {
        id: "innovation",
        title: "Innovation Lab",
        description:
          "Explore products, experiments and future technology concepts.",
        keywords: [
          "innovation",
          "lab",
          "future",
          "products",
          "research",
        ],
        category: "Innovation",
        icon: Cpu,
        action: () => scrollToSection("innovation"),
      },
      {
        id: "impact",
        title: "Impact Stories",
        description:
          "Explore learner transformation, outcomes and global journeys.",
        keywords: [
          "impact",
          "stories",
          "placement",
          "success",
          "learners",
        ],
        category: "Trust",
        icon: Users,
        action: () => scrollToSection("stories"),
      },
      {
        id: "campus",
        title: "Future Campus",
        description:
          "Explore the future Archon campus and its three-floor ecosystem.",
        keywords: [
          "campus",
          "building",
          "kerala",
          "innovation",
          "entrepreneurship",
        ],
        category: "Future",
        icon: Building2,
        action: () => scrollToSection("campus"),
      },
      {
        id: "contact",
        title: "Talk to Archon",
        description:
          "Start a learning, consulting, product or collaboration enquiry.",
        keywords: [
          "contact",
          "advisor",
          "enquiry",
          "email",
          "collaborate",
        ],
        category: "Connect",
        icon: ArrowRight,
        action: () => scrollToSection("contact"),
      },
      {
        id: "ai",
        title: "Open Archon AI",
        description:
          "Ask about learning, consulting, products, careers or Archon.",
        keywords: [
          "ai",
          "assistant",
          "chat",
          "ask",
          "career guidance",
        ],
        category: "AI",
        icon: Bot,
        action: () => {
          window.dispatchEvent(new Event("archon:open-ai"));
        },
      },
      {
        id: "tour",
        title: "Start Guided Experience",
        description:
          "Let Archon AI guide you through the complete ecosystem.",
        keywords: ["tour", "guide", "experience", "walkthrough"],
        category: "AI",
        icon: Sparkles,
        action: () => {
          window.dispatchEvent(new Event("archon:start-tour"));
        },
      },
    ],
    []
  );

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) => {
      const searchableText = [
        command.title,
        command.description,
        command.category,
        ...command.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [commands, query]);

  const groupedCommands = useMemo(() => {
    const groups = new Map<string, CommandAction[]>();

    filteredCommands.forEach((command) => {
      const current = groups.get(command.category) ?? [];
      current.push(command);
      groups.set(command.category, current);
    });

    return Array.from(groups.entries());
  }, [filteredCommands]);

  useEffect(() => {
    const handleKeyboardShortcut = (event: globalThis.KeyboardEvent) => {
      const commandPressed =
        event.ctrlKey || event.metaKey;

      if (commandPressed && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboardShortcut
      );
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function executeCommand(command: CommandAction) {
    setOpen(false);

    window.setTimeout(() => {
      command.action();
    }, 180);
  }

  function handleInputKeyboard(
    event: KeyboardEvent<HTMLInputElement>
  ) {
    if (!filteredCommands.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((current) =>
        current >= filteredCommands.length - 1
          ? 0
          : current + 1
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((current) =>
        current <= 0
          ? filteredCommands.length - 1
          : current - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selectedCommand =
        filteredCommands[activeIndex];

      if (selectedCommand) {
        executeCommand(selectedCommand);
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 z-[110] hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-[#07111f]/80 px-4 py-2.5 text-[10px] text-slate-400 shadow-[0_0_45px_rgba(34,211,238,0.06)] backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-white lg:flex"
      >
        <Search className="h-3.5 w-3.5 text-cyan-300" />

        <span>Search Archon</span>

        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[8px] text-slate-500">
          Ctrl K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close Archon Command Center"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[250] bg-[#020611]/80 backdrop-blur-xl"
            />

            <motion.section
              initial={{
                opacity: 0,
                y: -25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed left-1/2 top-[8vh] z-[260] flex max-h-[84vh] w-[min(780px,calc(100vw-28px))] -translate-x-1/2 flex-col overflow-hidden rounded-[2.4rem] border border-cyan-300/25 bg-[#050b17]/98 shadow-[0_0_170px_rgba(34,211,238,0.22)] backdrop-blur-2xl"
            >
              <div className="relative shrink-0 border-b border-white/10 p-5 md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_50%)]" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.2rem] border border-cyan-300/25 bg-cyan-300/10">
                    <Search className="h-5 w-5 text-cyan-300" />
                  </div>

                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) =>
                      setQuery(event.target.value)
                    }
                    onKeyDown={handleInputKeyboard}
                    placeholder="Search Archon, SAP, consulting, products..."
                    className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-slate-600 md:text-xl"
                  />

                  <button
                    type="button"
                    aria-label="Close command center"
                    onClick={() => setOpen(false)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-300/30 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative mt-5 flex flex-wrap items-center gap-3 text-[8px] uppercase tracking-[0.22em] text-slate-600">
                  <span>↑↓ Navigate</span>
                  <span>Enter Select</span>
                  <span>Esc Close</span>

                  <span className="ml-auto flex items-center gap-2 text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Command center online
                  </span>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-6">
                    {groupedCommands.map(
                      ([category, categoryCommands]) => (
                        <div key={category}>
                          <div className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
                            {category}
                          </div>

                          <div className="space-y-2">
                            {categoryCommands.map((command) => {
                              const Icon = command.icon;
                              const commandIndex =
                                filteredCommands.findIndex(
                                  (item) =>
                                    item.id === command.id
                                );
                              const active =
                                commandIndex === activeIndex;

                              return (
                                <motion.button
                                  key={command.id}
                                  type="button"
                                  onMouseEnter={() =>
                                    setActiveIndex(commandIndex)
                                  }
                                  onClick={() =>
                                    executeCommand(command)
                                  }
                                  whileHover={{ x: 4 }}
                                  className={`group flex w-full items-center gap-4 rounded-[1.5rem] border p-4 text-left transition-all duration-200 ${
                                    active
                                      ? "border-cyan-300/35 bg-cyan-300/[0.08]"
                                      : "border-transparent bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.045]"
                                  }`}
                                >
                                  <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                                      active
                                        ? "border-cyan-300/30 bg-cyan-300/10"
                                        : "border-white/10 bg-white/[0.035]"
                                    }`}
                                  >
                                    <Icon className="h-5 w-5 text-cyan-300" />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-white">
                                      {command.title}
                                    </div>

                                    <div className="mt-1 truncate text-xs text-slate-500">
                                      {command.description}
                                    </div>
                                  </div>

                                  <ArrowRight
                                    className={`h-4 w-4 shrink-0 transition ${
                                      active
                                        ? "translate-x-0 text-cyan-300"
                                        : "-translate-x-1 text-slate-700 group-hover:translate-x-0 group-hover:text-cyan-300"
                                    }`}
                                  />
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                      <Search className="h-6 w-6 text-slate-600" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">
                      No matching destination
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      Try searching for learning, SAP, consulting,
                      products, campus, founder or contact.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);

                        window.setTimeout(() => {
                          window.dispatchEvent(
                            new Event("archon:open-ai")
                          );
                        }, 200);
                      }}
                      className="mt-6 flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-300/[0.13]"
                    >
                      Ask Archon AI
                      <Bot className="h-4 w-4 text-cyan-300" />
                    </button>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-white/10 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[8px] uppercase tracking-[0.24em] text-slate-600">
                    Archon Digital Headquarters
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);

                      window.setTimeout(() => {
                        window.dispatchEvent(
                          new Event("archon:open-ai")
                        );
                      }, 180);
                    }}
                    className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300 transition hover:text-cyan-100"
                  >
                    Ask Archon AI
                    <Sparkles className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}