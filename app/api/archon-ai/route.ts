import { NextRequest, NextResponse } from "next/server";

type IncomingMessage = {
  role: "assistant" | "user";
  text: string;
};

type ChatRequest = {
  message?: string;
  scene?: string;
  history?: IncomingMessage[];
};

const sceneKnowledge: Record<string, string> = {
  hero:
    "Archon is a global technology ecosystem focused on learning, consulting, products, innovation and real-world outcomes.",
  problem:
    "Archon believes practical understanding, mentorship and business exposure matter more than certificates alone.",
  learning:
    "Archon offers pathways across SAP, software development, data, AI, cloud, DevOps and cybersecurity.",
  consulting:
    "Archon supports SAP consulting, enterprise development, migration, integration, staffing, cloud and automation.",
  products:
    "Archon is building SAP Guru Assistant, AI Command Center, ArchRoom and future product concepts.",
  stories:
    "Archon has supported more than 7,000 learners and has grown from one room into an international ecosystem.",
  global:
    "Archon operates across India, Belgium, the United Kingdom and Sydney, Australia.",
  campus:
    "Archon is building a 15,000 sq ft future campus in Kerala for learning, mentorship, consulting, innovation and entrepreneurship.",
  vision:
    "Visitors can connect with Archon for learning, consulting, collaboration, products and career guidance.",
};

function createMockReply(message: string, scene: string) {
  const normalised = message.toLowerCase();

  if (
    normalised.includes("sap") &&
    (normalised.includes("course") ||
      normalised.includes("career") ||
      normalised.includes("learn"))
  ) {
    return "SAP can be a strong career path, but the right module depends on your education, work experience, interests and whether you prefer functional, technical or analytical work. Share your background and I’ll help narrow it down.";
  }

  if (
    normalised.includes("consulting") ||
    normalised.includes("project") ||
    normalised.includes("business")
  ) {
    return "Archon supports organisations through SAP consulting, enterprise software development, migration, integration, resource augmentation, cloud services and AI automation. Briefly describe your requirement and the relevant team can guide you.";
  }

  if (
    normalised.includes("founder") ||
    normalised.includes("mohamed") ||
    normalised.includes("aslam")
  ) {
    return "Archon was founded by Mohamed Aslam in 2013. His own journey as an average student shaped Archon’s belief that practical understanding, mentorship and industry exposure matter more than marks alone.";
  }

  if (
    normalised.includes("campus") ||
    normalised.includes("building") ||
    normalised.includes("kerala")
  ) {
    return "Archon’s upcoming Kerala campus is planned as a 15,000 sq ft ecosystem for learning, mentorship, consulting, product development, innovation and entrepreneurship.";
  }

  if (
    normalised.includes("product") ||
    normalised.includes("archroom") ||
    normalised.includes("command center")
  ) {
    return "Archon is currently developing SAP Guru Assistant, AI Command Center and ArchRoom. These products focus on intelligent communication, automation, business operations and collaboration.";
  }

  return `${sceneKnowledge[scene] ?? sceneKnowledge.hero} Tell me a little more about what you are looking for, and I’ll guide you in the right direction.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequest;

    const message = body.message?.trim();
    const scene = body.scene ?? "hero";
    const history = body.history ?? [];

    if (!message) {
      return NextResponse.json(
        {
          error: "A message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const assistantBackendUrl = process.env.ARCHON_AI_BACKEND_URL;
    const assistantApiKey = process.env.ARCHON_AI_API_KEY;

    if (assistantBackendUrl) {
      const response = await fetch(assistantBackendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(assistantApiKey
            ? {
                Authorization: `Bearer ${assistantApiKey}`,
              }
            : {}),
        },
        body: JSON.stringify({
          message,
          scene,
          history,
          source: "archon-website",
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Archon AI backend error:", {
          status: response.status,
          body: errorText,
        });

        return NextResponse.json(
          {
            error: "The AI assistant is temporarily unavailable.",
          },
          {
            status: 502,
          }
        );
      }

      const data = await response.json();

      const reply =
        data.reply ??
        data.message ??
        data.answer ??
        data.response ??
        "I received your message, but the assistant returned an empty response.";

      return NextResponse.json({
        reply,
      });
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });

    return NextResponse.json({
      reply: createMockReply(message, scene),
      mode: "mock",
    });
  } catch (error) {
    console.error("Archon AI route error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while processing your message.",
      },
      {
        status: 500,
      }
    );
  }
}