export type YlaamProduct = {
  id: string;
  name: string;
  category: string;
  status: string;
  description: string;
  href: string;
  image: string;
};

export const ylaamProducts: YlaamProduct[] = [
  {
    id: "one",
    name: "YLAAM One",
    category: "Business operations",
    status: "Existing platform",
    description:
      "A connected operating space for leads, follow-up, finance, assets, and the decisions that move a business forward.",
    href: "https://ylaam.com/products/one",
    image: "/products/ylaam/ylaam-one.png",
  },
  {
    id: "engage",
    name: "YLAAM Engage",
    category: "Social lead engagement",
    status: "Planned SaaS",
    description:
      "Turn conversations across Instagram, Facebook, and WhatsApp into qualified contacts and meaningful next actions.",
    href: "https://ylaam.com/products/engage",
    image: "/products/ylaam/ylaam-engage.png",
  },
  {
    id: "learning",
    name: "YLAAM Learning",
    category: "Capability building",
    status: "Live foundation",
    description:
      "Learn a new topic, build real confidence, and practise the interview before the opportunity matters.",
    href: "https://ylaam.com/products/learning",
    image: "/products/ylaam/ylaam-learning.png",
  },
  {
    id: "meet",
    name: "YLAAM Meet",
    category: "Meetings and collaboration",
    status: "Planned SaaS",
    description:
      "A focused space for meetings, presentations, decisions, and follow-through across distributed teams.",
    href: "https://ylaam.com/products/meet",
    image: "/products/ylaam/ylaam-meet.png",
  },
  {
    id: "assistant",
    name: "YLAAM Assistant",
    category: "Contextual AI guidance",
    status: "Planned capability",
    description:
      "A trusted guide that helps people find context, decide the next action, and work confidently across the YLAAM suite.",
    href: "https://ylaam.com/products/assistant",
    image: "/products/ylaam/ylaam-assistant.png",
  },
  {
    id: "admin",
    name: "YLAAM Admin",
    category: "Organisation control",
    status: "Planned capability",
    description:
      "The governance layer for people, roles, products, integrations, and the operating rules behind the suite.",
    href: "https://ylaam.com/products/admin",
    image: "/products/ylaam/ylaam-admin.png",
  },
];
