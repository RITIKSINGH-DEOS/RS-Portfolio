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

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const summarySentences = DATA.summary ? DATA.summary.split(/(?<=\.)\s+/) : [];

  let delayCounter = 0.22;
  const getDelay = (step = 0.045) => {
    const current = delayCounter;
    delayCounter += step;
    return current;
  };

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* Hero Section */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col flex-1 space-y-1.5">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Interactive3DName
                  prefix="Hi, I'm"
                  name={DATA.name?.split(" ")[0] ?? "Ritik"}
                  suffix="👋"
                />
              </BlurFade>
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="max-w-[600px] md:text-xl"
                text={DATA.description ?? ""}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
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
      <section id="about">
        <div className="flex flex-col gap-y-2">
          <BlurFade delay={getDelay(0.06)}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <div className="space-y-1.5">
            {summarySentences.map((sentence, idx) => (
              <BlurFade key={idx} delay={getDelay(0.04)}>
                <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
                  {sentence}
                </Markdown>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work">
        <div className="flex flex-col gap-y-3">
          <BlurFade delay={getDelay(0.06)}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work?.map((work) => (
            <BlurFade key={work.company} delay={getDelay(0.08)}>
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <div className="flex flex-col gap-y-3">
          <BlurFade delay={getDelay(0.06)}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education?.map((edu) => (
            <BlurFade key={edu.school} delay={getDelay(0.08)}>
              <ResumeCard
                href={edu.href}
                logoUrl={edu.logoUrl}
                altText={edu.school}
                title={edu.school}
                subtitle={edu.degree}
                period={`${edu.start} - ${edu.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="flex flex-col gap-y-3">
          <BlurFade delay={getDelay(0.06)}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills?.map((skill) => (
              <BlurFade key={skill} delay={getDelay(0.035)}>
                <Badge>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements (hackathons, publications, etc.) */}
      <section id="achievements">
        <div className="flex flex-col gap-y-3">
          <BlurFade delay={getDelay(0.06)}>
            <h2 className="text-xl font-bold">Achievements</h2>
          </BlurFade>
          {DATA.achievements?.map((item) => (
            <BlurFade key={item.title} delay={getDelay(0.08)}>
              <ResumeCard
                href={item.href}
                logoUrl={item.logoUrl}
                altText={item.title}
                title={item.title}
                subtitle={item.description}
                period={item.date}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <BlurFade delay={getDelay(0.05)}>
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
              </BlurFade>
              <BlurFade delay={getDelay(0.05)}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
              </BlurFade>
              <BlurFade delay={getDelay(0.05)}>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple websites to complex web applications.
                </p>
              </BlurFade>
            </div>
          </div>

          <ProjectsGrid
            projects={DATA.projects}
            baseDelay={getDelay(0.08)}
          />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications">
        <div className="flex flex-col gap-y-3">
          <BlurFade delay={getDelay(0.06)}>
            <h2 className="text-xl font-bold">Certifications</h2>
          </BlurFade>
          {DATA.certifications?.map((cert) => (
            <BlurFade key={cert.title} delay={getDelay(0.08)}>
              <ResumeCard
                href={cert.href}
                logoUrl={cert.logoUrl}
                altText={cert.issuer}
                title={cert.title}
                subtitle={cert.issuer}
                period={cert.date}
                description={cert.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
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
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
