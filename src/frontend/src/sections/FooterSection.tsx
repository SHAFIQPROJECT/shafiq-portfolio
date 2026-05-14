import { ChevronUp, Mail } from "lucide-react";
import { motion } from "motion/react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    icon: <SiGithub className="w-5 h-5" />,
    href: "https://github.com/shafiq-ahamed",
    label: "GitHub",
    color:
      "hover:text-foreground hover:shadow-[0_0_14px_rgba(255,255,255,0.3)]",
  },
  {
    icon: <FaLinkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/shafiq-ahamed-86851137b",
    label: "LinkedIn",
    color:
      "hover:text-[var(--neon-blue)] hover:shadow-[0_0_14px_rgba(0,212,255,0.5)]",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:ahamedashafiq@gmail.com",
    label: "Email",
    color:
      "hover:text-[var(--neon-cyan)] hover:shadow-[0_0_14px_rgba(6,255,212,0.5)]",
  },
];

export function FooterSection() {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[rgba(6,6,18,0.95)] border-t-0 mt-12">
      {/* Neon divider at top */}
      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold font-display gradient-text">
              A.Shafiq Ahamed
            </h3>
            <p className="text-sm text-muted-foreground">
              AI & Data Science Student
            </p>
            <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-xs">
              Building intelligent systems at the intersection of AI, data
              science, and software engineering.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Quick Links
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid={`footer.nav_link.${link.label.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-[var(--neon-blue)] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact / Social */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Connect
            </p>
            <div className="flex gap-4 mb-4">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-ocid={`footer.social.${s.label.toLowerCase()}`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-muted-foreground transition-all duration-200 rounded-lg p-2 ${s.color}`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              ahamedashafiq@gmail.com
            </p>
            <p className="text-xs text-muted-foreground mt-1">+91 7708904296</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {year} A.Shafiq Ahamed. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--neon-blue)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>

      {/* Scroll-to-top */}
      <motion.button
        type="button"
        data-ocid="footer.scroll_top_button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full glass-card neon-border flex items-center justify-center text-[var(--neon-cyan)] hover:neon-glow-cyan transition-smooth"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
