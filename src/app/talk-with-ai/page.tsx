import { Metadata } from "next";
import { DATA } from "@/data/resume";
import { BotMessageSquare } from "lucide-react";
import { RedirectPortal } from "@/components/redirect-portal";

export const metadata: Metadata = {
  title: "Talk with AI Assistant | Ritik Singh",
  description:
    "Chat live with Ritik Singh's personal AI Assistant powered by Google Gemini. Ask about projects, engineering skills, tech stack, and background in real-time.",
  alternates: {
    canonical: `${DATA.url}/talk-with-ai`,
  },
  openGraph: {
    title: "Talk with AI Assistant | Ritik Singh",
    description:
      "Chat live with Ritik Singh's personal AI Assistant powered by Google Gemini. Ask about projects, engineering skills, tech stack, and background in real-time.",
    url: `${DATA.url}/talk-with-ai`,
    siteName: "Ritik Singh",
    type: "website",
  },
};

export default function TalkWithAIPage() {
  return (
    <RedirectPortal
      title="Ask Ritik's AI"
      description="Launching Ritik Singh's conversational AI assistant powered by Google Gemini to explore projects, skills, and background."
      targetUrl="/?chat=true"
      buttonText="Launch AI Assistant"
      badge="AI ASSISTANT // GEMINI"
      icon={<BotMessageSquare className="size-7 text-red-500 dark:text-blue-400" />}
    />
  );
}
