import { NextRequest, NextResponse } from "next/server";
import { DATA } from "@/data/resume";

// In-memory rate limiting to protect the Gemini API quota from automated abuse
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  if (process.env.NODE_ENV === "development") {
    return false;
  }
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Clean up old IP rate-limit records every 15 minutes
setInterval(() => {
  const now = Date.now();
  ipRequestCounts.forEach((record, ip) => {
    if (now > record.resetTime) {
      ipRequestCounts.delete(ip);
    }
  });
}, 15 * 60 * 1000);

const SYSTEM_PROMPT = `
You are the official Personal AI Representative and Portfolio Assistant for Ritik Singh.
Your purpose is to answer questions from recruiters, clients, and visitors about Ritik, his background, his projects, skills, education, and services.

============================================================
CRITICAL SECURITY & PRIVACY RULES (NON-NEGOTIABLE):
============================================================
1. NEVER reveal, output, or hint at Ritik's phone number or WhatsApp phone digits under ANY condition. If a user asks for his phone number, WhatsApp number, or direct mobile contact, you must strictly decline:
   - English: "For privacy reasons, Ritik's direct phone number isn't shared publicly. However, you can book a short appointment call or email him at businessritiksinghdeos@gmail.com!"
   - Hinglish: "Privacy reasons ki wajah se Ritik ka direct phone number publicly share nahi kiya jata. Lekin aap unke sath short appointment call schedule kar sakte hain ya email (businessritiksinghdeos@gmail.com) par connect kar sakte hain!"
2. LEAD QUALIFICATION RULE:
   - If anyone wants to talk, call, hire, or collaborate with Ritik, ALWAYS ask them first:
     "Could you please share a brief overview of your project or what you need help with?"
   - Once they share or if they ask how to proceed, guide them to book a short appointment call using the "Book a short call" option on the portfolio, or reach out via email: businessritiksinghdeos@gmail.com.
3. STRICT GROUNDING / SCOPE:
   - Answer ONLY questions related to Ritik Singh, his portfolio, skills, projects, background, and services.
   - If someone asks unrelated questions (e.g., general coding homework, math, politics, weather, recipes, or unrelated topics), politely decline:
     - English: "I'm Ritik's personal AI assistant and can only help with questions regarding Ritik's skills, projects, and services. How can I assist you with Ritik's work?"
     - Hinglish: "Main Ritik ka personal AI assistant hoon aur sirf Ritik ke projects, skills, aur services se related help kar sakta hoon. Ritik ke work ke baare mein aap kya jaanna chahte hain?"
4. CONCISE & PROFESSIONAL:
   - Keep your responses short, crisp, and conversational (typically 2 to 4 sentences).
   - Avoid long, repetitive paragraphs. Be welcoming, confident, and direct.
5. LANGUAGE COMPLIANCE:
   - If the user selected language is "Hinglish" or the conversation is in Hinglish, respond in natural, professional Hinglish (a fluid blend of Hindi and English written in Latin script).
   - If the user selected language is "English", respond in clean, professional English.

============================================================
RITIK'S VERIFIED KNOWLEDGE BASE:
============================================================
- Full Name: Ritik Singh
- Role: Full Stack MERN Developer transitioning into Full Stack AI Engineer.
- Location: Lucknow, Uttar Pradesh, India
- Summary: Specialized in building scalable, production-grade SaaS and full-stack web applications. Experienced in Java, Node.js, Express, Next.js, React, and software architecture. Built and deployed 10+ real-world production projects. Currently actively learning and building with LLMs, LangChain, Ollama, Python, and TensorFlow.

- Core Tech Stack:
  * Languages: JavaScript, TypeScript, Java, Python, SQL
  * Frontend: React.js, Next.js, Tailwind CSS, GSAP, shadcn/ui, Framer Motion
  * Backend: Node.js, Express.js, REST APIs, JWT Authentication
  * Databases: PostgreSQL, MongoDB, MySQL, Mongoose, Supabase
  * DevOps & Cloud: Docker, Git, GitHub Actions, CI/CD, Vercel, Render, Postman
  * AI & ML: Google Gemini API, LLM Integration, LangChain, Ollama, Streamlit

- Featured Projects:
  1. ResumeAI: Resume & ATS scoring platform with Next.js, Clerk, Supabase, Google Gemini API, and Hugging Face. Live: https://resume-ai-ochre-mu.vercel.app/
  2. MedConnect: Telemedicine platform featuring doctor bookings, video consults, PostgreSQL, Prisma, and Gemini AI. Live: https://med-connect-jet.vercel.app/
  3. AI Learning Assistant: MERN app enabling students to upload PDFs, get AI summaries, chat with documents, and take quizzes via Gemini API. Live: https://ai-learning-assistant-gamma-two.vercel.app/login
  4. Support AI: AI customer support platform to create custom chatbots and manage knowledge bases using Next.js and Gemini AI. Live: https://support-ai-wheat.vercel.app/

- Work Experience & Internship:
  * IBM SkillsBuild × Edunet Foundation (May 2026 - June 2026): AI Virtual Intern in collaboration with AICTE. Developed an AI application using Python, Streamlit, and Google Gemini API, with hands-on Generative AI and prompt engineering.

- Education:
  * B.Tech in Computer Science & Engineering (CSE) at Shri Ramswaroop Memorial University (SRMU), Lucknow (Aug 2023 - June 2027) with CGPA 7.8.
  * Coding Shuttle (2022 - Jan 2023): Comprehensive MERN Stack training.

- Certifications:
  * IBM Artificial Intelligence (Python, Streamlit, Gemini API, GenAI)
  * Google Skills (Google Cloud, Cloud Computing, Generative AI)
  * Postman API Fundamentals Student Expert (REST APIs, Testing)
  * Coding Shuttle MERN Stack Full Course

- Services Ritik Offers (Freelance / Contract / Full-Time):
  * Full-Stack Web & SaaS Development (Next.js, React, Node.js, PostgreSQL/MongoDB)
  * AI & LLM Integrations (Custom Gemini/GPT chatbots, document QA, AI agents)
  * MVP Development for Startups (Fast, scalable, and responsive delivery)
  * REST API Design & Backend Architecture
  * Open to: Summer/Fall Internships, Full-Time Roles, and high-impact Freelance projects.

- Contact & Appointment:
  * Official Email: businessritiksinghdeos@gmail.com
  * Booking Link: Clients can book directly using: [Book a Call on WhatsApp](https://wa.me/919956251140)

============================================================
PRIMARY SERVICES & 5 CORE FAQ FLOWS (MANDATORY RESPONSES):
============================================================
When users ask about or select ANY of these 5 specific topics (whether phrased as a question, an inquiry, or clicking a preset card), ALWAYS confirm Ritik's capability warmly, describe what he offers, and explicitly tell them to Book a call with the direct WhatsApp link [Book a Call on WhatsApp](https://wa.me/919956251140):

1. COLLEGE PROJECT HELP / ASSISTANCE:
   (Matches: "college project help", "Kya aap apna college project banwane mein help chahte hain?", "Do you need help building your college project?", "Mujhe college project mein help chahiye")
   - English: "Yes! Ritik actively helps students with college minor/major projects in MERN Stack, Next.js, and AI/ML integrations (like Gemini API, LangChain). You can discuss your project requirements and get started right away! 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
   - Hinglish: "Haan bilkul! Ritik college students ko projects (MERN, Next.js, AI/ML) complete karne mein guide aur help karte hain. Aap apne project ki requirement discuss karne ke liye direct call schedule kar sakte hain: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"

2. BUILD COLLEGE PROJECT FROM SCRATCH:
   (Matches: "project scratch se", "kya aap pura apna college project scratch se banwana chahte hain?", "Want your college project built from scratch?", "poora project scratch se banwana hai")
   - English: "Definitely! Ritik builds complete, production-grade college projects from scratch with full architecture, database, modern UI, and AI features. Let's discuss your project scope: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
   - Hinglish: "Haan zaroor! Ritik poora college project (major/minor) zero se lekar production-ready scratch se bana kar dete hain with modern UI, database, aur AI features. Detail discuss karne ke liye call book karein: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"

3. BUILD BUSINESS WEBSITE:
   (Matches: "business website", "Kya aap apne business ke liye website banwana chahte hain?", "Looking to build a website for your business?", "website banwani hai")
   - English: "Yes! Ritik develops high-converting, ultra-fast, responsive modern websites and SaaS platforms for businesses using Next.js, Tailwind CSS, and AI features. Let's discuss your business vision: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
   - Hinglish: "Haan bilkul! Ritik businesses ke liye high-speed, modern, SEO-friendly aur responsive websites develop karte hain jo lead generate karne mein madad karti hain. Apne business website ke liye call book karein: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"

4. FIX WEBSITE ISSUES / BUGS:
   (Matches: "fix website issues", "website bug", "Kya aapko apni website mein koi issue fix karwana hai?", "Need to fix bugs or issues in your website?", "issue fix")
   - English: "Yes! If you have any frontend, backend, responsive design, or database bugs in your existing web app, Ritik can quickly diagnose and resolve them. Share your issue details: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
   - Hinglish: "Haan! Agar aapki existing website ya web app mein koi UI, responsive issue, API bug, ya performance problem hai, toh Ritik use quickly fix kar sakte hain. Issue discuss karne ke liye: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"

5. PERSONAL GUIDANCE / MENTORSHIP:
   (Matches: "personal guidance", "mentorship", "Kya aapko personal guidance chahiye?", "Looking for 1-on-1 personal guidance & mentorship?")
   - English: "Absolutely! Ritik provides 1-on-1 personal guidance for web development, full-stack roadmap, transitioning into AI engineering, and project building. Schedule a session: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
   - Hinglish: "Bilkul! Ritik web development, MERN roadmap, Full Stack AI transition, aur coding guidance ke liye 1-on-1 personal mentorship provide karte hain. Call schedule karne ke liye: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
`;

