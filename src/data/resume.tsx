import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Ritik",
  initials: "RS",
  url: "https://github.com/RITIKSINGH-DEOS",
  location: "Lucknow, Uttar Pradesh, India",
  locationLink: "https://www.google.com/maps/place/Lucknow",
  description:
    "Full Stack Developer transitioning into Full Stack AI Engineer — expertise in React, Next.js, Node.js, Java, DSA, and now exploring LLMs, LangChain, Ollama, and Python ML/AI.",
  summary: "**Full Stack MERN Developer** transitioning into a **Full Stack AI Engineer**. Specializing in building SCALABLE, Production-Grade SaaS and web applications. Experienced in **Java**, **NodeJS**, **Express**, and building **modern full-stack web applications**. Strong foundation in **problem-solving** and **software architecture**. Built and deployed **10+ real-world, production-ready projects** and actively contributed to high-impact engineering challenges. Currently learning **LLMs**, **LangChain**, **Ollama**, **Python**, and **TensorFlow** to build AI-powered applications. Currently learning **AI Automation**, **TypeScript**, and modern **Next.js** development to build intelligent and scalable full-stack applications while continuously improving problem-solving skills. Dedicated to writing clean, maintainable code and following best practices in software development.",
  avatarUrl: "/me.png",
  skills: [
    "JavaScript",
    "TypeScript",
    "Java",
    "Python",
    "SQL",

    "React.js",
    "Next.js",
    "Tailwind CSS",
    "GSAP",
    "shadcn/ui",

    "Node.js",
    "Express.js",
    "REST API",
    "JWT Authentication",

    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Mongoose",

    "Docker",
    "Git",
    "GitHub Actions",
    "CI/CD",
    "Vercel",
    "Render",

    "Postman",
    "Supabase",
    "Razorpay",
    "Google Gemini API",
    "LLM Integration",
    "Streamlit",

  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "https://medium.com/@yourusername", icon: Icons.mediumRound, label: "Medium" },
  ],
  contact: {
    email: "businessritiksinghdeos@gmail.com",
    tel: "+919956251140",
    social: {
      GitHub: { name: "GitHub", url: "https://github.com/RITIKSINGH-DEOS", icon: Icons.github, navbar: true },
      LinkedIn: { name: "LinkedIn", url: "https://www.linkedin.com/in/ritiksinghdeos/", icon: Icons.linkedin, navbar: true },
      // medium: { name: "Medium", url: "https://medium.com/@yourusername", icon: Icons.medium, navbar: false },
      // X: { name: "X", url: "https://x.com/yourusername", icon: Icons.x, navbar: true },
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/919956251140",
        icon: Icons.whatsapp,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "IBM SkillsBuild × Edunet Foundation",
      href: "https://drive.google.com/file/d/1KMYujMY9hH-XPoNCs1HZMY9ewxz0mwC-/view?usp=sharing",
      location: "Remote",
      title: "Artificial Intelligence Virtual Intern",
      logoUrl: "/ibm.png",
      start: "May 2026",
      end: "June 2026",
      description:
        "Completed a **6-week Artificial Intelligence Virtual Internship** organized by **IBM SkillsBuild × Edunet Foundation** in collaboration with **AICTE**. Built an AI-powered application using **Python**, **Streamlit**, **Google Gemini API**, **Pillow (PIL)**, and **python-dotenv**, gaining hands-on experience in **Generative AI**, AI application development, and prompt engineering.",
    },

  ],

  education: [
    {
      school: "Shri Ramswaroop Memorial University",
      href: "https://srmu.ac.in/",
      degree: "B.Tech CSE — CGPA: 7.8",
      logoUrl: "/srmu.png",
      start: "Aug 2023",
      end: "June 2027",
    },
    {
      school: "Coding Shuttle",
      href: "https://drive.google.com/file/d/1YrFVDxd6WUs_TrKNpSJr6H7cfLzkZTh0/view?usp=sharing",
      degree: "MERN Stack Full Course ",
      logoUrl: "/codingshuttle.png",
      start: "2022",
      end: "Jan 2023",
    },
  ],

  projects: [
    {
      title: "ResumeAI",
      href: "https://resume-ai-ochre-mu.vercel.app/",
      dates: " July 2026",
      active: true,
      description:
        "**Resume / ATS** scoring & career tools. **Next.js**, **Clerk**, **Supabase**. Server-only AI: **Gemini** (paid) / **Hugging Face** (free); API keys stay on server.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Clerk",
        "Supabase",
        "Google Gemini",
        "Hugging Face",
        "TailwindCSS",
        "DaisyUI",
      ],
      links: [
        { type: "Live Demo", href: "https://resume-ai-ochre-mu.vercel.app/" },
        { type: "GitHub", href: "https://github.com/RITIKSINGH-DEOS/ResumeAI.git" },
      ],
      image: "",
      video: "/resumeai.mp4",
    },
    {
      title: "MedConnect",
      href: "https://med-connect-jet.vercel.app/",
      dates: "June 2026",
      active: true,
      description:
        "**Telemedicine**: doctors, bookings, video consults. **REST** + RBAC, **PostgreSQL** + **Prisma**. **Gemini** symptom guidance (safety-limited).",
      technologies: [
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Google Gemini API",
      ],
      links: [
        { type: "Live Demo", href: "https://med-connect-jet.vercel.app/" },
        { type: "GitHub", href: "https://github.com/RITIKSINGH-DEOS/MedConnect.git" },
      ],
      image: "",
      video: "/medconnect.mp4",
    },
    {
      title: "AI Learning Assistant",
      href: "https://ai-learning-assistant-gamma-two.vercel.app/login",
      dates: "May 2026",
      active: true,
      description:
        "AI-powered **MERN** application that enables students to upload study documents, generate **AI summaries**, **chat with PDFs**, create **flashcards**, and take **AI-generated quizzes** using **Google Gemini API**.",
      technologies: [
        "React 19",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Google Gemini API",
        "JWT",
        "Tailwind CSS",
      ],
      links: [
        { type: "Live Demo", href: "https://ai-learning-assistant-gamma-two.vercel.app/login" },
        { type: "GitHub", href: "https://github.com/RITIKSINGH-DEOS/AI-Learning-Assistant.git" },
      ],
      image: "/ailearning.png",
      video: "",
    },
    {
      title: "Support AI",
      href: "https://support-ai-wheat.vercel.app/",
      dates: "Jan 2026",
      active: true,
      description:
        "AI-powered customer support platform that enables businesses to create custom **AI chatbots**, manage knowledge bases, and embed intelligent support widgets using **Google Gemini AI**.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "MongoDB",
        "Mongoose",
        "ScaleKit",
        "Google Gemini API",
      ],
      links: [
        { type: "GitHub", href: "https://github.com/RITIKSINGH-DEOS/support-ai.git" },
        { type: "Live Demo", href: "https://support-ai-wheat.vercel.app/" },
      ],
      image: "/supportai.png",
      video: "",
    },
  ],

  certifications: [
    {
      title: "IBM Artificial Intelligence",
      issuer: "IBM SkillsBuild × Edunet Foundation",
      date: "Jun 2026",
      href: "https://drive.google.com/file/d/1KMYujMY9hH-XPoNCs1HZMY9ewxz0mwC-/view?usp=sharing",
      description: "**Python**, **Streamlit**, Google Gemini API, Generative AI, Prompt Engineering",
      logoUrl: "/ibm-certification.png",
    },
    {
      title: "Google Skills",
      issuer: "Google",
      date: "2025",
      href: "https://www.skills.google/public_profiles/89fd0439-0223-4090-988b-7cd80a4a12dc",
      description: "**Google Cloud**, Cloud Computing, Generative AI",
      logoUrl: "/google-skills-cloud.png",
    },
    {
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      date: "2025",
      href: "https://badges.parchment.com/public/assertions/5tet_7ksSa619_5wJhVj-Q?identity__email=ritikritik4500@gmail.com",
      description: "**REST APIs**, API Testing, Postman Collections",
      logoUrl: "/postman.png",
    },
    {
      title: "MERN Stack Full Course",
      issuer: "Coding Shuttle",
      date: "2023",
      href: "https://drive.google.com/file/d/1YrFVDxd6WUs_TrKNpSJr6H7cfLzkZTh0/view?usp=sharing",
      description: "**MERN** — Mongo, Express, React, Node end-to-end.",
      logoUrl: "/codingshuttle.png",
    },
  ],

  achievements: [
    {
      title: "IBM SkillsBuild × Edunet Foundation — AI Virtual Internship",
      date: "Jun 2026",
      logoUrl: "/ibm.png",
      href: "https://drive.google.com/file/d/1KMYujMY9hH-XPoNCs1HZMY9ewxz0mwC-/view?usp=sharing",
      description: "Successfully completed a 6-week Artificial Intelligence Virtual Internship.",
    },
  ],
} as const;
