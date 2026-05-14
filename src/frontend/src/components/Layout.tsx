import type { ReactNode } from "react";
import { ChatWidget } from "./ChatWidget";
import { CustomCursor } from "./CustomCursor";
import { Navbar } from "./Navbar";
import { ParticleBackground } from "./ParticleBackground";

interface LayoutProps {
  children: ReactNode;
  showParticles?: boolean;
}

export function Layout({ children, showParticles = true }: LayoutProps) {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "#0a0a0f", color: "#e8e8f0" }}
    >
      <CustomCursor />
      {showParticles && <ParticleBackground />}

      {/* Ambient gradient blobs */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full opacity-6"
          style={{
            background: "radial-gradient(circle, #06ffd4 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10" data-ocid="main_content">
        {children}
      </main>

      <ChatWidget />
      <footer
        className="relative z-10 py-8 text-center"
        style={{
          backgroundColor: "rgba(13,13,26,0.8)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          &copy; {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: "#00d4ff" }}
            data-ocid="footer.caffeine_link"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
