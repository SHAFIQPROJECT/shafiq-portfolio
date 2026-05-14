import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { RiAdminLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import { SiGithub } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certs", id: "certifications" },
  { label: "Experience", id: "experience" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateActive = useCallback(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    for (let i = ids.length - 1; i >= 0; i--) {
      const el = document.getElementById(ids[i]);
      if (el && el.getBoundingClientRect().top <= 100) {
        setActiveSection(ids[i]);
        return;
      }
    }
    setActiveSection("hero");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  return (
    <nav
      data-ocid="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: scrolled
          ? "rgba(10,10,15,0.85)"
          : "rgba(10,10,15,0.4)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            data-ocid="navbar.logo"
            onClick={() => scrollToSection("hero")}
            className="text-xl font-display font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            A.Shafiq
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid={`navbar.link.${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md"
                style={{
                  color:
                    activeSection === link.id
                      ? "#00d4ff"
                      : "rgba(255,255,255,0.65)",
                }}
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md"
                    style={{ backgroundColor: "rgba(0,212,255,0.08)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/shafiqahamed"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="navbar.github_link"
              className="p-2 rounded-md transition-colors duration-200 hidden sm:flex"
              style={{ color: "rgba(255,255,255,0.55)" }}
              aria-label="GitHub"
            >
              <SiGithub size={18} />
            </a>
            <a
              href="/admin"
              data-ocid="navbar.admin_link"
              className="p-2 rounded-md transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.35)" }}
              aria-label="Admin"
            >
              <RiAdminLine size={18} />
            </a>
            {/* Mobile hamburger */}
            <button
              type="button"
              data-ocid="navbar.mobile_menu_toggle"
              className="md:hidden p-2 rounded-md"
              style={{ color: "rgba(255,255,255,0.75)" }}
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-ocid="navbar.mobile_menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              backgroundColor: "rgba(10,10,15,0.97)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  data-ocid={`navbar.mobile_link.${link.id}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    scrollToSection(link.id);
                    setIsOpen(false);
                  }}
                  className="text-left px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                  style={{
                    color:
                      activeSection === link.id
                        ? "#00d4ff"
                        : "rgba(255,255,255,0.7)",
                    backgroundColor:
                      activeSection === link.id
                        ? "rgba(0,212,255,0.08)"
                        : "transparent",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
