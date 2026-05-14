import { useTrackVisit } from "@/hooks/useBackend";
import { AboutSection } from "@/sections/AboutSection";
import { CertificationsSection } from "@/sections/CertificationsSection";
import { ContactSection } from "@/sections/ContactSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { FooterSection } from "@/sections/FooterSection";
import { GitHubSection } from "@/sections/GitHubSection";
import { HeroSection } from "@/sections/HeroSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ResumeSection } from "@/sections/ResumeSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { useEffect, useRef } from "react";

// ── Home page ─────────────────────────────────────────────────────────────────
export function HomePage() {
  const trackVisit = useTrackVisit();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackVisit.mutate();
  }, [trackVisit]);

  return (
    <div data-ocid="home.page">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ExperienceSection />
      <GitHubSection />
      <ResumeSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
