import { useSkills } from "@/hooks/useBackend";
import type { Skill } from "@/hooks/useBackend";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

const CATEGORIES = [
  "Frontend",
  "Backend",
  "AI & ML",
  "Databases",
  "Tools",
] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  react: <SiReact />,
  typescript: <SiTypescript />,
  tailwind: <SiTailwindcss />,
  "html/css": <SiHtml5 />,
  "node.js": <SiNodedotjs />,
  python: <SiPython />,
  fastapi: <SiFastapi />,
  tensorflow: <SiTensorflow />,
  pytorch: <SiPytorch />,
  "scikit-learn": <SiScikitlearn />,
  pandas: <SiPython />,
  mongodb: <SiMongodb />,
  mysql: <SiMysql />,
  firebase: <SiFirebase />,
  git: <SiGit />,
  docker: <SiDocker />,
  linux: <SiLinux />,
};

const FALLBACK_SKILLS: Skill[] = [
  {
    id: "1",
    name: "React",
    level: BigInt(90),
    category: "Frontend",
    description: "",
  },
  {
    id: "2",
    name: "TypeScript",
    level: BigInt(85),
    category: "Frontend",
    description: "",
  },
  {
    id: "3",
    name: "Tailwind",
    level: BigInt(85),
    category: "Frontend",
    description: "",
  },
  {
    id: "4",
    name: "HTML/CSS",
    level: BigInt(95),
    category: "Frontend",
    description: "",
  },
  {
    id: "5",
    name: "Node.js",
    level: BigInt(80),
    category: "Backend",
    description: "",
  },
  {
    id: "6",
    name: "Python",
    level: BigInt(85),
    category: "Backend",
    description: "",
  },
  {
    id: "7",
    name: "FastAPI",
    level: BigInt(75),
    category: "Backend",
    description: "",
  },
  {
    id: "8",
    name: "TensorFlow",
    level: BigInt(75),
    category: "AI & ML",
    description: "",
  },
  {
    id: "9",
    name: "PyTorch",
    level: BigInt(70),
    category: "AI & ML",
    description: "",
  },
  {
    id: "10",
    name: "Scikit-learn",
    level: BigInt(80),
    category: "AI & ML",
    description: "",
  },
  {
    id: "11",
    name: "Pandas",
    level: BigInt(85),
    category: "AI & ML",
    description: "",
  },
  {
    id: "12",
    name: "MongoDB",
    level: BigInt(80),
    category: "Databases",
    description: "",
  },
  {
    id: "13",
    name: "MySQL",
    level: BigInt(75),
    category: "Databases",
    description: "",
  },
  {
    id: "14",
    name: "Firebase",
    level: BigInt(70),
    category: "Databases",
    description: "",
  },
  {
    id: "15",
    name: "Git",
    level: BigInt(90),
    category: "Tools",
    description: "",
  },
  {
    id: "16",
    name: "Docker",
    level: BigInt(65),
    category: "Tools",
    description: "",
  },
  {
    id: "17",
    name: "Linux",
    level: BigInt(80),
    category: "Tools",
    description: "",
  },
];

function SkillBar({ skill, inView }: { skill: Skill; inView: boolean }) {
  const level = Number(skill.level);
  const icon = CATEGORY_ICONS[skill.name.toLowerCase()];

  return (
    <motion.div
      className="glass-card rounded-xl p-4 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01, boxShadow: "0 0 24px rgba(0,212,255,0.18)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-lg" style={{ color: "var(--neon-cyan)" }}>
              {icon}
            </span>
          )}
          <span className="text-sm font-semibold text-foreground tracking-wide">
            {skill.name}
          </span>
        </div>
        <span
          className="text-xs font-mono font-bold"
          style={{ color: "var(--neon-blue)" }}
        >
          {level}%
        </span>
      </div>
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : "0%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "rgba(0,212,255,0.3)", filter: "blur(4px)" }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : "0%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<Category>("Frontend");
  const { data: backendSkills, isLoading } = useSkills();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const skills =
    backendSkills && backendSkills.length > 0 ? backendSkills : FALLBACK_SKILLS;
  const filtered = skills.filter((s) => s.category === activeTab);

  // Auto-show animation even before strict inView for tabs that already loaded
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    if (inView) setHasEntered(true);
  }, [inView]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-4"
      data-ocid="skills.section"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-mono tracking-[0.25em] mb-3"
            style={{ color: "var(--neon-cyan)" }}
          >
            TECHNICAL EXPERTISE
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            <span className="gradient-text">Skills</span>{" "}
            <span className="text-foreground">&amp; Proficiency</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              data-ocid={`skills.tab.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-smooth focus:outline-none"
              style={{
                color:
                  activeTab === cat
                    ? "var(--neon-blue)"
                    : "rgba(255,255,255,0.45)",
              }}
            >
              {activeTab === cat && (
                <motion.span
                  layoutId="skills-tab-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))",
                    border: "1px solid rgba(0,212,255,0.35)",
                    boxShadow: "0 0 14px rgba(0,212,255,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Skill Bars Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {isLoading
              ? Array.from({ length: 4 }, (_, i) => `sk${i}`).map((k) => (
                  <div
                    key={k}
                    className="glass-card rounded-xl p-4 h-16 animate-pulse"
                    style={{ opacity: 0.5 }}
                  />
                ))
              : filtered.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <SkillBar skill={skill} inView={hasEntered} />
                  </motion.div>
                ))}
            {!isLoading && filtered.length === 0 && (
              <div
                className="col-span-2 text-center py-12 text-muted-foreground text-sm"
                data-ocid="skills.empty_state"
              >
                No skills found in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
