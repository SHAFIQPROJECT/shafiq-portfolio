import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  accent: string;
}

const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "exp-1",
    role: "AI/ML Intern",
    company: "AI Research Lab",
    location: "Remote",
    period: "Jan 2024 – Apr 2024",
    type: "Internship",
    description:
      "Developed machine learning models for NLP tasks, working extensively with Python and TensorFlow to process and classify large text datasets.",
    achievements: [
      "Built a text classification model achieving 92% accuracy on benchmark dataset",
      "Deployed 3 end-to-end ML pipelines in production environments",
      "Optimized model inference latency by 35% using quantization techniques",
    ],
    accent: "#00d4ff",
  },
  {
    id: "exp-2",
    role: "Web Development Intern",
    company: "Tech Solutions Ltd",
    location: "Chennai, India",
    period: "Jul 2023 – Sep 2023",
    type: "Internship",
    description:
      "Full-stack web development using React and Node.js, building responsive client-facing applications and RESTful API integrations.",
    achievements: [
      "Delivered 5 client websites with mobile-first responsive design",
      "Reduced average page load time by 40% via code splitting and lazy loading",
      "Integrated third-party payment gateway for an e-commerce client",
    ],
    accent: "#7c3aed",
  },
  {
    id: "exp-3",
    role: "Data Analysis Project",
    company: "SKCET College Project",
    location: "Coimbatore, India",
    period: "Sep 2023 – Nov 2023",
    type: "Academic",
    description:
      "Academic research project focused on exploratory data analysis and interactive visualization of large-scale datasets using Pandas, Matplotlib and Seaborn.",
    achievements: [
      "Analyzed 50,000+ records and uncovered key behavioral patterns",
      "Published research findings in the college journal",
      "Created an interactive dashboard using Plotly for stakeholder presentations",
    ],
    accent: "#06ffd4",
  },
];

function TimelineNode({ accent, index }: { accent: string; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
      className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 glass-card shrink-0"
      style={{
        borderColor: `${accent}70`,
        boxShadow: `0 0 20px ${accent}40, 0 0 40px ${accent}15`,
      }}
    >
      <Briefcase className="w-4 h-4" style={{ color: accent }} />
    </motion.div>
  );
}

function ExperienceCard({
  entry,
  index,
  isRight,
}: {
  entry: ExperienceEntry;
  index: number;
  isRight: boolean;
}) {
  return (
    <motion.div
      data-ocid={`experience.item.${index + 1}`}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      whileHover={{ scale: 1.01 }}
      className="group relative glass-card rounded-2xl p-6 flex flex-col gap-4 transition-smooth cursor-default"
      style={{ borderColor: `${entry.accent}25` }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
        style={{
          boxShadow: `0 0 35px ${entry.accent}30, 0 0 70px ${entry.accent}10`,
        }}
      />

      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="font-display font-bold text-xl leading-tight mb-1"
            style={{
              background: `linear-gradient(135deg, ${entry.accent}, #7c3aed)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {entry.role}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/80">
              {entry.company}
            </span>
            <span className="text-border">·</span>
            <MapPin
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: entry.accent }}
            />
            <span>{entry.location}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <Badge
            variant="outline"
            className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 border-white/10"
            style={{ color: entry.accent, borderColor: `${entry.accent}40` }}
          >
            <Calendar className="w-3 h-3" />
            {entry.period}
          </Badge>
          <span
            className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: entry.accent, background: `${entry.accent}15` }}
          >
            {entry.type}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {entry.description}
      </p>

      {/* Achievements */}
      <ul className="flex flex-col gap-2">
        {entry.achievements.map((ach) => (
          <motion.li
            key={ach}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
            className="flex items-start gap-2.5 text-sm text-foreground/75"
          >
            <CheckCircle2
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: entry.accent }}
            />
            <span>{ach}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      data-ocid="experience.section"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#00d4ff]/08 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7c3aed] mb-4 px-4 py-1.5 rounded-full border border-[#7c3aed]/25 bg-[#7c3aed]/05">
            <Briefcase className="w-3.5 h-3.5" />
            Journey
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Hands-on internships and projects shaping the path from student to
            AI engineer.
          </p>
        </motion.div>

        {/* ─── Mobile: single column ─────────────────────── */}
        <div className="flex flex-col gap-6 lg:hidden">
          {EXPERIENCES.map((entry, i) => (
            <ExperienceCard
              key={entry.id}
              entry={entry}
              index={i}
              isRight={false}
            />
          ))}
        </div>

        {/* ─── Desktop: alternating timeline ─────────────── */}
        <div className="hidden lg:block relative">
          {/* Centre vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #7c3aed55 20%, #00d4ff55 60%, transparent)",
            }}
          />

          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((entry, i) => {
              const isRight = i % 2 === 0;
              return (
                <div
                  key={entry.id}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6"
                >
                  {/* Left slot */}
                  {isRight ? (
                    <ExperienceCard entry={entry} index={i} isRight={isRight} />
                  ) : (
                    <div />
                  )}

                  {/* Node */}
                  <TimelineNode accent={entry.accent} index={i} />

                  {/* Right slot */}
                  {!isRight ? (
                    <ExperienceCard entry={entry} index={i} isRight={isRight} />
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
