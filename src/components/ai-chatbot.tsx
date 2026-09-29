"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Calendar,
  Mail,
  Languages,
  ArrowRight,
} from "lucide-react";
import Markdown from "react-markdown";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const MAX_SESSION_MESSAGES = 5;

const SUGGESTIONS = {
  en: [
    { label: "Core Tech Stack", text: "What is Ritik's core tech stack and skills?" },
    { label: "Top AI Projects", text: "Tell me about Ritik's best AI projects." },
    { label: "Services Offered", text: "What freelance/contract services does Ritik provide?" },
    { label: "Schedule a Call", text: "How can I schedule an appointment with Ritik?" },
  ],
  hi: [
    { label: "Core Skills", text: "Ritik ko kaun-kaun si technical skills aati hain?" },
    { label: "Top Projects", text: "Ritik ke top AI projects ke baare mein batao." },
    { label: "Services", text: "Ritik kaun-kaun si services provide kar sakta hai?" },
    { label: "Call Schedule", text: "Ritik ke sath appointment ya call kaise schedule karein?" },
  ],
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi" | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for custom open event triggered by Bottom Navbar or any trigger
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-ai-chat", handleOpen);
    window.addEventListener("close-ai-chat", handleClose);

    // Load saved session state from sessionStorage
    try {
      const savedLang = sessionStorage.getItem("rs_chat_lang") as "en" | "hi" | null;
      const savedCount = parseInt(sessionStorage.getItem("rs_chat_count") || "0", 10);
      const savedHistory = sessionStorage.getItem("rs_chat_history");

      if (savedLang) setLanguage(savedLang);
      if (savedCount) setMessageCount(savedCount);
      if (savedHistory) setMessages(JSON.parse(savedHistory));
    } catch {
      // sessionStorage not available or quota error
    }

    return () => {
      window.removeEventListener("open-ai-chat", handleOpen);
      window.removeEventListener("close-ai-chat", handleClose);
    };
  }, []);

  // Save session state on change
  useEffect(() => {
    try {
      if (language) sessionStorage.setItem("rs_chat_lang", language);
      sessionStorage.setItem("rs_chat_count", messageCount.toString());
      if (messages.length > 0) {
        sessionStorage.setItem("rs_chat_history", JSON.stringify(messages));
      }
    } catch {
      // ignore storage errors
    }
  }, [language, messageCount, messages]);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when chat opens or language selected
  useEffect(() => {
    if (isOpen && language && messageCount < MAX_SESSION_MESSAGES) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, language, messageCount]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const selectLanguage = (selectedLang: "en" | "hi") => {
    setLanguage(selectedLang);
    const initialGreeting: ChatMessage = {
      id: "greeting",
      role: "assistant",
      content:
        selectedLang === "hi"
          ? "Namaste! 🙏 Main Ritik Singh ka official AI Assistant hoon. Ritik ke skills, projects, IBM internship ya appointment schedule karne ke baare mein aap mujhse kuch bhi pooch sakte hain!"
          : "Hi there! 👋 I'm Ritik Singh's official AI Assistant. Feel free to ask me anything about Ritik's skills, full-stack & AI projects, or how to schedule a short call!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    if (messages.length === 0) {
      setMessages([initialGreeting]);
    }
  };

  const handleReset = () => {
    setLanguage(null);
    setMessages([]);
    setMessageCount(0);
    try {
      sessionStorage.removeItem("rs_chat_lang");
      sessionStorage.removeItem("rs_chat_history");
      sessionStorage.removeItem("rs_chat_count");
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading || messageCount >= MAX_SESSION_MESSAGES) return;

    setInput("");
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language: language || "en",
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          data.reply ||
          (language === "hi"
            ? "Maaf kijiye, main abhi response generate nahi kar paya."
            : "I'm sorry, I couldn't generate a response right now."),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch {
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          language === "hi"
            ? "Connection issue ki wajah se response nahi mil paya. Aap Ritik se directly email (businessritiksinghdeos@gmail.com) par connect kar sakte hain!"
            : "Couldn't reach the server right now. You can directly connect with Ritik via email at businessritiksinghdeos@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-center sm:justify-end p-2 sm:p-6 pointer-events-none">
          {/* Subtle backdrop click to close on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 sm:bg-transparent pointer-events-auto backdrop-blur-[2px] sm:backdrop-blur-none"
          />

          {/* Floating Glassmorphic Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full max-w-[420px] sm:w-[390px] h-[580px] max-h-[85vh]",
              "flex flex-col rounded-3xl overflow-hidden pointer-events-auto",
              "bg-background/95 dark:bg-zinc-950/95 backdrop-blur-xl",
              "border border-red-500/30 dark:border-blue-500/35",
              "shadow-[0_12px_45px_-5px_rgba(220,38,38,0.25),0_0_30px_rgba(37,99,235,0.2)]",
              "transition-all duration-200 select-none"
            )}
          >
            {/* Top Header */}
            <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-black/[0.08] dark:border-white/[0.08] bg-muted/40 dark:bg-zinc-900/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 rounded-full overflow-hidden border border-red-500/40 dark:border-blue-500/40 bg-black">
                  <Image
                    src={DATA.avatarUrl}
                    alt={DATA.name}
                    width={32}
                    height={32}
                    className="size-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 ring-1 ring-background animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-xs sm:text-sm text-foreground leading-none">
                      Ritik&apos;s AI
                    </h3>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-red-500/10 text-red-600 dark:bg-blue-500/15 dark:text-blue-400 border border-red-500/20 dark:border-blue-500/25">
                      <Sparkles className="size-2.5" />
                      Gemini 2.5
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                    {language === "hi" ? "Personal Assistant · Online" : "Personal Assistant · Online"}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                {language && (
                  <button
                    type="button"
                    onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-foreground/80 hover:bg-muted dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title={language === "en" ? "Switch to Hinglish" : "Switch to English"}
                  >
                    <Languages className="size-3 text-red-500 dark:text-blue-400" />
                    <span>{language === "en" ? "EN" : "HI"}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="size-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* SCREEN 1: LANGUAGE SELECTION MODAL */}
            {!language ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="size-16 rounded-2xl bg-gradient-to-tr from-red-500/15 via-transparent to-blue-500/15 border border-red-500/30 dark:border-blue-500/35 flex items-center justify-center mb-4 shadow-inner">
                  <Sparkles className="size-8 text-red-500 dark:text-blue-400 animate-pulse" />
                </div>

                <h4 className="text-base sm:text-lg font-serif font-light tracking-tight text-foreground">
                  Welcome to Ritik&apos;s AI
                </h4>
                <p className="text-xs text-muted-foreground mt-1 mb-6 max-w-[260px]">
                  Select your preferred conversation language:
                </p>

                <div className="w-full space-y-2.5">
                  <button
                    type="button"
                    onClick={() => selectLanguage("en")}
                    className="group w-full flex items-center justify-between p-3.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-muted/30 dark:bg-zinc-900/40 hover:bg-muted/80 dark:hover:bg-zinc-800/80 hover:border-red-500/40 dark:hover:border-blue-500/40 transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🇬🇧</span>
                      <div>
                        <div className="text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-red-500 dark:group-hover:text-blue-400 transition-colors">
                          English
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Clean, formal &amp; professional
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button
                    type="button"
                    onClick={() => selectLanguage("hi")}
                    className="group w-full flex items-center justify-between p-3.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-muted/30 dark:bg-zinc-900/40 hover:bg-muted/80 dark:hover:bg-zinc-800/80 hover:border-red-500/40 dark:hover:border-blue-500/40 transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🇮🇳</span>
                      <div>
                        <div className="text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-red-500 dark:group-hover:text-blue-400 transition-colors">
                          Hinglish
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Conversational &amp; natural Hindi-English
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>

                <div className="mt-6 text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>Privacy protected · 5 messages per session</span>
                </div>
              </div>
            ) : (
              /* SCREEN 2: ACTIVE CHAT CONVERSATION */
              <>
                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 select-text text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed shadow-sm",
                          msg.role === "user"
                            ? "bg-foreground text-background font-medium rounded-br-xs"
                            : "bg-muted/80 dark:bg-zinc-900/80 text-foreground border border-black/[0.05] dark:border-white/[0.06] rounded-bl-xs"
                        )}
                      >
                        <Markdown
                          components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            strong: ({ children }) => (
                              <strong className="font-semibold text-foreground dark:text-zinc-100">
                                {children}
                              </strong>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 text-red-500 dark:text-blue-400 hover:opacity-80"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {msg.content}
                        </Markdown>
                      </div>
                      <span className="text-[9px] text-muted-foreground/60 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-muted/70 dark:bg-zinc-900/70 border border-black/[0.05] dark:border-white/[0.06] w-fit">
                      <span className="size-1.5 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]" />
                      <span className="size-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="size-1.5 rounded-full bg-blue-500 animate-bounce" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Chips (Shown early in conversation) */}
                {messages.length <= 2 && !isLoading && messageCount < MAX_SESSION_MESSAGES && (
                  <div className="px-3 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                    {SUGGESTIONS[language].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => handleSendMessage(chip.text)}
                        className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10.5px] font-medium bg-muted/60 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] text-foreground/80 hover:bg-foreground hover:text-background hover:border-transparent transition-all cursor-pointer select-none shrink-0"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Bottom Input Area or Limit Reached Banner */}
                <div className="p-3 border-t border-black/[0.08] dark:border-white/[0.08] bg-muted/30 dark:bg-zinc-950/60 shrink-0">
                  {messageCount < MAX_SESSION_MESSAGES ? (
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendMessage();
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={
                            language === "hi"
                              ? "Ritik ke baare mein kuch bhi poochein..."
                              : "Ask anything about Ritik..."
                          }
                          disabled={isLoading}
                          maxLength={300}
                          className="flex-1 bg-background dark:bg-zinc-900 text-xs px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.1] focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-blue-500 transition-all text-foreground placeholder:text-muted-foreground/60"
                        />
                        <button
                          type="submit"
                          disabled={!input.trim() || isLoading}
                          className="size-9 rounded-xl bg-foreground text-background flex items-center justify-center hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
                          title="Send message"
                          aria-label="Send message"
                        >
                          <Send className="size-3.5" />
                        </button>
                      </form>

                      {/* Remaining Messages Counter */}
                      <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground/70">
                        <span>
                          {language === "hi" ? "Session limit" : "Session limit"}:{" "}
                          <span className="font-semibold text-foreground">
                            {MAX_SESSION_MESSAGES - messageCount}
                          </span>{" "}
                          left
                        </span>
                        <span className="text-[9px]">Strict privacy · No phone leak</span>
                      </div>
                    </div>
                  ) : (
                    /* Session Limit Reached State: CTA to Book a Call */
                    <div className="text-center py-1.5 space-y-2">
                      <p className="text-[11px] font-medium text-foreground">
                        {language === "hi"
                          ? "Aapki 5-message session limit complete ho gayi hai!"
                          : "You've reached the 5-message session limit!"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {language === "hi"
                          ? "Project ya services discuss karne ke liye short call book karein:"
                          : "To discuss your project or requirement, book a short appointment call:"}
                      </p>

                      <div className="flex items-center justify-center gap-2 pt-1">
                        <a
                          href={DATA.contact.social.WhatsApp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-xs shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <Calendar className="size-3" />
                          <span>Book a short call</span>
                        </a>

                        <a
                          href={`mailto:${DATA.contact.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.12] dark:border-white/[0.12] bg-background hover:bg-muted text-foreground font-medium text-xs transition-all cursor-pointer"
                        >
                          <Mail className="size-3" />
                          <span>Email Ritik</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
