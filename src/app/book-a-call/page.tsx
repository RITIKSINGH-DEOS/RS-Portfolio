import { Metadata } from "next";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { RedirectPortal } from "@/components/redirect-portal";

export const metadata: Metadata = {
  title: "Book a Call | Ritik Singh",
  description:
    "Schedule a 1-on-1 call or chat with Ritik Singh for software engineering roles, project discussions, or technical consultations.",
  alternates: {
    canonical: `${DATA.url}/book-a-call`,
  },
  openGraph: {
    title: "Book a Call | Ritik Singh",
    description:
      "Schedule a 1-on-1 call or chat with Ritik Singh for software engineering roles, project discussions, or technical consultations.",
    url: `${DATA.url}/book-a-call`,
    siteName: "Ritik Singh",
    type: "website",
  },
};

export default function BookACallPage() {
  return (
    <RedirectPortal
      title="Book a Call / Chat"
      description="Connect directly with Ritik Singh via WhatsApp for project inquiries, engineering hiring, or tech discussions."
      targetUrl={DATA.contact.social.WhatsApp.url}
      buttonText="Chat on WhatsApp"
      badge="DIRECT CONTACT // 1-ON-1"
      icon={<Icons.whatsapp className="size-7" />}
    />
  );
}
