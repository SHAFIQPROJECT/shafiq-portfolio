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
import {
  useDeleteMessage,
  useMarkMessageRead,
  useMessages,
} from "@/hooks/useBackend";
import type { Message } from "@/hooks/useBackend";
import {
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Loader2,
  Mail,
  MailOpen,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function MessageRow({ msg, index }: { msg: Message; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const markRead = useMarkMessageRead();
  const deleteMsg = useDeleteMessage();

  const handleMarkRead = async () => {
    const res = await markRead.mutateAsync(msg.id);
    if (res.__kind__ === "ok") toast.success("Marked as read");
    else toast.error(res.err);
  };

  const handleDelete = async () => {
    const res = await deleteMsg.mutateAsync(msg.id);
    if (res.__kind__ === "ok") toast.success("Message deleted");
    else toast.error(res.err);
    setDeleteId(null);
  };

  const formattedDate = new Date(
    Number(msg.timestamp) / 1_000_000,
  ).toLocaleDateString();

  return (
    <>
      <motion.tr
        data-ocid={`admin.messages.item.${index + 1}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.04 }}
        className={`border-b border-border/40 hover:bg-muted/10 transition-colors ${!msg.read ? "bg-primary/5" : ""}`}
      >
        <td className="py-3 px-4">
          {msg.read ? (
            <MailOpen className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Mail className="w-4 h-4 text-primary" />
          )}
        </td>
        <td className="py-3 px-4 font-medium text-foreground max-w-[120px] truncate">
          {msg.name}
        </td>
        <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell max-w-[180px] truncate">
          {msg.email}
        </td>
        <td className="py-3 px-4 text-foreground max-w-[200px] truncate hidden md:table-cell">
          {msg.subject}
        </td>
        <td className="py-3 px-4 text-muted-foreground text-xs hidden lg:table-cell">
          {formattedDate}
        </td>
        <td className="py-3 px-4">
          {msg.read ? (
            <Badge variant="secondary" className="text-xs">
              Read
            </Badge>
          ) : (
            <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
              New
            </Badge>
          )}
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid={`admin.messages.expand.${index + 1}`}
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {!msg.read && (
              <button
                type="button"
                data-ocid={`admin.messages.mark_read.${index + 1}`}
                onClick={handleMarkRead}
                disabled={markRead.isPending}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Mark as read"
              >
                {markRead.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCheck className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              type="button"
              data-ocid={`admin.messages.delete_button.${index + 1}`}
              onClick={() => setDeleteId(msg.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Delete message"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </motion.tr>

      <AnimatePresence>
        {expanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <td colSpan={7} className="px-4 pb-4">
              <div className="glass-card rounded-lg p-4 text-sm text-muted-foreground whitespace-pre-wrap">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">
                  Message
                </p>
                {msg.message}
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent
          data-ocid={`admin.messages.delete_dialog.${index + 1}`}
          className="glass-card border-border"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the message from {msg.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid={`admin.messages.cancel_button.${index + 1}`}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid={`admin.messages.confirm_button.${index + 1}`}
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/80"
            >
              {deleteMsg.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function AdminMessages() {
  const { data: messages = [], isLoading } = useMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6" data-ocid="admin.messages.page">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold gradient-text">
            Messages
          </h2>
          <p className="text-muted-foreground text-sm">
            {messages.length} total
          </p>
        </div>
        {unread > 0 && (
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {unread} unread
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div
          data-ocid="admin.messages.loading_state"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin" /> Loading messages…
        </div>
      ) : messages.length === 0 ? (
        <div
          data-ocid="admin.messages.empty_state"
          className="glass-card rounded-xl p-12 text-center text-muted-foreground"
        >
          No messages yet.
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="py-3 px-4 w-8" />
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    From
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">
                    Subject
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, i) => (
                  <MessageRow key={msg.id} msg={msg} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
