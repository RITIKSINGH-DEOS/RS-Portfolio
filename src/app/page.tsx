import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar3D } from "@/components/avatar-3d";
import { Interactive3DName } from "@/components/interactive-3d-name";
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
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col flex-1 space-y-2 w-full">
              <BlurFade delay={0}>
                <Interactive3DName
                  prefix="Hi, I'm"
                  name={DATA.name?.split(" ")[0] ?? "Ritik"}
                  suffix="👋"
                />
              </BlurFade>
              <BlurFadeText
                delay={0}
                className="w-full max-w-full sm:max-w-[600px] text-base md:text-xl text-muted-foreground leading-relaxed"
                text={DATA.description ?? ""}
              />
            </div>
            <BlurFade delay={0} className="hidden sm:block shrink-0">
              <Avatar3D
                src={DATA.avatarUrl}
                alt={DATA.name}
                initials={DATA.initials}
                className="size-28"
              />
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full">
        <BlurFade delay={0.02}>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">About</h2>
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
            <h2 className="text-xl font-bold">Work Experience</h2>
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
            <h2 className="text-xl font-bold">Education</h2>
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
            <h2 className="text-xl font-bold">Skills</h2>
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
            <h2 className="text-xl font-bold">Achievements</h2>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
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
            <h2 className="text-xl font-bold">Certifications</h2>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Message on{" "}
                <Link
                  href={DATA.contact?.social?.WhatsApp?.url ?? "#"}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </Link>
                , connect on{" "}
                <Link
                  href={DATA.contact?.social?.LinkedIn?.url ?? "#"}
                  className="text-blue-500 hover:underline"
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
