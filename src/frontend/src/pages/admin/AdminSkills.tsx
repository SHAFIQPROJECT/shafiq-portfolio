import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddSkill, useDeleteSkill, useSkills } from "@/hooks/useBackend";
import type { Skill } from "@/hooks/useBackend";
import { Cpu, Loader2, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM = {
  name: "",
  level: 75,
  category: "Frontend",
  description: "",
};

const CATEGORIES = [
  "Frontend",
  "Backend",
  "AI & ML",
  "Cybersecurity",
  "Database",
  "DevOps",
  "Tools",
];

function SkillBar({ level }: { level: number }) {
  return (
    <div className="w-full bg-muted/40 rounded-full h-1.5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full skill-bar-fill rounded-full"
      />
    </div>
  );
}

export default function AdminSkills() {
  const { data: skills = [], isLoading } = useSkills();
  const addSkill = useAddSkill();
  const deleteSkill = useDeleteSkill();
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: form.name,
      level: BigInt(form.level),
      category: form.category,
      description: form.description,
    };
    const res = await addSkill.mutateAsync(newSkill);
    if (res.__kind__ === "ok") {
      toast.success("Skill added");
      setForm(EMPTY_FORM);
      setShowForm(false);
    } else {
      toast.error(res.err);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteSkill.mutateAsync(id);
    if (res.__kind__ === "ok") toast.success("Skill deleted");
    else toast.error(res.err);
  };

  return (
    <div className="space-y-6" data-ocid="admin.skills.page">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold gradient-text">
            Skills
          </h2>
          <p className="text-muted-foreground text-sm">
            {skills.length} total across {Object.keys(grouped).length}{" "}
            categories
          </p>
        </div>
        <Button
          data-ocid="admin.skills.open_modal_button"
          onClick={() => setShowForm(!showForm)}
          className="btn-neon rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card neon-border rounded-xl p-6"
          data-ocid="admin.skills.dialog"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            New Skill
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="skill-name">Skill Name *</Label>
                <Input
                  id="skill-name"
                  data-ocid="admin.skills.name_input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-muted/20 border-border"
                  placeholder="e.g. React.js"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="skill-cat">Category</Label>
                <select
                  id="skill-cat"
                  data-ocid="admin.skills.category_select"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill-level">
                Proficiency Level:{" "}
                <span className="text-primary font-semibold">
                  {form.level}%
                </span>
              </Label>
              <input
                id="skill-level"
                data-ocid="admin.skills.level_input"
                type="range"
                min={0}
                max={100}
                value={form.level}
                onChange={(e) =>
                  setForm({ ...form, level: Number(e.target.value) })
                }
                className="w-full accent-primary"
              />
              <SkillBar level={form.level} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="skill-desc">Description</Label>
              <Input
                id="skill-desc"
                data-ocid="admin.skills.description_input"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="bg-muted/20 border-border"
                placeholder="Brief description"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                data-ocid="admin.skills.submit_button"
                disabled={addSkill.isPending}
                className="btn-neon"
              >
                {addSkill.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding…
                  </>
                ) : (
                  "Add Skill"
                )}
              </Button>
              <Button
                type="button"
                data-ocid="admin.skills.cancel_button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {isLoading ? (
        <div
          data-ocid="admin.skills.loading_state"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin" /> Loading skills…
        </div>
      ) : skills.length === 0 ? (
        <div
          data-ocid="admin.skills.empty_state"
          className="glass-card rounded-xl p-12 text-center text-muted-foreground"
        >
          No skills yet. Start adding your technical expertise!
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, catSkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  {category}
                </h3>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {catSkills.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {catSkills.map((skill, i) => (
                  <div
                    key={skill.id}
                    data-ocid={`admin.skills.item.${i + 1}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {String(skill.level)}%
                        </span>
                      </div>
                      <SkillBar level={Number(skill.level)} />
                      {skill.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {skill.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      data-ocid={`admin.skills.delete_button.${i + 1}`}
                      onClick={() => handleDelete(skill.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                      aria-label="Delete skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
