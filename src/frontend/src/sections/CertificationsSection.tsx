import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Certification, useCertifications } from "@/hooks/useBackend";
import { Award, Calendar, ExternalLink, Shield } from "lucide-react";
import { motion } from "motion/react";

const FALLBACK_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    title: "Machine Learning",
    issuer: "Coursera",
    date: "2023",
    credentialUrl: "https://coursera.org",
    imageUrl: "",
    description:
      "Completed specialization in supervised, unsupervised learning and neural networks.",
  },
  {
    id: "cert-2",
    title: "Python for Data Science",
    issuer: "IBM",
    date: "2023",
    credentialUrl: "https://ibm.com",
    imageUrl: "",
    description:
      "Mastered Python programming for data analysis, visualization and machine learning.",
  },
  {
    id: "cert-3",
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "2022",
    credentialUrl: "https://udemy.com",
    imageUrl: "",
    description:
      "Full-stack web development covering HTML, CSS, JavaScript, React, Node.js and MongoDB.",
  },
  {
    id: "cert-4",
    title: "Ethical Hacking Fundamentals",
    issuer: "NPTEL",
    date: "2023",
    credentialUrl: "https://nptel.ac.in",
    imageUrl: "",
    description:
      "Fundamentals of cybersecurity, ethical hacking methodologies and penetration testing.",
  },
];

const ISSUER_COLORS: Record<string, string> = {
  Coursera: "from-[#00d4ff]/20 to-[#0099cc]/10",
  IBM: "from-[#7c3aed]/20 to-[#5b21b6]/10",
  Udemy: "from-[#06ffd4]/20 to-[#059669]/10",
  NPTEL: "from-[#f59e0b]/20 to-[#d97706]/10",
};

const ISSUER_ACCENT: Record<string, string> = {
  Coursera: "#00d4ff",
  IBM: "#7c3aed",
  Udemy: "#06ffd4",
  NPTEL: "#f59e0b",
};

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const gradient =
    ISSUER_COLORS[cert.issuer] ?? "from-[#7c3aed]/20 to-[#00d4ff]/10";
  const accent = ISSUER_ACCENT[cert.issuer] ?? "#00d4ff";

  return (
    <motion.div
      data-ocid={`certifications.item.${index + 1}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative glass-card rounded-2xl p-6 cursor-default transition-smooth flex flex-col gap-4"
      style={{
        borderColor: `${accent}30`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
        style={{ boxShadow: `0 0 30px ${accent}35, 0 0 60px ${accent}15` }}
      />

      {/* Badge icon + issuer */}
      <div className="flex items-start justify-between gap-4">
        <div
          className={`relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} border`}
          style={{ borderColor: `${accent}40` }}
        >
          {cert.imageUrl ? (
            <img
              src={cert.imageUrl}
              alt={cert.issuer}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <Award className="w-7 h-7" style={{ color: accent }} />
          )}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-smooth"
            style={{ boxShadow: `inset 0 0 15px ${accent}25` }}
          />
        </div>

        <Badge
          variant="outline"
          className="flex items-center gap-1 text-xs px-2 py-1 font-mono border-white/10 text-muted-foreground shrink-0"
        >
          <Calendar className="w-3 h-3" />
          {cert.date}
        </Badge>
      </div>

      {/* Title */}
      <div>
        <h3
          className="font-display font-bold text-lg leading-snug mb-1"
          style={{
            background: `linear-gradient(135deg, ${accent}, #7c3aed)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {cert.title}
        </h3>
        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" style={{ color: accent }} />
          {cert.issuer}
        </p>
      </div>

      {/* Description */}
      {cert.description && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {cert.description}
        </p>
      )}

      {/* CTA */}
      {cert.credentialUrl && (
        <div className="mt-auto pt-2">
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              type="button"
              size="sm"
              className="btn-neon w-full gap-2 text-sm font-medium rounded-xl"
              style={{ color: accent, borderColor: `${accent}60` }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Verify Credential
            </Button>
          </a>
        </div>
      )}
    </motion.div>
  );
}

export function CertificationsSection() {
  const { data: fetched = [], isLoading } = useCertifications();
  const certs = fetched.length > 0 ? fetched : FALLBACK_CERTIFICATIONS;

  return (
    <section
      id="certifications"
      data-ocid="certifications.section"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-[#00d4ff]/08 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00d4ff] mb-4 px-4 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/05">
            <Award className="w-3.5 h-3.5" />
            Achievements
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Industry-recognized credentials validating expertise in AI, data
            science, and software engineering.
          </p>
        </motion.div>

        {/* Timeline wrapper on desktop */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#7c3aed]/40 to-transparent" />

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 h-52 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Cards grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {certs.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {!isLoading && certs.length === 0 && (
          <div
            data-ocid="certifications.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            <Award className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No certifications found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
