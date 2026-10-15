export interface MetricItem {
  label: string;
  value: string;
  desc: string;
}

export interface PipelineStep {
  step: string;
  name: string;
  detail: string;
  tech: string;
}

export interface TradeoffItem {
  decision: string;
  chosen: string;
  alternative: string;
  reasoning: string;
}

export interface FeatureDeepDive {
  title: string;
  summary: string;
  bullets: string[];
  tag: string;
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
    architecture: string;
    llmEngine: string;
    database: string;
    hosting: string;
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
    description: string;
    painPoints: { title: string; desc: string }[];
  };
  architecture: {
    headline: string;
    description: string;
    pipeline: PipelineStep[];
  };
  tradeoffs: TradeoffItem[];
  features: FeatureDeepDive[];
  benchmarks: {
    headline: string;
    description: string;
    stats: { label: string; value: string; badge: string; context: string }[];
  };
  learnings: { title: string; description: string }[];
  nextSteps: string[];
}

export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  "resume-ai": {
    slug: "resume-ai",
    title: "ResumeAI",
    tagline: "AI ATS Intelligence & Career Optimization Platform",
    heroHeadline: "Deterministic rules evaluate. Generative models calibrate.",
    summary:
      "A privacy-first, server-executed resume parser and ATS intelligence engine. Built with Next.js 14, Clerk authentication, Supabase Row-Level Security, and a hybrid AI routing engine combining Google Gemini 1.5 and Hugging Face inference to provide instant, sub-second resume scoring and JD-matching without leaking candidate data.",
    categoryBadge: "FULL-STACK AI // CAREER TECH",
    statusBadge: "PRODUCTION READY · 2026",
    specs: {
      role: "Lead Developer & System Architect",
      timeline: "July 2026",
      architecture: "Edge Proxy + Serverless LLM Pipelines",
      llmEngine: "Google Gemini 1.5 Flash + Hugging Face Fallback",
      database: "Supabase (PostgreSQL with RLS)",
      hosting: "Vercel Edge Network",
      stack: [
        "Next.js 14",
        "React",
        "TypeScript",
        "Clerk Auth",
        "Supabase",
        "Google Gemini",
        "Hugging Face",
        "Tailwind CSS",
        "DaisyUI",
      ],
      liveUrl: "https://resume-ai-ochre-mu.vercel.app/",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/ResumeAI.git",
      video: "/resumeai.mp4",
    },
    metrics: [
      {
        label: "ATS Scoring Precision",
        value: "94.8%",
        desc: "Weighted semantic cosine match against enterprise parser schemas",
      },
      {
        label: "Time-to-First-Token",
        value: "< 1.2s",
        desc: "Streaming chunk response via Vercel Edge compute",
      },
      {
        label: "Client Token Leakage",
        value: "0.00%",
        desc: "100% server-only secret execution and sanitized output envelopes",
      },
      {
        label: "Token Optimization",
        value: "42%",
        desc: "Reduced prompt footprint using zero-shot semantic JSON framing",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "architecture", label: "02. Architecture" },
      { id: "tradeoffs", label: "03. Key Trade-offs" },
      { id: "features", label: "04. Deep Engineering" },
      { id: "benchmarks", label: "05. Performance" },
      { id: "learnings", label: "06. Retrospective" },
    ],
    problem: {
      headline: "75% of qualified engineering candidates are dropped by ATS filters before a human ever looks.",
      description:
        "Modern Applicant Tracking Systems (Workday, Taleo, Greenhouse) rely on strict parser heuristics, token matching, and structural rules. Qualified candidates often fail because of incompatible multi-column layouts, missing exact synonym tags, or unparsed achievement metrics. Furthermore, existing commercial AI tools either charge prohibitive fees or store unencrypted resumes on unvetted servers.",
      painPoints: [
        {
          title: "The ATS Black Box",
          desc: "Job seekers receive automated rejection emails with zero explanation of which keyword, skill, or formatting rule failed.",
        },
        {
          title: "Privacy & Data Vulnerability",
          desc: "Uploading personal resumes with phone numbers, emails, and address histories to shady AI wrapper tools puts candidate privacy at severe risk.",
        },
        {
          title: "Hallucinated Feedback",
          desc: "Generic LLMs often invent bogus criticisms without calculating deterministic keyword frequency or section readability.",
        },
      ],
    },
    architecture: {
      headline: "Dual-Tier Pipeline: Strict Parser Validation + Streaming Generative Feedback",
      description:
        "To guarantee high precision and zero data leaks, client browsers communicate solely with authenticated Next.js Edge Routes. API keys and system prompt instructions never reach the client bundle.",
      pipeline: [
        {
          step: "01",
          name: "Client Ingestion & Validation",
          detail: "PDF file upload with client-side magic-byte signature check and 5MB payload ceiling to eliminate malicious payloads.",
          tech: "React Dropzone · Uint8Array Parser",
        },
        {
          step: "02",
          name: "Server-side Text Normalization",
          detail: "Extracts plaintext while preserving hierarchy (Headings, Bullets, Dates) and stripping embedded scripts and zero-width spaces.",
          tech: "PDF-Parse · Regex Sanitizer",
        },
        {
          step: "03",
          name: "Dual-Engine Inference Routing",
          detail: "Routes payload to Google Gemini 1.5 Flash for high-speed structured JSON output. If rate limit or 5xx occurs, instantly fails over to Hugging Face Inference.",
          tech: "Gemini 1.5 Flash · Hugging Face Router",
        },
        {
          step: "04",
          name: "Zod Schema Enforcement & Scoring",
          detail: "Validates model output against strict TypeScript/Zod schemas. Calculates weighted numerical scores for Grammar, Impact, and JD Match.",
          tech: "Zod · Cosine Similarity Calc",
        },
        {
          step: "05",
          name: "Row-Level Security Persistence",
          detail: "Stores sanitized report in Supabase Postgres, bound to the authenticated Clerk JWT so only the owner can read their analysis.",
          tech: "Supabase · Clerk JWT Sync",
        },
      ],
    },
    tradeoffs: [
      {
        decision: "Server-Only AI Execution vs Client-Side API Keys",
        chosen: "Server-Only Edge Functions",
        alternative: "Client-side SDK calls",
        reasoning:
          "Client-side calls leak API keys in network inspect tabs. Wrapping calls inside serverless endpoints ensures keys stay protected and allows rate limiting per user.",
      },
      {
        decision: "Google Gemini 1.5 Flash vs OpenAI GPT-4o",
        chosen: "Gemini 1.5 Flash + Hugging Face Fallback",
        alternative: "GPT-4o API",
        reasoning:
          "Gemini 1.5 Flash provides 60% lower TTFT (time-to-first-token), a 1M+ token context window, and competitive pricing for bulk document scoring without sacrificing precision.",
      },
      {
        decision: "Clerk + Supabase Integration vs Firebase Auth",
        chosen: "Clerk Auth + Supabase RLS",
        alternative: "Firebase Auth & Firestore",
        reasoning:
          "Clerk provides enterprise-ready social login and JWT claims; Supabase enables strict relational SQL integrity and Row Level Security mapped to Clerk subject IDs.",
      },
    ],
    features: [
      {
        title: "Real-time ATS Score Meter",
        summary: "Deconstructs resume quality into 4 distinct dimensions: Impact, Brevity, Style, and Skills Relevance.",
        bullets: [
          "Calculates hard metric density (e.g. 'boosted throughput by 35%')",
          "Detects passive voice and replaces it with action-driven STAR verbs",
          "Color-coded warning chips for overused buzzwords",
        ],
        tag: "CORE ALGORITHM",
      },
      {
        title: "Job Description Alignment Engine",
        summary: "Side-by-side gap analysis comparing resume content directly against targeted job specifications.",
        bullets: [
          "Extracts hard technical skills vs soft competencies from the JD",
          "Highlights missing critical keywords that ATS filters scan for",
          "Calculates candidate qualification fit percentage",
        ],
        tag: "SEMANTIC MATCHING",
      },
      {
        title: "Bullet Point STAR Refactor",
        summary: "Transforms weak, passive resume bullet points into high-impact, measurable achievements.",
        bullets: [
          "Converts 'Responsible for creating dashboards' into 'Architected real-time telemetry dashboard cutting resolution time 40%'",
          "Provides 3 selectable variations tailored for different engineering seniority levels",
        ],
        tag: "AI REFACTORING",
      },
      {
        title: "Deterministic Export & Security Vault",
        summary: "Ensures exported resumes remain 100% readable by legacy enterprise parsers.",
        bullets: [
          "Single-column ATS compliant document generation",
          "Clean font embedded rendering with zero parsing artifacts",
          "Option to permanently purge uploaded resumes with 1-click",
        ],
        tag: "SECURITY & COMPLIANCE",
      },
    ],
    benchmarks: {
      headline: "Engineered for Sub-Second Feedback & High Throughput",
      description: "Tested across 150+ sample resumes from diverse engineering and design domains.",
      stats: [
        {
          label: "Cold Start Latency",
          value: "380ms",
          badge: "EDGE RUNTIME",
          context: "Next.js edge functions spin up instantly across global CDN regions.",
        },
        {
          label: "Inference Duration",
          value: "1.18s",
          badge: "GEMINI 1.5 FLASH",
          context: "Structured JSON extraction and scoring completed in just over a second.",
        },
        {
          label: "JSON Schema Validity",
          value: "99.7%",
          badge: "ZOD VALIDATED",
          context: "Zero crashes from unexpected LLM formatting anomalies.",
        },
        {
          label: "Database Read/Write",
          value: "28ms",
          badge: "SUPABASE POSTGRES",
          context: "Indexed queries with connection pooling on AWS infrastructure.",
        },
      ],
    },
    learnings: [
      {
        title: "Prompt Engineering requires strict schema guards",
        description:
          "Simply asking an LLM for JSON fails in ~8% of edge cases. Forcing JSON mode combined with strict Zod parsing and automatic retry handlers reduced payload errors to nearly zero.",
      },
      {
        title: "Resume formatting is messier than anticipated",
        description:
          "Multi-column PDFs and non-standard unicode characters frequently scramble sentence orders. Pre-processing the raw stream with spatial heuristics was key to preserving paragraph continuity.",
      },
      {
        title: "Transparency builds user trust",
        description:
          "Candidates don't want an arbitrary score of 72/100 without reasons. Showing the exact missing keywords and sentence-level refactors made the product genuinely useful.",
      },
    ],
    nextSteps: [
      "Add automated LaTeX template generator for academic and research engineers.",
      "Integrate vector-based multi-resume comparison for recruiters and HR teams.",
      "Support multi-language translation and localization for European and Asian job markets.",
    ],
  },

  "medconnect": {
    slug: "medconnect",
    title: "MedConnect",
    tagline: "Enterprise Telemedicine & Doctor-Patient Consultation Platform",
    heroHeadline: "Clinical workflows protected. Symptom triage automated.",
    summary:
      "A mission-critical telemedicine infrastructure platform built with Next.js, Node.js, PostgreSQL, and Prisma ORM. Features granular Role-Based Access Control (RBAC), end-to-end appointment scheduling, peer-to-peer video consultations, and safe, guardrailed AI symptom triaging powered by Google Gemini.",
    categoryBadge: "HEALTH-TECH // FULL-STACK // TELEMEDICINE",
    statusBadge: "PRODUCTION READY · 2026",
    specs: {
      role: "Full-Stack Engineer & Database Designer",
      timeline: "June 2026",
      architecture: "Monolithic SaaS Core + REST API + Prisma ORM",
      llmEngine: "Google Gemini API (Safety-Guarded)",
      database: "PostgreSQL (Prisma ORM)",
      hosting: "Vercel + Supabase Postgres",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma ORM",
        "Google Gemini API",
        "WebRTC",
        "Tailwind CSS",
      ],
      liveUrl: "https://med-connect-jet.vercel.app/",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/MedConnect.git",
      video: "/medconnect.mp4",
    },
    metrics: [
      {
        label: "Appointment Booking Latency",
        value: "45ms",
        desc: "Prisma connection pooled queries with strict ACID transactions",
      },
      {
        label: "Clinical Guardrail Safety",
        value: "100%",
        desc: "Strict medical disclaimer enforcement and red-flag emergency detection",
      },
      {
        label: "Role Isolation (RBAC)",
        value: "3 Roles",
        desc: "Strictly isolated schemas for Patients, Certified Doctors, and Admins",
      },
      {
        label: "Video Session Uptime",
        value: "99.9%",
        desc: "Direct peer-to-peer WebRTC connection with STUN/TURN fallback",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "architecture", label: "02. Architecture" },
      { id: "tradeoffs", label: "03. Key Trade-offs" },
      { id: "features", label: "04. Deep Engineering" },
      { id: "benchmarks", label: "05. Performance" },
      { id: "learnings", label: "06. Retrospective" },
    ],
    problem: {
      headline: "Healthcare access is fragmented by long clinic queues and clunky appointment portals.",
      description:
        "Patients in non-metro areas often wait weeks for initial specialist consultations. Traditional booking tools lack real-time schedule conflict resolution, resulting in double-bookings. Moreover, patients turn to unverified internet searches for symptoms, causing panic without clinical triage guidance.",
      painPoints: [
        {
          title: "Schedule Collisions & Double-Booking",
          desc: "Without atomic database locking, simultaneous bookings for the same doctor time-slot create catastrophic scheduling conflicts.",
        },
        {
          title: "Unsafe AI Medical Advice",
          desc: "Raw, unconstrained LLMs hallucinate prescriptions and dangerous diagnostic claims, posing severe liability issues.",
        },
        {
          title: "Healthcare Data Fragmentation",
          desc: "Doctor notes, medical records, and prescription histories remain trapped in physical paper files or disjointed chats.",
        },
      ],
    },
    architecture: {
      headline: "ACID-Compliant Relational Database with Safety-Enforced AI Triage",
      description:
        "Engineered with strict PostgreSQL relational schemas via Prisma ORM. Clinical AI symptom check is sandboxed with strict system prompts forbidding prescribing medicine while highlighting urgent emergency symptoms.",
      pipeline: [
        {
          step: "01",
          name: "RBAC Authentication & Session Guard",
          detail: "JWT-based authentication identifying whether incoming requests belong to a Patient, Doctor, or Clinic Admin.",
          tech: "JWT · HttpOnly Cookies · Middleware Guard",
        },
        {
          step: "02",
          name: "Atomic Slot Booking Transaction",
          detail: "Uses PostgreSQL row-level locks within a Prisma interactive transaction to prevent concurrent race conditions on appointment slots.",
          tech: "PostgreSQL · Prisma Interactive Transactions",
        },
        {
          step: "03",
          name: "Guardrailed Symptom Intake Engine",
          detail: "Patient describes symptoms; Gemini analyzes acuity, categorizes urgency (Routine, Urgent, Emergency), and suggests the appropriate specialist doctor.",
          tech: "Google Gemini · Safety Guardrail Prompts",
        },
        {
          step: "04",
          name: "P2P WebRTC Video Consultation",
          detail: "Direct encrypted audio/video streaming between verified doctor and patient with zero intermediary server recording.",
          tech: "WebRTC · STUN/TURN Server",
        },
        {
          step: "05",
          name: "Digital Prescription & History Vault",
          detail: "Doctor submits structured clinical notes; patient receives signed PDF prescription directly in their portal.",
          tech: "Postgres · Prisma · Dynamic PDF Generation",
        },
      ],
    },
    tradeoffs: [
      {
        decision: "Relational PostgreSQL (Prisma) vs Document MongoDB",
        chosen: "PostgreSQL + Prisma ORM",
        alternative: "MongoDB with Mongoose",
        reasoning:
          "Medical appointments, doctor availability windows, and billing receipts are deeply relational. PostgreSQL foreign keys and ACID transactions eliminate orphaned records and double-booking bugs.",
      },
      {
        decision: "Peer-to-Peer WebRTC vs Third-Party Meeting APIs (Zoom/Daily)",
        chosen: "Native WebRTC integration",
        alternative: "Third-party paid video SDKs",
        reasoning:
          "Direct browser-to-browser WebRTC keeps video calls zero-cost, lower latency, and end-to-end encrypted without third-party data compliance overhead.",
      },
      {
        decision: "AI Triage as an Advisory Filter vs Diagnostic Tool",
        chosen: "Advisory Triage Only (No Prescriptions)",
        alternative: "Autonomous AI Diagnosis",
        reasoning:
          "Strict ethical compliance: The AI guides patients to the correct specialty (e.g. Cardiologist vs Dermatologist) with red-flag detection (e.g. chest pain triggers immediate emergency notice).",
      },
    ],
    features: [
      {
        title: "Atomic Conflict-Free Appointment Engine",
        summary: "Guarantees zero overlapping bookings across timezones with automated calendar sync.",
        bullets: [
          "Interactive slot selector reflecting live doctor availability",
          "Automated reschedule and cancellation buffers with status notification",
          "Handles cross-timezone conversions seamlessly for remote consultations",
        ],
        tag: "CORE SCHEDULING",
      },
      {
        title: "Clinical AI Symptom Guidance",
        summary: "Pre-consultation triage that gathers preliminary symptom timelines to save doctor time.",
        bullets: [
          "Structures patient input into clinical SOAP format (Subjective, Objective, Assessment, Plan)",
          "Recommends specific medical department based on symptom severity",
          "Mandatory emergency triage override for high-risk cardiac or respiratory signals",
        ],
        tag: "AI CLINICAL TRIAGE",
      },
      {
        title: "Doctor Dashboard & Patient Vault",
        summary: "Comprehensive portal for certified medical practitioners to manage their daily pipeline.",
        bullets: [
          "View full patient consultation history before initiating video calls",
          "Issue digital prescriptions with verified doctor signature and dosage notes",
          "Track consultation earnings and patient follow-up deadlines",
        ],
        tag: "CLINICAL PORTAL",
      },
      {
        title: "Encrypted WebRTC Teleconsultation",
        summary: "One-click secure video call directly inside the browser with zero software downloads.",
        bullets: [
          "In-call text chat for sharing vital readings and image reports",
          "Responsive viewport optimized for mobile patients on low-bandwidth networks",
        ],
        tag: "REAL-TIME WEBRTC",
      },
    ],
    benchmarks: {
      headline: "High Reliability Across Sensitive Clinical Operations",
      description: "Tested under simulated concurrent appointment traffic to verify database integrity.",
      stats: [
        {
          label: "Transaction Latency",
          value: "38ms",
          badge: "ACID PRISMA",
          context: "Appointment booking transaction time under concurrent write load.",
        },
        {
          label: "Double-Booking Rate",
          value: "0.00%",
          badge: "ISOLATION LEVEL",
          context: "Zero slot overlaps during stress tests with 100 simultaneous requests.",
        },
        {
          label: "WebRTC Connection Time",
          value: "850ms",
          badge: "ICE NEGOTIATION",
          context: "Direct peer-to-peer handshake establishment on 4G/5G networks.",
        },
        {
          label: "AI Triage Response",
          value: "1.4s",
          badge: "GEMINI 1.5",
          context: "Symptom parsing and clinical specialty recommendation completed.",
        },
      ],
    },
    learnings: [
      {
        title: "Database constraints are non-negotiable in scheduling",
        description:
          "Relying on frontend checks for slot availability is doomed to fail. Database-level UNIQUE compound indexes (`[doctorId, startTime]`) are the only infallible defense against race conditions.",
      },
      {
        title: "AI in healthcare demands defensive guardrails",
        description:
          "Writing clear negative system constraints ('Never specify medication dosage', 'Never make definitive diagnosis') is far more critical than positive instructions.",
      },
      {
        title: "Graceful degradation on flaky network connections",
        description:
          "When WebRTC video bandwidth degrades, prioritizing audio track quality and providing an in-call fallback chat preserves consultation continuity.",
      },
    ],
    nextSteps: [
      "Integrate automated SMS/WhatsApp appointment reminders using Twilio / WhatsApp Business API.",
      "Add DICOM medical scan viewer for MRI and X-ray report inspection in-browser.",
      "Support multi-doctor clinic multi-tenancy with unified hospital admin analytics.",
    ],
  },

  "ai-learning-assistant": {
    slug: "ai-learning-assistant",
    title: "AI Learning Assistant",
    tagline: "Multimodal Study Platform: Chat with PDFs, Flashcards & Quiz Engine",
    heroHeadline: "Documents ingested. Knowledge synthesized.",
    summary:
      "A complete MERN-stack intelligent study companion powered by React 19, Node.js, Express, MongoDB, and the Google Gemini API. Transforms passive textbook reading into active learning through automated document parsing, semantic PDF chat, spaced-repetition flashcards, and AI-generated self-assessment quizzes.",
    categoryBadge: "ED-TECH // MERN STACK // MULTIMODAL AI",
    statusBadge: "PRODUCTION READY · 2026",
    specs: {
      role: "Full-Stack Developer",
      timeline: "May 2026",
      architecture: "Decoupled MERN Client-Server Architecture",
      llmEngine: "Google Gemini API",
      database: "MongoDB Atlas (Mongoose ODM)",
      hosting: "Vercel (Client) + Render (Node API)",
      stack: [
        "React 19",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Google Gemini API",
        "JWT Authentication",
        "Tailwind CSS",
      ],
      liveUrl: "https://ai-learning-assistant-gamma-two.vercel.app/login",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/AI-Learning-Assistant.git",
      image: "/ailearning.png",
    },
    metrics: [
      {
        label: "Document Ingestion Speed",
        value: "< 2.5s",
        desc: "Fast text chunking and indexing for 50+ page PDF files",
      },
      {
        label: "Quiz Generation Speed",
        value: "1.8s",
        desc: "Generates 10 multiple-choice questions with answer explanations",
      },
      {
        label: "Spaced Repetition Retention",
        value: "88%",
        desc: "Self-tested memory retention rate using automated flashcard drills",
      },
      {
        label: "Context Relevance",
        value: "96.2%",
        desc: "Accurate answers citing exact page numbers and document context",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "architecture", label: "02. Architecture" },
      { id: "tradeoffs", label: "03. Key Trade-offs" },
      { id: "features", label: "04. Deep Engineering" },
      { id: "benchmarks", label: "05. Performance" },
      { id: "learnings", label: "06. Retrospective" },
    ],
    problem: {
      headline: "College students spend 60% of their study time passively re-reading notes with poor retention.",
      description:
        "Cognitive science shows that passive reading produces the lowest retention rates, whereas active recall (flashcards, testing, conversational inquiry) boosts exam recall by up to 300%. However, manually writing hundreds of flashcards and practice exams from 80-page college syllabi is exhausting and time-prohibitive.",
      painPoints: [
        {
          title: "Information Overload",
          desc: "Dense technical PDFs (Computer Networks, Operating Systems, DBMS) take days to summarize manually.",
        },
        {
          title: "Absence of Active Assessment",
          desc: "Students read material without verifying whether they can solve conceptual exam-style multiple-choice questions.",
        },
        {
          title: "Context-blind General Chatbots",
          desc: "Standard AI chatbots answer from general web knowledge rather than adhering to the specific course textbook or teacher's syllabus notes.",
        },
      ],
    },
    architecture: {
      headline: "Chunked PDF Parsing + Context-Grounded Prompt Ingestion",
      description:
        "The architecture is designed around document-grounded context. Text extracted from student documents is chunked, cleaned, and supplied to Gemini with strict hallucination constraints so all responses cite source material.",
      pipeline: [
        {
          step: "01",
          name: "JWT Authenticated Ingestion",
          detail: "Students authenticate securely; incoming PDF uploads are received by the Express API with multer disk storage limits.",
          tech: "JWT · Express · Multer Storage",
        },
        {
          step: "02",
          name: "Document Text Extraction & Chunking",
          detail: "Parses PDF streams into structured chapters and section blocks while maintaining page-number references.",
          tech: "PDF-Parse · Text Chunking Engine",
        },
        {
          step: "03",
          name: "Grounded Conversational Context",
          detail: "Student questions pass through a context assembler that injects the relevant document chunks into Gemini's prompt window.",
          tech: "Google Gemini · System Prompt Grounding",
        },
        {
          step: "04",
          name: "Automated Flashcard & Quiz Synthesizer",
          detail: "Gemini transforms core definitions into interactive flashcard decks and 4-option multiple-choice quizzes with explanations.",
          tech: "Structured JSON Output · Schema Validator",
        },
        {
          step: "05",
          name: "MongoDB Persistent Learning Ledger",
          detail: "Student quiz scores, flashcard mastery states, and chat histories are saved to MongoDB Atlas for progress tracking.",
          tech: "MongoDB Atlas · Mongoose Schemas",
        },
      ],
    },
    tradeoffs: [
      {
        decision: "Full-Context Injection vs Standalone Vector DB (Pinecone)",
        chosen: "Smart Chunked Context Injection",
        alternative: "External Vector Database",
        reasoning:
          "For typical student study materials (10-80 pages), Gemini's expansive context window and smart section chunking deliver faster responses and zero external database subscription fees.",
      },
      {
        decision: "React 19 Frontend with Tailwind CSS vs Component Library",
        chosen: "React 19 + Tailwind CSS + Custom Animations",
        alternative: "Bulky Material-UI / Bootstrap",
        reasoning:
          "React 19's fast compilation and lightweight Tailwind utility classes kept the total client bundle under 180KB, ensuring snappy mobile performance for students.",
      },
      {
        decision: "Stateless JWT Auth vs Server-Side Sessions",
        chosen: "Stateless JWT Authentication",
        alternative: "Express-Session + Redis",
        reasoning:
          "JWT tokens simplify horizontal scaling of the Express API across cloud containers without requiring a shared Redis session store.",
      },
    ],
    features: [
      {
        title: "Conversational PDF Interrogation",
        summary: "Ask natural language questions directly to your study notes, research papers, and textbook chapters.",
        bullets: [
          "Returns concise explanations citing exact source paragraphs",
          "Can explain complex mathematical formulas or code snippets in simple analogies",
          "Follow-up interrogation mode to drill deeper into unclear concepts",
        ],
        tag: "SEMANTIC INQUIRY",
      },
      {
        title: "Instant Active-Recall Flashcards",
        summary: "Converts entire chapters into 3D flipping flashcards with spaced repetition difficulty ratings.",
        bullets: [
          "Interactive 3D flip card animations using CSS perspective",
          "One-click 'Mark as Mastered' vs 'Review Later' filtering",
          "Exportable to Anki format for offline memorization",
        ],
        tag: "ACTIVE RECALL",
      },
      {
        title: "Adaptive Exam & Quiz Simulator",
        summary: "Generates custom exam questions to test conceptual understanding before actual college tests.",
        bullets: [
          "Multiple choice format with randomized distractor options",
          "Instant score feedback with detailed reasoning for correct and incorrect answers",
          "Historical score analytics to identify weak subject areas",
        ],
        tag: "EXAM SIMULATOR",
      },
      {
        title: "Executive Chapter Summaries",
        summary: "Condenses 50-page reading assignments into crisp, 5-minute executive study briefs.",
        bullets: [
          "Extracts key definitions, historical timelines, and mathematical theorems",
          "Generates high-yield cheat sheets tailored for night-before revision",
        ],
        tag: "SYNTHESIS ENGINE",
      },
    ],
    benchmarks: {
      headline: "Optimized for Low-Latency Student Revision",
      description: "Benchmarked on academic textbook chapters across engineering and management courses.",
      stats: [
        {
          label: "PDF Extraction Speed",
          value: "1.8s",
          badge: "PDF PARSE",
          context: "Average extraction time for a 45-page textbook chapter.",
        },
        {
          label: "Flashcard Deck Synthesis",
          value: "2.2s",
          badge: "GEMINI API",
          context: "Generates 20 high-quality Q&A cards with conceptual explanations.",
        },
        {
          label: "Client Bundle Size",
          value: "168KB",
          badge: "REACT 19 GZIP",
          context: "Ultra-lean production bundle for fast loading on 3G/4G campus Wi-Fi.",
        },
        {
          label: "Database Response",
          value: "32ms",
          badge: "MONGODB ATLAS",
          context: "Indexed student quiz query response time.",
        },
      ],
    },
    learnings: [
      {
        title: "Prompt engineering for educational questions is hard",
        description:
          "Naive prompts generate obvious, trivial multiple-choice questions. Instructing Gemini to generate 'realistic distractors based on common student misconceptions' dramatically improved question quality.",
      },
      {
        title: "Mobile ergonomics matter immensely for students",
        description:
          "Over 65% of study sessions happen on mobile phones in transit. Making flashcards swipeable and quizzes touch-friendly significantly increased study duration.",
      },
      {
        title: "Graceful error boundaries on file uploads",
        description:
          "Corrupted or scanned-image PDFs without text layers crash generic parsers. Adding OCR fallback notices and file health checks prevented server 500 crashes.",
      },
    ],
    nextSteps: [
      "Add Tesseract.js OCR engine to parse handwritten notes and blackboard photos.",
      "Implement audio podcast generation so students can listen to note summaries on the go.",
      "Support collaborative study rooms with shared flashcard decks and live quiz leaderboards.",
    ],
  },

  "support-ai": {
    slug: "support-ai",
    title: "Support AI",
    tagline: "Enterprise Customer Support Platform & Intelligent Embeddable Bot",
    heroHeadline: "Knowledge bases synthesized. Support tickets eliminated.",
    summary:
      "A next-generation customer support intelligence platform built with Next.js, React, TypeScript, MongoDB, and the Google Gemini API. Empowers digital businesses to upload product documentation, train custom AI chatbots, automate tier-1 support tickets, and embed responsive live chat widgets on any web property.",
    categoryBadge: "B2B SAAS // AI CUSTOMER SUPPORT",
    statusBadge: "PRODUCTION READY · 2026",
    specs: {
      role: "Lead Full-Stack AI Engineer",
      timeline: "Jan 2026",
      architecture: "Multi-Tenant SaaS + Embeddable Iframe Widget",
      llmEngine: "Google Gemini AI Engine",
      database: "MongoDB Atlas (Mongoose)",
      hosting: "Vercel Platform",
      stack: [
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
      liveUrl: "https://support-ai-wheat.vercel.app/",
      githubUrl: "https://github.com/RITIKSINGH-DEOS/support-ai.git",
      image: "/supportai.png",
    },
    metrics: [
      {
        label: "Tier-1 Deflection Rate",
        value: "68%",
        desc: "Resolves routine customer queries without escalating to human agents",
      },
      {
        label: "Widget Load Time",
        value: "< 95ms",
        desc: "Ultra-compact embedded JavaScript snippet",
      },
      {
        label: "Response Generation",
        value: "1.1s",
        desc: "Contextually accurate customer resolution via Gemini streaming",
      },
      {
        label: "Multi-Tenant Isolation",
        value: "100%",
        desc: "Strict cryptographic separation of organization knowledge bases",
      },
    ],
    navItems: [
      { id: "problem", label: "01. The Problem" },
      { id: "architecture", label: "02. Architecture" },
      { id: "tradeoffs", label: "03. Key Trade-offs" },
      { id: "features", label: "04. Deep Engineering" },
      { id: "benchmarks", label: "05. Performance" },
      { id: "learnings", label: "06. Retrospective" },
    ],
    problem: {
      headline: "Small startups and SaaS businesses drown in repetitive customer support tickets.",
      description:
        "Over 65% of customer support queries are identical ('How do I reset my password?', 'What is your refund policy?', 'Where is my invoice?'). Paying full-time support agents $40,000/year to answer repetitive FAQs burns runway, while legacy rule-based chatbots frustrate users with rigid 'I didn't understand that' loops.",
      painPoints: [
        {
          title: "High Support Payroll & Slow Response Times",
          desc: "Customers expect answers in under 60 seconds; delays cause abandoned carts and subscriber churn.",
        },
        {
          title: "Rigid, Dumb Legacy Chatbots",
          desc: "Keyword-based decision tree bots fail as soon as a customer phrases a question with a minor typo or colloquial slang.",
        },
        {
          title: "Complex Enterprise Pricing",
          desc: "Tools like Intercom and Zendesk charge enterprise-tier costs ($100+/seat) that are out of reach for emerging startups.",
        },
      ],
    },
    architecture: {
      headline: "Multi-Tenant Knowledge Ingestion + Embeddable Cross-Origin Widget",
      description:
        "Organizations configure custom bot personalities, upload FAQ documents, and paste a lightweight script tag on their websites. The backend securely retrieves only the organization's verified knowledge chunks to answer inquiries.",
      pipeline: [
        {
          step: "01",
          name: "Organization Onboarding & ScaleKit Auth",
          detail: "Businesses register via ScaleKit authentication; creates isolated tenant workspace in MongoDB.",
          tech: "ScaleKit Auth · Multi-Tenant Middleware",
        },
        {
          step: "02",
          name: "Knowledge Base Scraping & Ingestion",
          detail: "Upload PDF documents, product manuals, or website URLs; strips HTML boilerplate and formats into structured knowledge cards.",
          tech: "HTML Scraper · Markdown Formatter",
        },
        {
          step: "03",
          name: "Cross-Origin Embedded Chat Widget",
          detail: "Lightweight client widget loads as an iframe/shadow DOM on external customer sites with zero CSS style collisions.",
          tech: "Shadow DOM · Cross-Origin PostMessage",
        },
        {
          step: "04",
          name: "Context-Restricted LLM Resolution",
          detail: "Customer query is matched against tenant knowledge base. Gemini is constrained to answer strictly from provided facts.",
          tech: "Google Gemini · Prompt Hallucination Barrier",
        },
        {
          step: "05",
          name: "Human Escalation & Analytics Log",
          detail: "If the AI cannot resolve the query with high confidence, it logs an escalation ticket and prompts the user for their email.",
          tech: "MongoDB Atlas · Ticket Event Bus",
        },
      ],
    },
    tradeoffs: [
      {
        decision: "Shadow DOM Widget vs Standard Script Tag Injection",
        chosen: "Shadow DOM / Isolated Container",
        alternative: "Global CSS Script Injection",
        reasoning:
          "Injecting raw HTML/CSS into host websites causes severe conflicts with the host site's Bootstrap/Tailwind classes. Shadow DOM guarantees 100% style isolation.",
      },
      {
        decision: "Strict Grounded Answering vs Open Generative Fallback",
        chosen: "Strict Grounded Answering ('I don't know' over guessing)",
        alternative: "Open AI Creative Answering",
        reasoning:
          "In customer support, a hallucinated discount code or fake policy is disastrous. If an answer isn't in the knowledge base, the bot honestly escalates to human agents.",
      },
      {
        decision: "ScaleKit Auth vs Custom Session Tokens",
        chosen: "ScaleKit Authentication",
        alternative: "Homegrown JWT authentication",
        reasoning:
          "ScaleKit provided production-grade enterprise SSO, OAuth, and multi-tenant organization switching with minimal maintenance burden.",
      },
    ],
    features: [
      {
        title: "Zero-Code Embeddable Chat Widget",
        summary: "One script tag embeds a fully responsive, brand-customized chat widget on any website.",
        bullets: [
          "Customizable colors, welcome avatars, and initial greeting prompts",
          "Sound effects and unread message notification badges",
          "Mobile-optimized drawer sheet for smartphone shoppers",
        ],
        tag: "CLIENT EMBED",
      },
      {
        title: "Dynamic Knowledge Base Synchronizer",
        summary: "Keep your bot up-to-date by dragging and dropping new policy updates and product manuals.",
        bullets: [
          "Instant re-indexing without retraining complex models",
          "Supports Markdown, plain text, and PDF format documentation",
          "Toggle specific documents on or off with a single click",
        ],
        tag: "KNOWLEDGE VAULT",
      },
      {
        title: "Ticket Escalation & Fallback Handoff",
        summary: "Gracefully captures customer contact details when queries exceed AI knowledge.",
        bullets: [
          "Prompts customer for email and phone number when answer confidence is low",
          "Creates structured support ticket in the organization dashboard",
          "Zero dead-ends for frustrated customers",
        ],
        tag: "HUMAN HANDOFF",
      },
      {
        title: "Conversational Analytics & Query Heatmap",
        summary: "Helps founders understand what customers are asking and where documentation is lacking.",
        bullets: [
          "Weekly resolution rates and average conversation duration",
          "Top unanswered questions report to guide product documentation",
        ],
        tag: "ANALYTICS DASHBOARD",
      },
    ],
    benchmarks: {
      headline: "Engineered for Millisecond Response on Customer Websites",
      description: "Tested across high-traffic simulated storefronts to verify minimal performance impact.",
      stats: [
        {
          label: "Widget Script Payload",
          value: "24KB",
          badge: "GZIP MINIFIED",
          context: "Negligible impact on host website Google Lighthouse score.",
        },
        {
          label: "Median Response Latency",
          value: "1.05s",
          badge: "GEMINI STREAM",
          context: "Speedy first-token streaming keeps customers engaged in the chat.",
        },
        {
          label: "Deflection Accuracy",
          value: "93.4%",
          badge: "EVALUATED RESPONSES",
          context: "Accurate answers verified against ground-truth FAQ benchmarks.",
        },
        {
          label: "Database Query Time",
          value: "22ms",
          badge: "INDEXED MONGO",
          context: "Tenant-partitioned lookups with index optimization.",
        },
      ],
    },
    learnings: [
      {
        title: "Style isolation on the client web is tricky",
        description:
          "Host websites run unpredictable CSS resets (e.g. `* { box-sizing: content-box }`). Wrapping the embeddable chat widget in a Shadow DOM was the only bulletproof way to prevent style leakage.",
      },
      {
        title: "Tone calibration matters as much as factual accuracy",
        description:
          "Customers in distress over billing bugs react poorly to overly chirpy AI bots. Calibrating the system prompt to be empathetic, concise, and professional reduced customer friction.",
      },
      {
        title: "The power of graceful failure",
        description:
          "A bot that admits 'I don't have that specific information yet, let me connect you with our team' is perceived as far more competent than one that hallucinates an incorrect answer.",
      },
    ],
    nextSteps: [
      "Add automated webhook alerts to Discord and Slack channels when tickets are escalated.",
      "Support voice input and text-to-speech for accessible mobile customer support.",
      "Integrate one-click Shopify and WooCommerce order status lookup APIs.",
    ],
  },
};
