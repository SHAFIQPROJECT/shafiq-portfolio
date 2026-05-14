import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useBackend";
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ahamedashafiq@gmail.com",
    href: "mailto:ahamedashafiq@gmail.com",
    color: "var(--neon-blue)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7708904296",
    href: "tel:+917708904296",
    color: "var(--neon-cyan)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Coimbatore, Tamil Nadu, India",
    href: null,
    color: "var(--neon-purple)",
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shafiq-ahamed-86851137b",
    color: "#0a66c2",
    glow: "0 0 14px rgba(10,102,194,0.6)",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/shafiq-ahamed",
    color: "#e6edf3",
    glow: "0 0 14px rgba(230,237,243,0.4)",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:ahamedashafiq@gmail.com",
    color: "var(--neon-blue)",
    glow: "0 0 14px rgba(0,212,255,0.6)",
  },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useSubmitContactForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    try {
      const result = await mutation.mutateAsync(form);
      if ("__kind__" in result && result.__kind__ === "err") {
        throw new Error(result.err);
      }
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      // error handled via mutation.isError
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 relative overflow-hidden"
      data-ocid="contact.section"
    >
      {/* bg accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #00d4ff 0%, #7c3aed 60%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #7c3aed 0%, #06ffd4 60%, transparent 80%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3 font-mono">
            let&apos;s connect
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Left: Contact Info ── */}
          <motion.div
            className="glass-card rounded-2xl p-8 neon-border flex flex-col gap-7"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-ocid="contact.info_card"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                Contact Info
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas
                or opportunities to be part of your vision.
              </p>
            </div>

            {/* Info rows */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-smooth group-hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${item.color}44`,
                      boxShadow: `0 0 10px ${item.color}22`,
                    }}
                  >
                    <item.icon
                      className="w-4 h-4"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-foreground font-medium hover:text-accent transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground font-medium">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center relative"
              style={{
                height: "140px",
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,212,255,0.08))",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              <div className="text-center">
                <MapPin
                  className="w-8 h-8 mx-auto mb-2 neon-glow-blue"
                  style={{ color: "var(--neon-blue)" }}
                />
                <p className="text-sm text-muted-foreground font-mono">
                  Coimbatore, Tamil Nadu
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">India 🇮🇳</p>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-smooth"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${link.color}44`,
                    }}
                    whileHover={{ scale: 1.12, boxShadow: link.glow }}
                    whileTap={{ scale: 0.95 }}
                    data-ocid={`contact.${link.label.toLowerCase()}_link`}
                  >
                    <link.icon
                      className="w-5 h-5"
                      style={{ color: link.color }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            className="glass-card rounded-2xl p-8 neon-border-purple"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-ocid="contact.form_card"
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full min-h-[400px] gap-5 text-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                data-ocid="contact.success_state"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center neon-glow-cyan"
                  style={{
                    background: "rgba(6,255,212,0.12)",
                    border: "2px solid rgba(6,255,212,0.4)",
                  }}
                >
                  <CheckCircle2
                    className="w-10 h-10"
                    style={{ color: "var(--neon-cyan)" }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    I&apos;ll get back to you soon. Thank you for reaching out!
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="btn-neon mt-2"
                  onClick={() => setSubmitted(false)}
                  data-ocid="contact.send_another_button"
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
                data-ocid="contact.form"
              >
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                  Send a Message
                </h3>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="name"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-mono"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    className="bg-transparent neon-border focus-visible:ring-[var(--neon-blue)] focus-visible:ring-2 text-foreground placeholder:text-muted-foreground"
                    data-ocid="contact.name_input"
                  />
                  {errors.name && (
                    <p
                      className="text-xs flex items-center gap-1"
                      style={{ color: "#f87171" }}
                      data-ocid="contact.name.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="email"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-mono"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="bg-transparent neon-border focus-visible:ring-[var(--neon-blue)] focus-visible:ring-2 text-foreground placeholder:text-muted-foreground"
                    data-ocid="contact.email_input"
                  />
                  {errors.email && (
                    <p
                      className="text-xs flex items-center gap-1"
                      style={{ color: "#f87171" }}
                      data-ocid="contact.email.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="subject"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-mono"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="bg-transparent neon-border focus-visible:ring-[var(--neon-blue)] focus-visible:ring-2 text-foreground placeholder:text-muted-foreground"
                    data-ocid="contact.subject_input"
                  />
                  {errors.subject && (
                    <p
                      className="text-xs flex items-center gap-1"
                      style={{ color: "#f87171" }}
                      data-ocid="contact.subject.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-mono"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hi…"
                    rows={5}
                    className="bg-transparent neon-border focus-visible:ring-[var(--neon-blue)] focus-visible:ring-2 text-foreground placeholder:text-muted-foreground resize-none"
                    data-ocid="contact.message_textarea"
                  />
                  {errors.message && (
                    <p
                      className="text-xs flex items-center gap-1"
                      style={{ color: "#f87171" }}
                      data-ocid="contact.message.field_error"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* API error */}
                {mutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg text-sm"
                    style={{
                      background: "rgba(248,113,113,0.1)",
                      border: "1px solid rgba(248,113,113,0.3)",
                      color: "#f87171",
                    }}
                    data-ocid="contact.error_state"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      Failed to send. Please try again or email directly.
                    </span>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.div
                  animate={mutation.isPending ? { opacity: [1, 0.7, 1] } : {}}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.2,
                  }}
                >
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full gap-2 font-semibold py-5 transition-smooth"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.3))",
                      border: "1px solid rgba(0,212,255,0.4)",
                      color: "var(--neon-blue)",
                      boxShadow: mutation.isPending
                        ? "0 0 24px rgba(0,212,255,0.4)"
                        : undefined,
                    }}
                    data-ocid="contact.submit_button"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
