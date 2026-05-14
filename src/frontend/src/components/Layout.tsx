import type { ReactNode } from "react";
import { ChatWidget } from "./ChatWidget";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "#0f172a", color: "#f1f5f9" }}
    >
      {/* Subtle ambient gradient — very low opacity */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
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
          backgroundColor: "#0a0f1e",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          &copy; {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: "#60a5fa" }}
            data-ocid="footer.caffeine_link"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
