import { Briefcase, Code2, GraduationCap, Target } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StatConfig {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
  ocid: string;
}

const STATS: StatConfig[] = [
  {
    value: 10,
    suffix: "+",
    label: "Projects Completed",
    icon: Code2,
    color: "#00d4ff",
    ocid: "about.stat.1",
  },
  {
    value: 5,
    suffix: "+",
    label: "Technologies Mastered",
    icon: Code2,
    color: "#7c3aed",
    ocid: "about.stat.2",
  },
  {
    value: 2,
    suffix: "+",
    label: "Internships",
    icon: Briefcase,
    color: "#06ffd4",
    ocid: "about.stat.3",
  },
  {
    value: 1,
    suffix: "+",
    label: "Years Experience",
    icon: Target,
    color: "#a78bfa",
    ocid: "about.stat.4",
  },
];

function AnimatedCounter({
  target,
  suffix,
  active,
}: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }
    let start = 0;
    const duration = 1600;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = Math.floor(duration / (target / step));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [active, target, shouldReduceMotion]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      data-ocid="about.section"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          data-ocid="about.header"
        >
          <p
            className="text-xs font-mono tracking-[0.25em] uppercase mb-3"
            style={{ color: "#00d4ff" }}
          >
            Get to know me
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          {/* Neon underline */}
          <div className="flex justify-center">
            <div
              className="h-0.5 w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)",
              }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: photo */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col items-center gap-6"
            data-ocid="about.photo_panel"
          >
            <div className="relative">
              {/* Glowing border photo frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: 300,
                  height: 340,
                  background:
                    "linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, #7c3aed 0%, #00d4ff 50%, #06ffd4 100%) border-box",
                  border: "2px solid transparent",
                  boxShadow:
                    "0 0 40px rgba(124,58,237,0.25), 0 0 80px rgba(0,212,255,0.1)",
                }}
              >
                <img
                  src="/assets/generated/profile-avatar.dim_400x400.jpg"
                  alt="A.Shafiq Ahamed"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay scan line effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.02) 3px, rgba(0,212,255,0.02) 4px)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* HUD corners */}
              <div
                className="absolute top-2 left-2 w-6 h-6"
                style={{
                  borderTop: "2px solid #00d4ff",
                  borderLeft: "2px solid #00d4ff",
                }}
              />
              <div
                className="absolute top-2 right-2 w-6 h-6"
                style={{
                  borderTop: "2px solid #00d4ff",
                  borderRight: "2px solid #00d4ff",
                }}
              />
              <div
                className="absolute bottom-2 left-2 w-6 h-6"
                style={{
                  borderBottom: "2px solid #7c3aed",
                  borderLeft: "2px solid #7c3aed",
                }}
              />
              <div
                className="absolute bottom-2 right-2 w-6 h-6"
                style={{
                  borderBottom: "2px solid #7c3aed",
                  borderRight: "2px solid #7c3aed",
                }}
              />

              {/* Badge */}
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-card px-5 py-2 rounded-full text-xs font-mono flex items-center gap-2"
                style={{
                  color: "#06ffd4",
                  border: "1px solid rgba(6,255,212,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                <GraduationCap size={14} />
                SKCET Student
              </div>
            </div>
          </motion.div>

          {/* Right: text content */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
            data-ocid="about.text_panel"
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(232,232,240,0.75)" }}
            >
              Hi, I'm{" "}
              <span style={{ color: "#a78bfa" }} className="font-semibold">
                A.Shafiq Ahamed
              </span>
              , a passionate AI &amp; Data Science student with a deep love for
              building intelligent systems that bridge the gap between human
              creativity and machine intelligence. I thrive at the intersection
              of cutting-edge research and practical engineering.
            </p>

            {/* Education timeline */}
            <div className="relative pl-6">
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{
                  background: "linear-gradient(180deg, #7c3aed, #00d4ff)",
                }}
              />
              <div
                className="absolute left-[-5px] top-1 w-3 h-3 rounded-full"
                style={{
                  background: "#7c3aed",
                  boxShadow: "0 0 8px rgba(124,58,237,0.8)",
                }}
              />
              <div
                className="glass-card rounded-xl p-4 ml-2"
                data-ocid="about.education_card"
              >
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap size={16} style={{ color: "#00d4ff" }} />
                  <span
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: "#00d4ff" }}
                  >
                    Education
                  </span>
                </div>
                <p className="font-semibold" style={{ color: "#e8e8f0" }}>
                  Sri Krishna College of Engineering and Technology
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "rgba(232,232,240,0.55)" }}
                >
                  B.E. — Artificial Intelligence &amp; Data Science · 2022 –
                  2026
                </p>
              </div>
            </div>

            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(232,232,240,0.75)" }}
            >
              My goal is to become a world-class AI engineer who builds
              transformative products that matter. I am actively exploring
              machine learning, deep learning, natural language processing, and
              full-stack development — constantly pushing my skills towards
              Silicon Valley standards.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3">
              {[
                "Python",
                "Machine Learning",
                "React.js",
                "Deep Learning",
                "NLP",
                "Data Science",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    color: "#a78bfa",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-ocid="about.stats_row"
          ref={sectionRef}
        >
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
                className="glass-card rounded-2xl p-6 text-center"
                data-ocid={stat.ocid}
              >
                <Icon
                  size={24}
                  className="mx-auto mb-3"
                  style={{ color: stat.color }}
                />
                <p
                  className="text-3xl font-display font-bold mb-1"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}55`,
                  }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    active={statsActive}
                  />
                </p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(232,232,240,0.5)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
