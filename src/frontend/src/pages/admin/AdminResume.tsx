import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeFileId, useSetResumeFileId } from "@/hooks/useBackend";
import {
  CheckCircle2,
  FileText,
  Info,
  Link,
  Loader2,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminResume() {
  const { data: currentFileId, isLoading } = useResumeFileId();
  const setResumeFileId = useSetResumeFileId();

  const [fileUrl, setFileUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Direct URL approach: save a public URL (e.g. Google Drive, Dropbox, or hosted PDF)
  const handleSaveUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl.trim()) {
      toast.error("Please enter a resume URL.");
      return;
    }
    const res = await setResumeFileId.mutateAsync(fileUrl.trim());
    if (res.__kind__ === "ok") {
      toast.success("Resume URL saved!");
      setFileUrl("");
    } else {
      toast.error(res.err);
    }
  };

  // File-based approach: convert to data URL for storage
  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".pdf")) {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10 MB.");
      return;
    }

    // Use a data URL as the file identifier for local files
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const res = await setResumeFileId.mutateAsync(dataUrl);
      if (res.__kind__ === "ok") {
        toast.success("Resume uploaded and saved!");
      } else {
        toast.error(res.err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-8" data-ocid="admin.resume.page">
      <div>
        <h2 className="text-2xl font-display font-bold gradient-text">
          Resume Management
        </h2>
        <p className="text-muted-foreground text-sm">
          Upload and manage your resume PDF
        </p>
      </div>

      {/* Current resume status */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Current Resume</h3>
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin" /> Loading…
          </p>
        ) : currentFileId ? (
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <p className="text-sm text-foreground">
              Resume is uploaded and active.
            </p>
            {currentFileId.startsWith("http") && (
              <a
                href={currentFileId}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary hover:underline ml-1"
              >
                View
              </a>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mt-1">
            No resume uploaded yet.
          </p>
        )}
      </motion.div>

      {/* URL input */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Set Resume via URL</h3>
        </div>
        <form onSubmit={handleSaveUrl} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="resume-url">Public Resume URL</Label>
            <Input
              id="resume-url"
              data-ocid="admin.resume.url_input"
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://drive.google.com/... or direct PDF link"
              className="bg-muted/20 border-border"
            />
            <p className="text-xs text-muted-foreground">
              Use a publicly accessible URL (Google Drive, Dropbox, personal
              site, etc.)
            </p>
          </div>
          <Button
            type="submit"
            data-ocid="admin.resume.save_url_button"
            disabled={setResumeFileId.isPending || !fileUrl.trim()}
            className="btn-neon"
          >
            {setResumeFileId.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              "Save URL"
            )}
          </Button>
        </form>
      </motion.div>

      {/* File drop upload */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Upload PDF File</h3>
        </div>

        <button
          type="button"
          data-ocid="admin.resume.dropzone"
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-smooth ${
            dragOver
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 hover:bg-muted/10"
          }`}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload resume PDF"
        >
          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">Drop your PDF here</p>
          <p className="text-muted-foreground text-sm mt-1">
            or click to browse files
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            PDF only, max 10 MB
          </p>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleInputChange}
          aria-label="Resume file input"
        />

        <Button
          data-ocid="admin.resume.upload_button"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={setResumeFileId.isPending}
          className="w-full btn-neon rounded-xl"
        >
          {setResumeFileId.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Select PDF File
            </>
          )}
        </Button>
      </motion.div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5 flex gap-3"
      >
        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="text-foreground font-medium">How it works</p>
          <p>1. Either paste a public URL or drag &amp; drop a PDF file.</p>
          <p>2. The resume reference is saved to the backend canister.</p>
          <p>
            3. Visitors can then download your resume from the portfolio hero
            section.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
