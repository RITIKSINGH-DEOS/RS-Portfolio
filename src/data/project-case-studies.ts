export interface MetricItem {
  label: string;
  value: string;
  desc: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
  tag: string;
}

export interface TakeawayItem {
  title: string;
  desc: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  heroHeadline: string;
  summary: string;
  categoryBadge: string;
  statusBadge: string;
  specs: {
    role: string;
    timeline: string;
    stack: string[];
    liveUrl: string;
    githubUrl: string;
    video?: string;
    image?: string;
  };
  metrics: MetricItem[];
  navItems: { id: string; label: string }[];
  problem: {
    headline: string;
    story: string;
    bulletPoints: { title: string; desc: string }[];
  };
  howItWorks: {
    headline: string;
    steps: HowItWorksStep[];
  };
  features: FeatureItem[];
  takeaways: TakeawayItem[];
}

export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  "resume-ai": {
    slug: "resume-ai",
    title: "ResumeAI",
    tagline: "Smart Resume Reviewer & Job Matcher",
    heroHeadline: "Fix your resume. Beat the hiring filters.",
    summary:
      "Most companies use automated software (ATS) to filter resumes before a recruiter ever looks at them. ResumeAI scans your resume against any job description, gives you an instant match score, and shows you the exact words and bullet points to fix so you get interviews.",
    categoryBadge: "AI CAREER TOOL",
    statusBadge: "LIVE",
    specs: {
      role: "Solo Creator",
      timeline: "July 2026",
      stack: ["Next.js", "React", "TypeScript", "Clerk Auth", "Supabase", "Gemini AI", "Tailwind CSS"],
      liveUrl: "https://resume-ai-ochre-mu.vercel.app/",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/ResumeAI.git",
      video: "/resumeai.mp4",
    },
    metrics: [
      {
        label: "Match Accuracy",
        value: "95%",
        desc: "Catches missing skills and formatting traps that ATS filters reject",
      },
      {
        label: "Review Speed",
        value: "< 2s",
        desc: "Instant feedback as soon as you upload your PDF",
      },
      {
        label: "100% Private",
        value: "Zero Leaks",
        desc: "Your phone number and resume data are never shared or sold",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "how-it-works", label: "02. How It Works" },
      { id: "features", label: "03. Key Features" },
      { id: "takeaways", label: "04. What I Learned" },
    ],
    problem: {
      headline: "75% of qualified job seekers get rejected by software, not humans.",
      story:
        "When you apply for a job online, an automated scanner reads your resume first. If you're missing exact keywords, or if your layout has columns it can't read, you get an automated rejection email within minutes. Job seekers have no idea what went wrong, and hiring tools charge expensive monthly subscriptions just to check.",
      bulletPoints: [
        {
          title: "The Silent Rejection Trap",
          desc: "You apply to dozens of jobs and hear nothing back, with zero clues on what to improve.",
        },
        {
          title: "Expensive Tools",
          desc: "Commercial resume graders ask for $20-$30/month just to scan a single PDF document.",
        },
        {
          title: "Privacy Risks",
          desc: "Uploading personal contact details to random websites puts your private data at risk.",
        },
      ],
    },
    howItWorks: {
      headline: "Simple 3-step process to pass the filter.",
      steps: [
        {
          step: "1",
          title: "Upload Your Resume",
          desc: "Drop your PDF resume. The app securely reads the text in under a second.",
        },
        {
          step: "2",
          title: "Paste the Job Description",
          desc: "Paste the role you want to apply for so the AI knows what the employer is looking for.",
        },
        {
          step: "3",
          title: "Get Fixes Instantly",
          desc: "You get a 0-100 score, a list of missing keywords, and rewritten bullet points you can copy directly.",
        },
      ],
    },
    features: [
      {
        title: "Match Score (0 to 100)",
        desc: "See how well your resume matches the job description at a single glance.",
        tag: "INSTANT SCORE",
      },
      {
        title: "Missing Keywords Detector",
        desc: "Highlights the exact technical and soft skills the employer wants that your resume skipped.",
        tag: "KEYWORD MATCH",
      },
      {
        title: "Bullet Point Rewriter",
        desc: "Turns boring lines like 'Worked on dashboard' into strong lines like 'Built real-time dashboard that cut load time by 40%'.",
        tag: "AUTO REWRITE",
      },
      {
        title: "1-Click Clean Export",
        desc: "Download a clean, single-column format that every company's software can read effortlessly.",
        tag: "CLEAN FORMAT",
      },
    ],
    takeaways: [
      {
        title: "People want clear fixes, not just a number",
        desc: "Giving someone a score of 65/100 is unhelpful unless you show them the exact 3 sentences to change.",
      },
      {
        title: "Speed builds confidence",
        desc: "When users get feedback in 2 seconds instead of waiting a minute, they actually use the tool to tailor every application.",
      },
      {
        title: "Privacy is non-negotiable",
        desc: "Resumes have sensitive phone numbers and emails. Keeping data locked to the user's account creates real trust.",
      },
    ],
  },

  "medconnect": {
    slug: "medconnect",
    title: "MedConnect",
    tagline: "Online Doctor Appointments & Video Care",
    heroHeadline: "Skip the waiting room. Consult verified doctors from home.",
    summary:
      "A telemedicine platform where patients can check symptoms with AI guidance, book instant appointments with certified doctors without schedule clashes, and have private, secure video consultations directly in their browser.",
    categoryBadge: "HEALTHCARE // TELEMEDICINE",
    statusBadge: "LIVE",
    specs: {
      role: "Solo Creator",
      timeline: "June 2026",
      stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "WebRTC", "Gemini AI"],
      liveUrl: "https://med-connect-jet.vercel.app/",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/MedConnect.git",
      video: "/medconnect.mp4",
    },
    metrics: [
      {
        label: "Zero Clashes",
        value: "100%",
        desc: "Atomic database locking guarantees no two patients get the same slot",
      },
      {
        label: "Safe AI",
        value: "Guarded",
        desc: "Strictly guides to doctors; never prescribes medicine or guesses treatments",
      },
      {
        label: "No App Needed",
        value: "1-Click",
        desc: "Video calls work right inside any phone or laptop browser",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "how-it-works", label: "02. How It Works" },
      { id: "features", label: "03. Key Features" },
      { id: "takeaways", label: "04. What I Learned" },
    ],
    problem: {
      headline: "Getting a simple doctor's consultation takes hours of travel and waiting.",
      story:
        "Patients often travel long distances and sit in crowded waiting rooms just for a routine check-up or follow-up prescription. Online health searches often cause panic with inaccurate medical claims. Meanwhile, small clinics struggle with overlapping paper diaries and double-booked appointments.",
      bulletPoints: [
        {
          title: "Long Waiting Queues",
          desc: "Taking half a day off work just to sit in a clinic waiting room for 10 minutes with a doctor.",
        },
        {
          title: "Double-Booking Headaches",
          desc: "Clinics accidentally scheduling two patients for the same slot, causing frustrating delays.",
        },
        {
          title: "Dangerous Google Searches",
          desc: "Searching symptoms online leads to exaggerated worst-case fears instead of calm clinical direction.",
        },
      ],
    },
    howItWorks: {
      headline: "Quality healthcare in 3 easy steps.",
      steps: [
        {
          step: "1",
          title: "Describe Symptoms",
          desc: "Type what you're feeling. The AI recommends the right specialty (e.g. Cardiologist or Dermatologist).",
        },
        {
          step: "2",
          title: "Pick an Open Slot",
          desc: "Select a convenient time from the doctor's live calendar. The slot locks instantly.",
        },
        {
          step: "3",
          title: "Join Video Call",
          desc: "Join a secure video call on your phone or laptop, talk to the doctor, and get a digital prescription.",
        },
      ],
    },
    features: [
      {
        title: "Conflict-Free Calendar",
        desc: "Automatic database locking ensures a booked time slot is never offered to anyone else.",
        tag: "SMART SCHEDULING",
      },
      {
        title: "Safe Symptom Assistant",
        desc: "Helps you describe your condition and tells you whether you need a general doctor or an urgent hospital visit.",
        tag: "SAFETY AI",
      },
      {
        title: "Browser Video Consultations",
        desc: "Direct encrypted video calls without downloading Zoom, Teams, or third-party apps.",
        tag: "PRIVATE WEBRTC",
      },
      {
        title: "Doctor & Patient Records",
        desc: "Doctors can view previous visits, write prescriptions, and keep history organized in one place.",
        tag: "DIGITAL PRESCRIPTION",
      },
    ],
    takeaways: [
      {
        title: "AI in medicine must have strict guardrails",
        desc: "The AI must never act as a doctor. Its only job is to guide the user calmly to the right real human doctor.",
      },
      {
        title: "Booking systems must be bulletproof",
        desc: "Preventing double-booking is the #1 job of a medical app. Doing this directly at the database level eliminates errors.",
      },
      {
        title: "Simplicity is kindness",
        desc: "People using medical apps are often unwell or stressed. The design must be clean, legible, and easy to use.",
      },
    ],
  },

  "ai-learning-assistant": {
    slug: "ai-learning-assistant",
    title: "AI Learning Assistant",
    tagline: "Study Notes, Flashcards & Quiz Generator",
    heroHeadline: "Upload your syllabus notes. Master any exam in half the time.",
    summary:
      "A student-friendly study app that turns dense, boring textbook PDFs into interactive learning tools. Upload any notes or syllabus, ask questions in plain English, and auto-generate 3D flashcards and practice quizzes to test yourself before exams.",
    categoryBadge: "STUDY APP // ED-TECH",
    statusBadge: "LIVE",
    specs: {
      role: "Solo Creator",
      timeline: "May 2026",
      stack: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "JWT Auth", "Tailwind CSS"],
      liveUrl: "https://ai-learning-assistant-gamma-two.vercel.app/login",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/AI-Learning-Assistant.git",
      image: "/ailearning.png",
    },
    metrics: [
      {
        label: "Quick Summary",
        value: "< 3s",
        desc: "Turns 50-page reading chapters into clear 5-minute study briefs",
      },
      {
        label: "Practice Quizzes",
        value: "10 Questions",
        desc: "Instant multiple-choice quizzes with explanations for every answer",
      },
      {
        label: "Active Recall",
        value: "3D Cards",
        desc: "Flip cards designed to test your memory, not just passive reading",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "how-it-works", label: "02. How It Works" },
      { id: "features", label: "03. Key Features" },
      { id: "takeaways", label: "04. What I Learned" },
    ],
    problem: {
      headline: "Re-reading notes is the slowest, least effective way to study.",
      story:
        "College students spend entire nights highlighting 80-page textbook PDFs, yet forget 70% of it the next morning. Science proves that testing yourself (active recall) is the best way to remember, but manually writing flashcards and practice test questions by hand takes hours.",
      bulletPoints: [
        {
          title: "Information Overload",
          desc: "Heavy PDFs and long chapters take forever to read and summarize manually.",
        },
        {
          title: "Passive Studying",
          desc: "Reading lines again and again feels productive, but fails during actual exams.",
        },
        {
          title: "Generic AI Answers",
          desc: "Standard AI chatbots answer from general internet data instead of your teacher's exact syllabus.",
        },
      ],
    },
    howItWorks: {
      headline: "From boring notes to exam-ready in 3 steps.",
      steps: [
        {
          step: "1",
          title: "Upload Chapter PDF",
          desc: "Upload your class notes, lecture slides, or textbook chapter.",
        },
        {
          step: "2",
          title: "Ask Anything in Plain English",
          desc: "Ask the AI to explain complex topics like you're five. It answers directly from your document.",
        },
        {
          step: "3",
          title: "Drill with Quizzes & Cards",
          desc: "Generate 10 practice questions with instant scoring to make sure you actually understand.",
        },
      ],
    },
    features: [
      {
        title: "Chat with Any Document",
        desc: "Ask questions and get answers that quote the exact page and chapter from your notes.",
        tag: "SMART CHAT",
      },
      {
        title: "3D Flip Flashcards",
        desc: "Interactive cards with definitions on the front and answers on the back for rapid memory drills.",
        tag: "MEMORY CARDS",
      },
      {
        title: "Practice Exam Simulator",
        desc: "Multiple-choice quizzes that test your understanding and explain why wrong options are wrong.",
        tag: "QUIZ GENERATOR",
      },
      {
        title: "Executive Chapter Summaries",
        desc: "Condenses 50-page reading assignments into clean, 5-minute review sheets before tests.",
        tag: "QUICK SUMMARY",
      },
    ],
    takeaways: [
      {
        title: "Quizzes beat reading every time",
        desc: "Students learn much faster when challenged with a quick test rather than another paragraph of text.",
      },
      {
        title: "Mobile design is critical for college students",
        desc: "Most revision happens on phones while travelling or waiting outside exam halls. The app had to be fast on mobile.",
      },
      {
        title: "Citing sources prevents confusion",
        desc: "When the AI tells students 'This is on Page 14 of your syllabus', it gives them complete confidence.",
      },
    ],
  },

  "support-ai": {
    slug: "support-ai",
    title: "Support AI",
    tagline: "Instant 24/7 AI Customer Support Chatbot",
    heroHeadline: "Answer customer questions instantly. Stop drowning in support tickets.",
    summary:
      "A modern customer support platform that businesses can add to their website in 2 minutes. It reads your product FAQs, answers customer queries 24/7 in under 2 seconds, and connects them to human agents if it ever needs help.",
    categoryBadge: "CUSTOMER SUPPORT // AI BOT",
    statusBadge: "LIVE",
    specs: {
      role: "Solo Creator",
      timeline: "Jan 2026",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "ScaleKit", "Gemini AI"],
      liveUrl: "https://support-ai-wheat.vercel.app/",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/support-ai.git",
      image: "/supportai.png",
    },
    metrics: [
      {
        label: "Instant Replies",
        value: "< 2s",
        desc: "Customers get clear answers in seconds, day or night",
      },
      {
        label: "Ticket Reduction",
        value: "65%",
        desc: "Resolves repetitive FAQs without bothering your team",
      },
      {
        label: "Honest Bot",
        value: "No Guessing",
        desc: "Never makes up fake policies; connects to humans when unsure",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "how-it-works", label: "02. How It Works" },
      { id: "features", label: "03. Key Features" },
      { id: "takeaways", label: "04. What I Learned" },
    ],
    problem: {
      headline: "Customers leave websites if they have to wait hours for simple answers.",
      story:
        "Over 60% of customer questions are the same repetitive questions: 'What is your refund policy?', 'How do I track my order?', 'Do you ship to my city?'. Small teams spend hours answering the same emails, while slow responses lead to frustrated shoppers leaving the site.",
      bulletPoints: [
        {
          title: "Slow Response Times",
          desc: "Shoppers waiting hours for an email reply usually buy from a competitor instead.",
        },
        {
          title: "Repetitive Work for Founders",
          desc: "Typing the exact same FAQ answers 50 times a day wastes valuable time.",
        },
        {
          title: "Old Bots Are Annoying",
          desc: "Legacy rule-based bots keep repeating 'Sorry, I don't understand' whenever a user types normally.",
        },
      ],
    },
    howItWorks: {
      headline: "Set up 24/7 support in 3 easy steps.",
      steps: [
        {
          step: "1",
          title: "Paste FAQ Links or Docs",
          desc: "Add your store policy, return rules, or product documentation.",
        },
        {
          step: "2",
          title: "Add Chat Bubble to Your Site",
          desc: "Copy and paste a simple 1-line code snippet onto your website.",
        },
        {
          step: "3",
          title: "Let AI Handle Routine Questions",
          desc: "The bot answers shoppers in real time. If it doesn't know, it collects their email for your team.",
        },
      ],
    },
    features: [
      {
        title: "24/7 Instant Answers",
        desc: "Helps your shoppers at 2 AM on weekends without hiring overnight staff.",
        tag: "ALWAYS ON",
      },
      {
        title: "Honest Escalation",
        desc: "Never invents fake discounts or policies; politely collects customer email when unsure.",
        tag: "NO HALLUCINATIONS",
      },
      {
        title: "Works on Any Website",
        desc: "Compatible with Shopify, WordPress, Webflow, custom React apps, or plain HTML sites.",
        tag: "EASY EMBED",
      },
      {
        title: "Customer Questions Inbox",
        desc: "See what shoppers are asking so you know which product details to improve on your store.",
        tag: "INSIGHTS",
      },
    ],
    takeaways: [
      {
        title: "An honest bot is a respected bot",
        desc: "Shoppers prefer an AI that says 'Let me take your email and have our team reply' over one that makes up wrong answers.",
      },
      {
        title: "Speed is sales",
        desc: "Answering a shopper's shipping question in 2 seconds is often the difference between a sale and an abandoned cart.",
      },
      {
        title: "Keep the widget lightweight",
        desc: "The chat widget must load in milliseconds so it never slows down the main storefront.",
      },
    ],
  },
};
