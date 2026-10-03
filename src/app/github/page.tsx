import { Metadata } from "next";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { RedirectPortal } from "@/components/redirect-portal";

export const metadata: Metadata = {
  title: "GitHub | Ritik Singh",
  description:
    "Explore Ritik Singh's open-source projects, repositories, code contributions, and Full Stack AI engineering work on GitHub.",
  alternates: {
    canonical: `${DATA.url}/github`,
  },
  openGraph: {
    title: "GitHub | Ritik Singh",
    description:
      "Explore Ritik Singh's open-source projects, repositories, code contributions, and Full Stack AI engineering work on GitHub.",
    url: `${DATA.url}/github`,
    siteName: "Ritik Singh",
    type: "website",
  },
};

export default function GitHubPage() {
  return (
    <RedirectPortal
      title="GitHub Repositories"
      description="Explore Ritik Singh's open-source repositories, AI apps, and full-stack projects on GitHub."
      targetUrl={DATA.contact.social.GitHub.url}
      buttonText="Open GitHub Profile"
      badge="OPEN SOURCE // CODE"
      icon={<Icons.github className="size-7" />}
    />
  );
}
