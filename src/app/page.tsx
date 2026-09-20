import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Interactive3DName } from "@/components/interactive-3d-name";
import { CommitMatrixCanvas } from "@/components/commit-matrix-canvas";
import { GithubContributions } from "@/components/github-contributions";
import { ProjectCard } from "@/components/project-card";
import { ProjectsGrid } from "@/components/projects-grid";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.02;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 w-full max-w-2xl mx-auto">
      {/* Hero Section */}
      <section id="hero" className="w-full">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
            <BlurFade delay={0}>
              <Interactive3DName
                prefix="Hi, I'm"
                name={DATA.name?.split(" ")[0] ?? "Ritik"}
                suffix="👋"
              />
            </BlurFade>
            <BlurFadeText
              delay={0}
              className="w-full max-w-full font-serif font-light text-xl sm:text-2xl md:text-[27px] text-foreground/90 leading-[1.32] tracking-[-0.02em]"
              text={DATA.description ?? ""}
            />
            <BlurFade delay={0.01}>
              <div className="pt-2 sm:pt-3 flex justify-center w-full">
                <a
                  href={DATA.contact.social.WhatsApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:via-red-600 hover:to-blue-600 px-7 py-3 text-sm sm:text-[15px] font-medium text-white border border-white/25 shadow-[0_10px_30px_-4px_rgba(220,38,38,0.55),0_4px_18px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_40px_-2px_rgba(220,38,38,0.8),0_4px_24px_rgba(37,99,235,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer select-none"
                  title="Book a short call"
                  aria-label="Book a short call on WhatsApp"
                >
                  Book a short call
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Spider-Man Themed Commit Matrix Skyline Animation */}
      <BlurFade delay={0.015}>
        <CommitMatrixCanvas />
      </BlurFade>

      {/* About Section */}
      <section id="about" className="w-full">
        <BlurFade delay={0.02}>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">About</h2>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
              {DATA.summary}
            </Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Work Section */}
      <section id="work" className="w-full">
        <BlurFade delay={0.04} inView>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">Work Experience</h2>
            {DATA.work?.map((work) => (
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Education Section */}
      <section id="education" className="w-full">
        <BlurFade delay={0.06} inView>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">Education</h2>
            {DATA.education?.map((edu) => (
              <ResumeCard
                key={edu.school}
                href={edu.href}
                logoUrl={edu.logoUrl}
                altText={edu.school}
                title={edu.school}
                subtitle={edu.degree}
                period={`${edu.start} - ${edu.end}`}
              />
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full">
        <BlurFade delay={0.08} inView>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {DATA.skills?.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Achievements (hackathons, publications, etc.) */}
      <section id="achievements" className="w-full">
        <BlurFade delay={0.10} inView>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">Achievements</h2>
            {DATA.achievements?.map((item) => (
              <ResumeCard
                key={item.title}
                href={item.href}
                logoUrl={item.logoUrl}
                altText={item.title}
                title={item.title}
                subtitle={item.description}
                period={item.date}
              />
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full">
        <BlurFade delay={0.12} inView>
          <div className="space-y-12 w-full py-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-[-0.04em] text-foreground leading-[1.1]">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple websites to complex web applications.
                </p>
              </div>
            </div>

            <ProjectsGrid
              projects={DATA.projects}
              baseDelay={0.05}
            />
          </div>
        </BlurFade>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="w-full">
        <BlurFade delay={0.14} inView>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">Certifications</h2>
            {DATA.certifications?.map((cert) => (
              <ResumeCard
                key={cert.title}
                href={cert.href}
                logoUrl={cert.logoUrl}
                altText={cert.issuer}
                title={cert.title}
                subtitle={cert.issuer}
                period={cert.date}
                description={cert.description}
              />
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Live GitHub Contributions Section (Spider-Man Theme) */}
      <section id="contributions" className="w-full">
        <BlurFade delay={0.15} inView>
          <GithubContributions />
        </BlurFade>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full">
        <BlurFade delay={0.16} inView>
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
            <div className="space-y-3">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="Ritik_Singh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-foreground text-background w-20 py-1 text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Download Resume"
                >
                  Resume
                </a>
                <div className="inline-flex items-center justify-center rounded-lg bg-foreground text-background w-20 py-1 text-sm">
                  Contact
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-[-0.04em] text-foreground leading-[1.1]">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Message on{" "}
                <Link
                  href={DATA.contact?.social?.WhatsApp?.url ?? "#"}
                  className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </Link>
                , connect on{" "}
                <Link
                  href={DATA.contact?.social?.LinkedIn?.url ?? "#"}
                  className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
               , and I&apos;ll respond as soon as I can.
              </p>
            </div>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
