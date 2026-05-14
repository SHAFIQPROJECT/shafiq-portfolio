import { Button } from "@/components/ui/button";
import { ArrowDown, Download, ExternalLink, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const TITLES = [
  "AI Engineer",
  "Data Science Student",
  "Full Stack Developer",
  "ML Enthusiast",
];

function TypingEffect() {
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(TITLES[0]);
      return;
    }
    const current = TITLES[titleIndex];
    const delay = isDeleting ? 80 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTitleIndex((i) => (i + 1) % TITLES.length);
        return;
      }
      setDisplayText(
        isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1),
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, shouldReduceMotion]);

  return (
    <span className="gradient-text">
      {displayText}
      <span
        className="inline-block w-0.5 h-8 ml-1 align-middle"
        style={{
          background: "#00d4ff",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{"@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }"}</style>
    </span>
  );
}

const SOCIALS = [
  {
    icon: SiGithub,
    href: "https://github.com/shafiq-ahamed",
    label: "GitHub",
    ocid: "hero.github_link",
    glowColor: "rgba(255,255,255,0.3)",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/shafiq-ahamed-86851137b",
    label: "LinkedIn",
    ocid: "hero.linkedin_link",
    glowColor: "rgba(0,119,181,0.5)",
  },
  {
    icon: Mail,
    href: "mailto:ahamedashafiq@gmail.com",
    label: "Email",
    ocid: "hero.email_link",
    glowColor: "rgba(6,255,212,0.4)",
  },
];

const ORBS = [
  {
    top: "15%",
    left: "5%",
    size: 300,
    color: "#7c3aed",
    delay: 0,
    duration: 8,
  },
  {
    top: "60%",
    right: "8%",
    size: 250,
    color: "#00d4ff",
    delay: 2,
    duration: 10,
  },
  {
    top: "35%",
    left: "50%",
    size: 180,
    color: "#06ffd4",
    delay: 1,
    duration: 7,
  },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* Floating neon orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {ORBS.map((orb) => (
          <motion.div
            key={`${orb.color}-${orb.duration}`}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: (orb as { left?: string }).left,
              right: (orb as { right?: string }).right,
              background: `radial-gradient(circle, ${orb.color}33 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }
            }
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ── Left: text content ── */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-6"
        >
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm font-mono tracking-[0.2em] uppercase"
            style={{ color: "#00d4ff" }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight"
          >
            <span className="gradient-text">A.Shafiq</span>
            <br />
            <span style={{ color: "#e8e8f0" }}>Ahamed</span>
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl sm:text-2xl font-display font-semibold h-10 flex items-center"
          >
            <TypingEffect />
          </motion.div>

          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base sm:text-lg max-w-md leading-relaxed"
            style={{ color: "rgba(148,163,184,0.9)" }}
          >
            AI &amp; Data Science Student at{" "}
            <span style={{ color: "#93c5fd" }}>
              Sri Krishna College of Engineering and Technology
            </span>
            , crafting intelligent systems and immersive digital experiences.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              data-ocid="hero.view_work_button"
              onClick={scrollToWork}
              className="px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-smooth hover:scale-105"
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
              }}
            >
              View My Work <ExternalLink size={16} />
            </button>

            <button
              type="button"
              data-ocid="hero.contact_button"
              onClick={scrollToContact}
              className="btn-neon px-6 py-3 rounded-lg font-semibold text-sm"
            >
              Get In Touch
            </button>

            <button
              type="button"
              data-ocid="hero.resume_button"
              onClick={() =>
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-smooth hover:scale-105"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(241,245,249,0.8)",
              }}
            >
              <Download size={16} /> Resume
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex items-center gap-4 pt-2"
          >
            {SOCIALS.map(({ icon: Icon, href, label, ocid }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                data-ocid={ocid}
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-smooth"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(241,245,249,0.65)",
                }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: profile image ── */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            {/* Subtle ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "transparent",
              }}
            />
            {/* subtle ambient glow */}
            <div
              className="absolute inset-[-8px] rounded-full"
              style={{
                background: "transparent",
              }}
            />
            {/* Profile image container */}
            <motion.div
              className="relative rounded-full overflow-hidden"
              style={{
                width: 280,
                height: 280,
                border: "2px solid rgba(255,255,255,0.1)",
                backgroundColor: "#1e293b",
              }}
              animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <img
                src="/assets/generated/profile-avatar.dim_400x400.jpg"
                alt="A.Shafiq Ahamed - AI Engineer"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Subtle corner accents */}
            <div
              className="absolute -top-4 -right-4 w-6 h-6"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.15)",
                borderRight: "1px solid rgba(255,255,255,0.15)",
              }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-6 h-6"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                borderLeft: "1px solid rgba(255,255,255,0.15)",
              }}
            />

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-card px-4 py-1.5 rounded-full text-xs font-mono"
              style={{ color: "#93c5fd", whiteSpace: "nowrap" }}
              animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              AI &amp; Data Science
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll to About section"
        data-ocid="hero.scroll_indicator"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ color: "rgba(148,163,184,0.5)" }}
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{
          duration: 1.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}