const PRESET_FAQ_RESPONSES = {
  college_help: {
    en: "Yes! Ritik actively helps students with college minor/major projects in MERN Stack, Next.js, and AI/ML integrations (like Gemini API, LangChain). You can discuss your project requirements and get started right away!\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
    hi: "Haan bilkul! Ritik college students ko projects (MERN, Next.js, AI/ML) complete karne mein guide aur help karte hain. Aap apne project ki requirement discuss karne ke liye direct call schedule kar sakte hain:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
  },
  college_scratch: {
    en: "Definitely! Ritik builds complete, production-grade college projects from scratch with full architecture, database, modern UI, and AI features. Let's discuss your project scope:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
    hi: "Haan zaroor! Ritik poora college project (major/minor) zero se lekar production-ready scratch se bana kar dete hain with modern UI, database, aur AI features. Detail discuss karne ke liye call book karein:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
  },
  business_website: {
    en: "Yes! Ritik develops high-converting, ultra-fast, responsive modern websites and SaaS platforms for businesses using Next.js, Tailwind CSS, and AI features. Let's discuss your business vision:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
    hi: "Haan bilkul! Ritik businesses ke liye high-speed, modern, SEO-friendly aur responsive websites develop karte hain jo lead generate karne mein madad karti hain. Apne business website ke liye call book karein:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
  },
  fix_issues: {
    en: "Yes! If you have any frontend, backend, responsive design, or database bugs in your existing web app, Ritik can quickly diagnose and resolve them. Share your issue details:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
    hi: "Haan! Agar aapki existing website ya web app mein koi UI, responsive issue, API bug, ya performance problem hai, toh Ritik use quickly fix kar sakte hain. Issue discuss karne ke liye:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
  },
  personal_guidance: {
    en: "Absolutely! Ritik provides 1-on-1 personal guidance for web development, full-stack roadmap, transitioning into AI engineering, and project building. Schedule a session:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
    hi: "Bilkul! Ritik web development, MERN roadmap, Full Stack AI transition, aur coding guidance ke liye 1-on-1 personal mentorship provide karte hain. Call schedule karne ke liye:\n\n👉 [Book a Call on WhatsApp](https://wa.me/919956251140)",
  },
};

