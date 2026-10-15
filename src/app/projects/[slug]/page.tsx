import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROJECT_CASE_STUDIES } from "@/data/project-case-studies";
import { DATA } from "@/data/resume";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySidebar } from "@/components/case-study/case-study-sidebar";
import { CaseStudyProblem } from "@/components/case-study/case-study-problem";
import { CaseStudyHowItWorks } from "@/components/case-study/case-study-how-it-works";
import { CaseStudyFeatures } from "@/components/case-study/case-study-features";
import { CaseStudyTakeaways } from "@/components/case-study/case-study-takeaways";
import { CaseStudyFooterNav } from "@/components/case-study/case-study-footer-nav";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(PROJECT_CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const study = PROJECT_CASE_STUDIES[params.slug];

  if (!study) {
    return {
      title: "Project Not Found | Ritik Singh",
    };
  }

  const title = `${study.title} — Case Study | Ritik Singh`;
  const description = `${study.tagline}. ${study.summary.slice(0, 150)}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `${DATA.url}/projects/${study.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${DATA.url}/projects/${study.slug}`,
      siteName: "Ritik Singh - Engineering Portfolio",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const study = PROJECT_CASE_STUDIES[params.slug];

  if (!study) {
    notFound();
  }

  return (
    <article className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-2 pb-16">
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] overflow-hidden -z-10 opacity-60 dark:opacity-40"
      >
        <div className="absolute -top-32 left-10 size-96 rounded-full bg-red-600/15 blur-[120px]" />
        <div className="absolute -top-20 right-10 size-96 rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      {/* Hero Header */}
      <CaseStudyHero study={study} />

      {/* 2-Column Content Layout: Sticky Scroll-Spy Sidebar + Main Technical Breakdown */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-8 lg:gap-12 items-start">
        {/* Sticky Sidebar Navigation */}
        <CaseStudySidebar navItems={study.navItems} />

        {/* Main Content Sections: 4 clean, scannable chapters */}
        <div className="min-w-0 space-y-12">
          <CaseStudyProblem problem={study.problem} />
          <CaseStudyHowItWorks howItWorks={study.howItWorks} />
          <CaseStudyFeatures features={study.features} />
          <CaseStudyTakeaways takeaways={study.takeaways} />
        </div>
      </div>

      {/* Bottom Previous / Next Switcher */}
      <CaseStudyFooterNav currentSlug={study.slug} />
    </article>
  );
}
