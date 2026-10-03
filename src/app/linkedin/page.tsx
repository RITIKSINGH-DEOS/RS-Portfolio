import { Metadata } from "next";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { RedirectPortal } from "@/components/redirect-portal";

export const metadata: Metadata = {
  title: "LinkedIn | Ritik Singh",
  description:
    "Connect with Ritik Singh on LinkedIn. View work experience, skills, education, career background, and professional recommendations.",
  alternates: {
    canonical: `${DATA.url}/linkedin`,
  },
  openGraph: {
    title: "LinkedIn | Ritik Singh",
    description:
      "Connect with Ritik Singh on LinkedIn. View work experience, skills, education, career background, and professional recommendations.",
    url: `${DATA.url}/linkedin`,
    siteName: "Ritik Singh",
    type: "website",
  },
};

export default function LinkedInPage() {
  return (
    <RedirectPortal
      title="LinkedIn Profile"
      description="Connect with Ritik Singh on LinkedIn. View career history, recommendations, and engineering background."
      targetUrl={DATA.contact.social.LinkedIn.url}
      buttonText="Open LinkedIn Profile"
      badge="PROFESSIONAL NETWORK"
      icon={<Icons.linkedin className="size-7" />}
    />
  );
}
