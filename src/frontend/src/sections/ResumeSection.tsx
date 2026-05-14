import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useResumeFileId } from "@/hooks/useBackend";
import {
  Code2,
  Download,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  User,
} from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  { icon: User, label: "Name", value: "A.Shafiq Ahamed" },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.E. AI & DS, SKCET (2022–2026)",
  },
  { icon: Mail, label: "Email", value: "ahamedashafiq@gmail.com" },
  {
    icon: Code2,
    label: "Key Skills",
    value: "Python · React · TensorFlow · Data Science",
  },
];

const skills = [
  "Python",
  "React.js",
  "TensorFlow",
  "PyTorch",
  "SQL",
  "MongoDB",
  "OpenCV",
  "Scikit-learn",
];

export function ResumeSection() {
  const { data: fileId, isLoading } = useResumeFileId();

  const handleDownload = () => {
    if (!fileId) return;
    window.open(fileId, "_blank");
  };

  return (
    <section
      id="resume"
      className="py-24 px-4 relative overflow-hidden"
      data-ocid="resume.section"
    >
      {/* bg accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #7c3aed 0%, #00d4ff 60%, transparent 80%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3 font-mono">
            professional credentials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            <span className="gradient-text">Resume</span>
          </h2>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
        </motion.div>

        {/* Main card */}
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-10 neon-border-purple shadow-glow"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* File icon + title */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center neon-glow shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,212,255,0.15))",
              }}
            >
              <FileText
                className="w-7 h-7"
                style={{ color: "var(--neon-blue)" }}
              />
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                A.Shafiq Ahamed
              </h3>
              <p className="text-muted-foreground text-sm">
                AI & Data Science Student · SKCET
              </p>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <item.icon
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "var(--neon-purple)" }}
                />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-medium break-words">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills badges */}
          <div className="mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">
              Core Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs transition-smooth hover:neon-glow-blue cursor-default"
                    style={{ border: "1px solid rgba(0,212,255,0.25)" }}
                  >
                    {s}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            {fileId ? (
              <p className="text-sm text-muted-foreground">
                📄 Resume available — click to download
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {isLoading
                  ? "Checking availability…"
                  : "Resume coming soon — check back later"}
              </p>
            )}

            <Button
              className="btn-neon gap-2 px-6 min-w-[180px]"
              disabled={isLoading || !fileId}
              onClick={handleDownload}
              data-ocid="resume.download_button"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download Resume
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
