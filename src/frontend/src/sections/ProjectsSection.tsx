import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useBackend";
import type { Project } from "@/hooks/useBackend";
import { ExternalLink, Eye, Github, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const FILTERS = ["All", "Web", "AI/ML", "Data Science", "Other"] as const;
type Filter = (typeof FILTERS)[number];

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "AI Chatbot Assistant",
    description:
      "A conversational AI assistant built with TensorFlow and FastAPI. Features context-aware responses, real-time inference, and a sleek cyberpunk chat interface. Handles multi-turn conversations with RAG-augmented memory.",
    techStack: ["Python", "TensorFlow", "FastAPI", "React"],
    githubUrl: "https://github.com",
    demoUrl: "",
    category: "AI/ML",
    imageUrl: "",
    featured: true,
    order: BigInt(1),
  },
  {
    id: "2",
    title: "Futuristic Portfolio Website",
    description:
      "A full-stack portfolio built on the Internet Computer with React, Motoko backend, and a cyberpunk design system. Features admin CMS, visitor analytics, AI chatbot, and object storage for resume.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Motoko"],
    githubUrl: "https://github.com",
    demoUrl: "",
    category: "Web",
    imageUrl: "",
    featured: true,
    order: BigInt(2),
  },
  {
    id: "3",
    title: "Data Analytics Dashboard",
    description:
      "Interactive data visualization dashboard for analyzing large datasets. Built with Python and Pandas, features interactive charts, statistical summaries, and exportable reports with a clean, professional UI.",
    techStack: ["Python", "Pandas", "Matplotlib", "Plotly", "Streamlit"],
    githubUrl: "https://github.com",
    demoUrl: "",
    category: "Data Science",
    imageUrl: "",
    featured: false,
    order: BigInt(3),
  },
  {
    id: "4",
    title: "Network Vulnerability Scanner",
    description:
      "An automated cybersecurity tool for scanning network hosts, identifying open ports, and flagging known CVEs. Built with Python and Scapy with a Flask-powered REST API for remote scan triggers.",
    techStack: ["Python", "Scapy", "Flask", "SQLite"],
    githubUrl: "https://github.com",
    demoUrl: "",
    category: "Web",
    imageUrl: "",
    featured: false,
    order: BigInt(4),
  },
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  "AI/ML": "linear-gradient(135deg, #7c3aed 0%, #06ffd4 100%)",
  Web: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
  "Data Science": "linear-gradient(135deg, #06ffd4 0%, #00d4ff 100%)",
  Other: "linear-gradient(135deg, #7c3aed 0%, #00d4ff 100%)",
};

const TECH_COLORS: Record<string, string> = {
  Python: "rgba(55,120,198,0.25)",
  React: "rgba(0,212,255,0.18)",
  TypeScript: "rgba(49,120,198,0.25)",
  TensorFlow: "rgba(255,111,0,0.18)",
  PyTorch: "rgba(238,76,44,0.18)",
  FastAPI: "rgba(6,255,212,0.15)",
  default: "rgba(124,58,237,0.18)",
};

