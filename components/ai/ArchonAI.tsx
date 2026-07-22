"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  Cpu,
  GraduationCap,
  Lightbulb,
  LoaderCircle,
  MessageSquareMore,
  Radio,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import TypewriterText from "@/components/ai/TypewriterText";
import {
  SceneName,
  useScene,
} from "@/components/providers/SceneProvider";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  animate?: boolean;
};

type SceneContextItem = {
  chapter: string;
  shortLabel: string;
  title: string;
  prompt: string;
  description: string;
  suggestions: string[];
  signals: string[];
};

const sceneOrder: SceneName[] = [
  "hero",
  "problem",
  "learning",
  "consulting",
  "products",
  "stories",
  "global",
  "campus",
  "vision",
];

const sceneContext: Record<SceneName, SceneContextItem> = {
  hero: {
    chapter: "01",
    shortLabel: "Dream",
    title: "Welcome to Archon",
    prompt: "What would you like to explore?",
    description:
      "A connected ecosystem for learning, consulting, products, innovation and meaningful outcomes.",
    suggestions: [
      "Help me understand Archon",
      "Show me the learning programs",
      "What products are you building?",
    ],
    signals: ["Learning", "Consulting", "Products", "Global"],
  },

  problem: {
    chapter: "02",
    shortLabel: "Why",
    title: "Why Archon Exists",
    prompt: "Would you like to explore our founding belief?",
    description:
      "Practical understanding, mentorship and industry exposure should matter more than marks or certificates alone.",
    suggestions: [
      "How is Archon different?",
      "Why practical learning?",
      "Tell me about the founder",
    ],
    signals: ["Understanding", "Practice", "Mentorship", "Industry"],
  },

  learning: {
    chapter: "03",
    shortLabel: "Learning",
    title: "Learning Path Advisor",
    prompt: "Tell me your background and I’ll help you explore a pathway.",
    description:
      "Mentorship-led programs across SAP, software, data, AI, cloud, DevOps and cybersecurity.",
    suggestions: [
      "Which program suits me?",
      "I want to learn SAP",
      "I want a non-coding career",
    ],
    signals: ["SAP", "Software", "Data & AI", "Cloud"],
  },

  consulting: {
    chapter: "04",
    shortLabel: "Industry",
    title: "Enterprise Solutions",
    prompt: "What business or technology challenge are you trying to solve?",
    description:
      "Enterprise consulting, development, integration, staffing, cloud and intelligent automation.",
    suggestions: [
      "I need SAP consulting",
      "I need software developers",
      "Tell me about AI automation",
    ],
    signals: ["SAP", "Engineering", "Cloud", "Talent"],
  },

  products: {
    chapter: "05",
    shortLabel: "Products",
    title: "Product Explorer",
    prompt: "Explore the products currently being built at Archon.",
    description:
      "Connected AI, collaboration and automation products emerging from the Archon ecosystem.",
    suggestions: [
      "What is AI Command Center?",
      "Tell me about ArchRoom",
      "What is SAP Guru Assistant?",
    ],
    signals: ["SAP Guru", "Command Center", "ArchRoom", "Future Labs"],
  },

  stories: {
    chapter: "06",
    shortLabel: "Impact",
    title: "Impact Explorer",
    prompt: "Would you like to explore learner and career journeys?",
    description:
      "Confidence gained, skills built, careers redirected and opportunities created.",
    suggestions: [
      "Show me success stories",
      "How many learners were trained?",
      "Tell me about Jimmy",
    ],
    signals: ["7,000+", "Careers", "Mentorship", "Outcomes"],
  },

  global: {
    chapter: "07",
    shortLabel: "Global",
    title: "Global Archon",
    prompt: "Explore Archon’s international presence and delivery network.",
    description:
      "A connected ecosystem spanning India, Belgium, the United Kingdom and Australia.",
    suggestions: [
      "Where does Archon operate?",
      "Tell me about Belgium",
      "What happens in Sydney?",
    ],
    signals: ["India", "Belgium", "UK", "Sydney"],
  },

  campus: {
    chapter: "08",
    shortLabel: "Campus",
    title: "Future Campus Guide",
    prompt: "Would you like to explore the future Archon campus?",
    description:
      "A 15,000 sq ft environment for learning, mentorship, consulting, innovation and entrepreneurship.",
    suggestions: [
      "Show me the campus floors",
      "What is the Innovation Lab?",
      "When is the campus opening?",
    ],
    signals: ["Learning", "Consulting", "Innovation", "Ideas"],
  },

  vision: {
    chapter: "09",
    shortLabel: "Vision",
    title: "Start Your Journey",
    prompt: "Tell me what you are looking for and I’ll guide you.",
    description:
      "Choose your next step across learning, consulting, products and collaboration.",
    suggestions: [
      "I want career guidance",
      "I need consulting support",
      "I want to collaborate",
    ],
    signals: ["Learn", "Build", "Collaborate", "Grow"],
  },
};

