import { NextRequest, NextResponse } from "next/server";
import { DATA } from "@/data/resume";

// In-memory rate limiting to protect the Gemini API quota from automated abuse
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_WINDOW = 12; // Max 12 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
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
  * Booking: Clients can click "Book a short call" on the website to schedule an appointment.
`;

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
        maxOutputTokens: 280, // Crisp, token-efficient responses
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
        ? "Maaf kijiye, main abhi response generate nahi kar paya. Aap Ritik se directly email ya appointment ke through connect kar sakte hain."
        : "I'm sorry, I couldn't generate a response right now. Feel free to connect with Ritik via email or book an appointment.");

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Chat API handler exception:", error);
    return NextResponse.json(
      { error: "Internal server error while processing chat message." },
      { status: 500 }
    );
  }
}
