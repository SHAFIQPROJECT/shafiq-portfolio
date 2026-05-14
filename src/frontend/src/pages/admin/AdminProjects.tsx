import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddProject,
  useDeleteProject,
  useProjects,
} from "@/hooks/useBackend";
import type { Project } from "@/hooks/useBackend";
import { ExternalLink, Github, Loader2, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "web",
  techStack: "",
  githubUrl: "",
  demoUrl: "",
  imageUrl: "",
  featured: false,
};

export default function AdminProjects() {
  const { data: projects = [], isLoading } = useProjects();
  const addProject = useAddProject();
  const deleteProject = useDeleteProject();

  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: form.title,
      description: form.description,
      category: form.category,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      githubUrl: form.githubUrl,
      demoUrl: form.demoUrl,
      imageUrl: form.imageUrl,
      featured: form.featured,
      order: BigInt(projects.length),
    };
    const res = await addProject.mutateAsync(newProject);
    if (res.__kind__ === "ok") {
      toast.success("Project added successfully");
      setForm(EMPTY_FORM);
      setShowForm(false);
    } else {
      toast.error(res.err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteProject.mutateAsync(deleteId);
    if (res.__kind__ === "ok") {
      toast.success("Project deleted");
    } else {
      toast.error(res.err);
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6" data-ocid="admin.projects.page">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold gradient-text">
            Projects
          </h2>
          <p className="text-muted-foreground text-sm">
            {projects.length} total
          </p>
        </div>
        <Button
          data-ocid="admin.projects.open_modal_button"
          onClick={() => setShowForm(true)}
          className="btn-neon rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {isLoading ? (
        <div
          data-ocid="admin.projects.loading_state"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin" /> Loading projects…
        </div>
      ) : projects.length === 0 ? (
        <div
          data-ocid="admin.projects.empty_state"
          className="glass-card rounded-xl p-12 text-center text-muted-foreground"
        >
          No projects yet. Add your first project!
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden lg:table-cell">
                    Stack
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">
                    Featured
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Links
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    data-ocid={`admin.projects.item.${i + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border/40 hover:bg-muted/10 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground max-w-[160px] truncate">
                      {p.title}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs">
                        {p.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap max-w-[200px]">
                        {p.techStack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] bg-primary/10 text-primary border border-primary/20 rounded px-1.5 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                        {p.techStack.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{p.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      {p.featured ? (
                        <Badge className="text-[10px] bg-primary/20 text-primary border-primary/30">
                          Yes
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        data-ocid={`admin.projects.delete_button.${i + 1}`}
                        onClick={() => setDeleteId(p.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent
          data-ocid="admin.projects.dialog"
          className="glass-card border-border max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="gradient-text font-display">
              Add New Project
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="proj-title">Title *</Label>
              <Input
                id="proj-title"
                data-ocid="admin.projects.title_input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="bg-muted/20 border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proj-desc">Description *</Label>
              <textarea
                id="proj-desc"
                data-ocid="admin.projects.description_input"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                rows={3}
                className="w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="proj-cat">Category</Label>
                <Input
                  id="proj-cat"
                  data-ocid="admin.projects.category_input"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="bg-muted/20 border-border"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="proj-stack">Tech Stack (comma-separated)</Label>
                <Input
                  id="proj-stack"
                  data-ocid="admin.projects.techstack_input"
                  placeholder="React, Node.js"
                  value={form.techStack}
                  onChange={(e) =>
                    setForm({ ...form, techStack: e.target.value })
                  }
                  className="bg-muted/20 border-border"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proj-github">GitHub URL</Label>
              <Input
                id="proj-github"
                data-ocid="admin.projects.github_input"
                type="url"
                value={form.githubUrl}
                onChange={(e) =>
                  setForm({ ...form, githubUrl: e.target.value })
                }
                className="bg-muted/20 border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proj-demo">Demo URL</Label>
              <Input
                id="proj-demo"
                data-ocid="admin.projects.demo_input"
                type="url"
                value={form.demoUrl}
                onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                className="bg-muted/20 border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proj-img">Image URL</Label>
              <Input
                id="proj-img"
                data-ocid="admin.projects.image_input"
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="bg-muted/20 border-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="proj-featured"
                data-ocid="admin.projects.featured_checkbox"
                checked={form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: !!v })}
              />
              <Label htmlFor="proj-featured" className="cursor-pointer">
                Featured project
              </Label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                data-ocid="admin.projects.submit_button"
                disabled={addProject.isPending}
                className="flex-1 btn-neon"
              >
                {addProject.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding…
                  </>
                ) : (
                  "Add Project"
                )}
              </Button>
              <Button
                type="button"
                data-ocid="admin.projects.cancel_button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent
          data-ocid="admin.projects.delete_dialog"
          className="glass-card border-border"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.projects.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.projects.delete_confirm_button"
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/80"
            >
              {deleteProject.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
