import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatWithAI, useIsOpenAIConfigured } from "@/hooks/useBackend";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--neon-blue)]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 1.2,
            delay: i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: isConfigured } = useIsOpenAIConfigured();
  const chatMutation = useChatWithAI();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || chatMutation.isPending) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    const updated = [...messages, userMsg];
    setMessages(updated);

    const history = updated
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const result = await chatMutation.mutateAsync({ message: text, history });
      const reply =
        "ok" in result
          ? result.ok
          : "err" in result
            ? `Error: ${result.err}`
            : "No response";
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="chat.dialog"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="glass-card neon-border w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl flex flex-col overflow-hidden"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[rgba(15,15,30,0.8)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    AI Assistant
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Powered by ChatGPT
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                data-ocid="chat.close_button"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            {!isConfigured ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <Bot className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    AI chat not configured yet.
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Ask the admin to set an OpenAI key.
                  </p>
                </div>
              </div>
            ) : (
              <ScrollArea className="flex-1 px-4 py-3">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-xs text-muted-foreground">
                      Ask me anything about Shafiq 👋
                    </p>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      data-ocid={`chat.message.${msg.role}`}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[rgba(124,58,237,0.3)] border border-[rgba(124,58,237,0.5)] text-foreground rounded-br-sm"
                            : "bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.25)] text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {chatMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.25)] rounded-2xl rounded-bl-sm">
                        <TypingDots />
                      </div>
                    </div>
                  )}
                </div>
                <div ref={bottomRef} />
              </ScrollArea>
            )}

            {/* Input */}
            {isConfigured && (
              <div className="flex items-center gap-2 px-3 py-3 border-t border-white/10 bg-[rgba(15,15,30,0.7)]">
                <input
                  ref={inputRef}
                  data-ocid="chat.input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  disabled={chatMutation.isPending}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                />
                <Button
                  type="button"
                  data-ocid="chat.submit_button"
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() || chatMutation.isPending}
                  aria-label="Send message"
                  className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] hover:opacity-90 shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        data-ocid="chat.open_modal_button"
        onClick={() => setOpen((p) => !p)}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center shadow-2xl relative"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)]"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