function TechTag({ tech }: { tech: string }) {
  const bg = TECH_COLORS[tech] ?? TECH_COLORS.default;
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-mono border"
      style={{
        background: bg,
        borderColor: "rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      {tech}
    </span>
  );
}

function GradientPlaceholder({
  category,
  title,
}: { category: string; title: string }) {
  const grad = CATEGORY_GRADIENTS[category] ?? CATEGORY_GRADIENTS.Other;
  return (
    <div
      className="w-full h-full flex items-center justify-center text-white/60 text-sm font-semibold tracking-wide"
      style={{ background: grad, opacity: 0.7 }}
    >
      {title.charAt(0)}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-ocid="projects.dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,5,15,0.85)", backdropFilter: "blur(8px)" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-2xl glass-card rounded-2xl overflow-hidden"
        initial={{ scale: 0.88, y: 32, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image / Gradient */}
        <div className="relative h-48 overflow-hidden">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <GradientPlaceholder
              category={project.category}
              title={project.title}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,20,0.9) 0%, transparent 60%)",
            }}
          />
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge
                className="flex items-center gap-1 text-xs"
                style={{
                  background: "rgba(252,196,0,0.15)",
                  color: "#fcd400",
                  border: "1px solid rgba(252,196,0,0.3)",
                }}
              >
                <Star size={10} fill="currentColor" /> Featured
              </Badge>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full transition-smooth"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            aria-label="Close modal"
            data-ocid="projects.close_button"
          >
            <X size={16} className="text-foreground" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">
                {project.title}
              </h3>
              <span
                className="text-xs font-mono mt-1 inline-block"
                style={{ color: "var(--neon-cyan)" }}
              >
                {project.category}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((t) => (
              <TechTag key={t} tech={t} />
            ))}
          </div>

          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="projects.github_link"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 btn-neon"
                >
                  <Github size={14} /> GitHub
                </Button>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="projects.demo_link"
              >
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(0,212,255,0.2),rgba(124,58,237,0.2))",
                    border: "1px solid rgba(0,212,255,0.35)",
                  }}
                >
                  <ExternalLink size={14} /> Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: { project: Project; index: number; onClick: () => void }) {
  const num = index + 1;
  return (
    <motion.div
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 0 36px rgba(0,212,255,0.22), 0 12px 40px rgba(0,0,0,0.5)",
      }}
      onClick={onClick}
      data-ocid={`projects.item.${num}`}
    >
      {/* Featured border glow */}
      {project.featured && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            border: "1.5px solid rgba(252,196,0,0.25)",
            boxShadow: "inset 0 0 20px rgba(252,196,0,0.04)",
          }}
        />
      )}

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <GradientPlaceholder
            category={project.category}
            title={project.title}
          />
        )}
        <div
          className="absolute inset-0 transition-smooth group-hover:opacity-70"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,20,0.92) 0%, rgba(8,8,20,0.3) 60%, transparent 100%)",
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{
              background: "rgba(0,212,255,0.12)",
              border: "1px solid rgba(0,212,255,0.28)",
              color: "var(--neon-cyan)",
            }}
          >
            {project.category}
          </span>
          {project.featured && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"
              style={{
                background: "rgba(252,196,0,0.12)",
                border: "1px solid rgba(252,196,0,0.28)",
                color: "#fcd400",
              }}
            >
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>
        {/* View overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(0,212,255,0.15)",
              border: "1px solid rgba(0,212,255,0.35)",
              color: "var(--neon-blue)",
            }}
          >
            <Eye size={13} /> View Details
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-foreground text-base mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((t) => (
            <TechTag key={t} tech={t} />
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs text-muted-foreground self-center">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div
          className="flex gap-2 pt-1"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
              }}
              data-ocid={`projects.github_button.${num}`}
            >
              <Github size={12} /> Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
                color: "var(--neon-blue)",
              }}
              data-ocid={`projects.demo_button.${num}`}
            >
              <ExternalLink size={12} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data: backendProjects, isLoading } = useProjects();

  const projects =
    backendProjects && backendProjects.length > 0
      ? backendProjects
      : FALLBACK_PROJECTS;
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  const sorted = [...filtered].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  return (
    <section
      id="projects"
      className="relative py-24 px-4"
      data-ocid="projects.section"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
            PORTFOLIO SHOWCASE
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              data-ocid={`projects.filter.${f.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-smooth focus:outline-none"
              style={{
                color:
                  activeFilter === f
                    ? "var(--neon-blue)"
                    : "rgba(255,255,255,0.45)",
              }}
            >
              {activeFilter === f && (
                <motion.span
                  layoutId="projects-filter-indicator"
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
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading
              ? Array.from({ length: 4 }, (_, i) => `sk${i}`).map((k) => (
                  <div
                    key={k}
                    className="glass-card rounded-2xl h-80 animate-pulse"
                    style={{ opacity: 0.4 }}
                  />
                ))
              : sorted.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
            {!isLoading && sorted.length === 0 && (
              <div
                className="col-span-full text-center py-16 text-muted-foreground"
                data-ocid="projects.empty_state"
              >
                <p className="text-lg font-semibold mb-2">No projects found</p>
                <p className="text-sm">
                  Try selecting a different category filter.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