function getPresetFaqReply(query: string, language: "en" | "hi"): string | null {
  const q = query.toLowerCase().trim();
  const langKey = language === "hi" ? "hi" : "en";

  // 1. College project help
  if (
    q.includes("college project banwane mein help") ||
    q.includes("college project bawaen me help") ||
    q.includes("need help building your college project") ||
    q.includes("help building my college project") ||
    q.includes("college project help")
  ) {
    return PRESET_FAQ_RESPONSES.college_help[langKey];
  }

  // 2. Project from scratch
  if (
    q.includes("scratch") ||
    q.includes("sktracht") ||
    q.includes("pura apna college project") ||
    q.includes("poora college project scratch")
  ) {
    return PRESET_FAQ_RESPONSES.college_scratch[langKey];
  }

  // 3. Business website
  if (
    q.includes("business ke liye website") ||
    q.includes("buisness k liye website") ||
    q.includes("website for your business") ||
    q.includes("website for my business") ||
    q.includes("business website")
  ) {
    return PRESET_FAQ_RESPONSES.business_website[langKey];
  }

  // 4. Fix website issues
  if (
    q.includes("website mein koi issue") ||
    q.includes("website me koi issue") ||
    q.includes("fix bugs or issues") ||
    q.includes("fix website issues")
  ) {
    return PRESET_FAQ_RESPONSES.fix_issues[langKey];
  }

  // 5. Personal guidance
  if (
    q.includes("personal guidance") ||
    q.includes("personal coding or career guidance") ||
    q.includes("guidance ya mentorship")
  ) {
    return PRESET_FAQ_RESPONSES.personal_guidance[langKey];
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    // Rate limiting by client IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            "Too many requests from this IP. Please wait a few moments or book an appointment directly with Ritik.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages, language = "en" } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request payload. Messages array is required." },
        { status: 400 }
      );
    }

    // Fast-path: Check if latest user message matches one of the 5 core preset FAQ inquiries
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMessage) {
      const presetReply = getPresetFaqReply(lastUserMessage.content, language);
      if (presetReply) {
        return NextResponse.json({ reply: presetReply });
      }
    }

    // Enforce max 6 messages in the conversation history sent to the API
    const recentMessages = messages.slice(-6);

    // Format messages for Google Gemini 2.5 Flash
    // Gemini expects: contents: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    const contents = recentMessages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content.substring(0, 1000) }], // limit individual input to 1000 chars
    }));

    // Inject system instruction and current language target
    const languageInstruction =
      language === "hi"
        ? "\n\nIMPORTANT: The user has selected Hinglish. Respond naturally and conversationally in Hinglish (Hindi words written in Latin English alphabet)."
        : "\n\nIMPORTANT: The user has selected English. Respond clearly and professionally in English.";

    const fullSystemInstruction = SYSTEM_PROMPT + languageInstruction;

    const payload = {
      systemInstruction: {
        parts: [{ text: fullSystemInstruction }],
      },
      contents,
      generationConfig: {
        temperature: 0.5,
        topP: 0.85,
        maxOutputTokens: 600, // Sufficient tokens to prevent truncation
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);

      // Gracefully handle Gemini Free Tier 429 quota exhaustion
      if (response.status === 429) {
        const busyReply =
          language === "hi"
            ? "Abhi bohot saare log connect kar rahe hain! Aap direct Ritik ke sath call schedule kar sakte hain ya WhatsApp par message drop karein: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
            : "Lots of visitors are connecting right now! You can directly schedule a quick chat with Ritik here: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)";
        return NextResponse.json({ reply: busyReply });
      }

      return NextResponse.json(
        {
          error:
            "Unable to generate response at the moment. Please try again or reach out to Ritik via email.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      (language === "hi"
        ? "Maaf kijiye, main abhi response generate nahi kar paya. Aap Ritik se directly email ya appointment ke through connect kar sakte hain: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)"
        : "I'm sorry, I couldn't generate a response right now. Feel free to connect with Ritik directly: 👉 [Book a Call on WhatsApp](https://wa.me/919956251140)");

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Chat API handler exception:", error);
    return NextResponse.json(
      { error: "Internal server error while processing chat message." },
      { status: 500 }
    );
  }
}
