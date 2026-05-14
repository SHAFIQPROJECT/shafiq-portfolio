import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsOpenAIConfigured, useSetOpenAIKey } from "@/hooks/useBackend";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { data: isConfigured, isLoading: configLoading } =
    useIsOpenAIConfigured();
  const setOpenAIKey = useSetOpenAIKey();

  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error("Please enter an API key.");
      return;
    }
    if (!apiKey.startsWith("sk-")) {
      toast.error("API key must start with 'sk-'");
      return;
    }
    const res = await setOpenAIKey.mutateAsync(apiKey.trim());
    if (res.__kind__ === "ok") {
      toast.success("OpenAI API key saved successfully!");
      setSaved(true);
      setApiKey("");
      setTimeout(() => setSaved(false), 4000);
    } else {
      toast.error(res.err);
    }
  };

  return (
    <div className="space-y-8" data-ocid="admin.settings.page">
      <div>
        <h2 className="text-2xl font-display font-bold gradient-text">
          Settings
        </h2>
        <p className="text-muted-foreground text-sm">
          Configure integrations and API keys
        </p>
      </div>

      {/* OpenAI status */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <KeyRound className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">
            OpenAI Configuration
          </h3>
        </div>

        {configLoading ? (
          <div
            data-ocid="admin.settings.loading_state"
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            <Loader2 className="w-3 h-3 animate-spin" /> Checking configuration…
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-4">
            {isConfigured ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">
                  OpenAI API key is configured
                </span>
                <span className="text-muted-foreground text-xs ml-1">
                  (AI chatbot is active)
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">
                  No API key configured
                </span>
                <span className="text-muted-foreground text-xs ml-1">
                  (AI chatbot disabled)
                </span>
              </>
            )}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="openai-key"
                data-ocid="admin.settings.api_key_input"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="bg-muted/20 border-border pr-10 font-mono text-sm"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your key is stored securely on-chain and never exposed to
              visitors.
            </p>
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/20 rounded-lg p-3">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p>
              Only share your API key with trusted environments. The key will be
              replaced upon saving.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              data-ocid="admin.settings.save_button"
              disabled={setOpenAIKey.isPending || !apiKey.trim()}
              className="btn-neon"
            >
              {setOpenAIKey.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save API Key"
              )}
            </Button>
            {saved && (
              <motion.div
                data-ocid="admin.settings.success_state"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-green-400 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Saved!
              </motion.div>
            )}
          </div>
        </form>
      </motion.div>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-6 border border-destructive/20"
      >
        <h3 className="font-semibold text-foreground mb-2">
          About This Admin Panel
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This admin dashboard is protected by Internet Identity authentication.
          The first authenticated user automatically becomes admin. All
          portfolio data including projects, skills, certifications, and
          messages are stored on-chain via the Motoko backend canister.
        </p>
      </motion.div>
    </div>
  );
}