const categoryIcons = [
  GraduationCap,
  BriefcaseBusiness,
  Cpu,
  Lightbulb,
];

function AICore({ loading }: { loading: boolean }) {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: loading ? 3 : 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-300/45"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: loading ? 4 : 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-2 rounded-full border border-cyan-300/25"
      />

      <motion.div
        animate={{
          scale: loading ? [0.8, 1.25, 0.8] : [0.9, 1.08, 0.9],
          opacity: loading ? [0.5, 1, 0.5] : [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: loading ? 1.1 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-5 w-5 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,1)]"
      />

      {[0, 1, 2, 3].map((item) => (
        <motion.span
          key={item}
          animate={{ rotate: 360 }}
          transition={{
            duration: 7 + item * 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <span
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(103,232,249,1)]"
            style={{
              transform: `translateX(-50%) rotate(${item * 90}deg)`,
              transformOrigin: "50% 28px",
            }}
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function ArchonAI() {
  const { scene } = useScene();

  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I’m Archon AI. I can help you explore learning, consulting, products, careers, innovation and SAP.",
      animate: false,
    },
  ]);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const context = useMemo(() => sceneContext[scene], [scene]);

  const activeSceneIndex = Math.max(0, sceneOrder.indexOf(scene));

  useEffect(() => {
    const area = scrollAreaRef.current;

    if (!area) {
      return;
    }

    area.scrollTo({
      top: area.scrollHeight,
      behavior: "smooth",
    });
  }, [loading, messages]);

  useEffect(() => {
    const openAI = () => {
      setOpen(true);
      setMinimised(false);
    };

    window.addEventListener("archon:open-ai", openAI);

    return () => {
      window.removeEventListener("archon:open-ai", openAI);
    };
  }, []);

  useEffect(() => {
    const receiveContextMessage = (event: Event) => {
      const customEvent = event as CustomEvent<{
        scene: SceneName;
        message: string;
      }>;

      const contextualMessage = customEvent.detail?.message;

      if (!contextualMessage) {
        return;
      }

      setMessages((current) => {
        const alreadyExists = current.some(
          (message) =>
            message.role === "assistant" &&
            message.text === contextualMessage
        );

        if (alreadyExists) {
          return current;
        }

        return [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            text: contextualMessage,
            animate: true,
          },
        ];
      });
    };

    window.addEventListener(
      "archon:context-message",
      receiveContextMessage
    );

    return () => {
      window.removeEventListener(
        "archon:context-message",
        receiveContextMessage
      );
    };
  }, []);

  function markMessageAnimationComplete(messageId: string) {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? {
              ...message,
              animate: false,
            }
          : message
      )
    );
  }

  async function sendMessage(text: string) {
    const cleanText = text.trim();

    if (!cleanText || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: cleanText,
      animate: false,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/archon-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanText,
          scene,
          history: updatedMessages.map((message) => ({
            role: message.role,
            text: message.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to receive a response."
        );
      }

      const reply =
        typeof data.reply === "string"
          ? data.reply
          : "I received your message, but no reply was returned.";

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: reply,
          animate: true,
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "The assistant is temporarily unavailable.";

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: `${errorMessage} Please try again in a moment.`,
          animate: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyboard(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open Archon AI"
        onClick={() => {
          setOpen(true);
          setMinimised(false);
        }}
        animate={{
          y: [0, -7, 0],
          boxShadow: [
            "0 0 28px rgba(34,211,238,0.16)",
            "0 0 65px rgba(34,211,238,0.42)",
            "0 0 28px rgba(34,211,238,0.16)",
          ],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className={`fixed bottom-24 right-6 z-[120] flex items-center gap-3 rounded-full border border-cyan-300/30 bg-[#07111f]/90 px-4 py-3 text-left backdrop-blur-2xl transition duration-300 hover:border-cyan-200/60 hover:bg-[#0a1725] ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <AICore loading={false} />

        <div className="hidden pr-2 sm:block">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Archon AI
            </span>

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          </div>

          <div className="mt-1 text-xs text-slate-300">
            Exploring {context.shortLabel}
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{
              opacity: 0,
              x: 50,
              y: 30,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 40,
              y: 25,
              scale: 0.95,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed bottom-5 right-5 z-[150] overflow-hidden rounded-[2.3rem] border border-cyan-300/25 bg-[#050b17]/95 shadow-[0_0_140px_rgba(34,211,238,0.2)] backdrop-blur-2xl ${
              minimised
                ? "w-[350px]"
                : "flex h-[min(820px,calc(100vh-40px))] w-[min(460px,calc(100vw-40px))] flex-col"
            }`}
          >
            <div className="relative shrink-0 overflow-hidden border-b border-white/10 px-5 py-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_48%)]" />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AICore loading={loading} />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        Archon AI
                      </span>

                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-cyan-300">
                      <Radio className="h-3 w-3" />

                      {loading
                        ? "Processing request"
                        : "Command center online"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Minimise Archon AI"
                    onClick={() =>
                      setMinimised((current) => !current)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-300/30 hover:text-white"
                  >
                    <ArrowDown
                      className={`h-4 w-4 transition ${
                        minimised ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    aria-label="Close Archon AI"
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-300/30 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {!minimised && (
              <>
                <div className="shrink-0 border-b border-white/10 p-4">
                  <motion.div
                    key={scene}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="overflow-hidden rounded-[1.8rem] border border-cyan-300/20 bg-[#07111f]/85"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                      <div>
                        <div className="text-[8px] uppercase tracking-[0.3em] text-slate-500">
                          Currently exploring
                        </div>

                        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">
                          {context.shortLabel}
                        </div>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 font-mono text-[10px] text-cyan-300">
                        {context.chapter}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-white">
                        {context.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {context.description}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {context.signals.map((signal) => (
                          <div
                            key={signal}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

                            <span className="text-[10px] text-slate-300">
                              {signal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 px-5 py-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[8px] uppercase tracking-[0.26em] text-slate-600">
                          Visitor journey
                        </div>

                        <div className="font-mono text-[9px] text-cyan-300">
                          {Math.round(
                            ((activeSceneIndex + 1) /
                              sceneOrder.length) *
                              100
                          )}
                          %
                        </div>
                      </div>

                      <div className="mt-3 flex gap-1.5">
                        {sceneOrder.map((item, index) => {
                          const active = item === scene;
                          const completed =
                            index < activeSceneIndex;

                          return (
                            <motion.div
                              key={item}
                              animate={{
                                flex: active ? 2.5 : 1,
                              }}
                              className={`h-1.5 rounded-full transition-colors ${
                                active
                                  ? "bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                                  : completed
                                    ? "bg-cyan-300/40"
                                    : "bg-white/10"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div
                  ref={scrollAreaRef}
                  className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5"
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
                          <Sparkles className="h-4 w-4 text-cyan-300" />
                        </div>
                      )}

                      <div
                        className={`max-w-[82%] rounded-[1.4rem] px-4 py-3 text-sm leading-6 ${
                          message.role === "user"
                            ? "rounded-br-md bg-cyan-300 text-[#031018]"
                            : "rounded-bl-md border border-white/10 bg-white/[0.04] text-slate-200"
                        }`}
                      >
                        {message.role === "assistant" &&
                        message.animate ? (
                          <TypewriterText
                            text={message.text}
                            speed={12}
                            onComplete={() =>
                              markMessageAnimationComplete(
                                message.id
                              )
                            }
                          />
                        ) : (
                          message.text
                        )}
                      </div>

                      {message.role === "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                          <UserRound className="h-4 w-4 text-slate-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="flex gap-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
                        <Sparkles className="h-4 w-4 text-cyan-300" />
                      </div>

                      <div className="flex items-center gap-3 rounded-[1.4rem] rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-400">
                        <LoaderCircle className="h-4 w-4 animate-spin text-cyan-300" />
                        Analysing your request…
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="shrink-0 border-t border-white/10 p-4">
                  <div className="mb-3 flex gap-2 overflow-x-auto">
                    {context.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        disabled={loading}
                        onClick={() => {
                          void sendMessage(suggestion);
                        }}
                        className="shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] text-slate-300 transition hover:border-cyan-300/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="flex items-end gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-2 transition focus-within:border-cyan-300/40"
                  >
                    <textarea
                      value={input}
                      disabled={loading}
                      onChange={(event) =>
                        setInput(event.target.value)
                      }
                      onKeyDown={handleKeyboard}
                      rows={1}
                      placeholder="Ask Archon AI..."
                      className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      aria-label="Send message"
                      disabled={loading || !input.trim()}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-[#031018] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {loading ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </form>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.22em] text-slate-600">
                    <MessageSquareMore className="h-3 w-3 text-cyan-300" />
                    Powered by Archon AI
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}