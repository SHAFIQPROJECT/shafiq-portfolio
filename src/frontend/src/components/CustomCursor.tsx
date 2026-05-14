import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Detect touch device — disable on mobile
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, [role='button'], input, textarea, select",
      );
      setIsHovering(!!isInteractive);
    };

    const loop = () => {
      outer.current.x += (mouse.current.x - outer.current.x) * 0.12;
      outer.current.y += (mouse.current.y - outer.current.y) * 0.12;
      if (outerRef.current) {
        const s = isHovering ? 50 : 30;
        outerRef.current.style.transform = `translate(${outer.current.x - s / 2}px, ${outer.current.y - s / 2}px)`;
        outerRef.current.style.width = `${s}px`;
        outerRef.current.style.height = `${s}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, isHovering]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border-2 transition-[width,height] duration-200"
        style={{
          borderColor: "#00d4ff",
          boxShadow: "0 0 10px rgba(0,212,255,0.5)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* Inner dot — snaps to mouse */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full w-1.5 h-1.5"
        style={{
          backgroundColor: "#00d4ff",
          boxShadow: "0 0 6px #00d4ff",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
