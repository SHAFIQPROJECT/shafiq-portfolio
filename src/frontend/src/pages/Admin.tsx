import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsCallerAdmin } from "@/hooks/useBackend";
import { useMessages } from "@/hooks/useBackend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  Cpu,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Settings,
  Shield,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminMessages from "./admin/AdminMessages";
import AdminProjects from "./admin/AdminProjects";
import AdminResume from "./admin/AdminResume";
import AdminSettings from "./admin/AdminSettings";
import AdminSkills from "./admin/AdminSkills";

type AdminTab =
  | "dashboard"
  | "projects"
  | "skills"
  | "messages"
  | "analytics"
  | "resume"
  | "settings";

const NAV_ITEMS: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

function AdminDashboardHome() {
  const { data: messages = [] } = useMessages();
  const unread = messages.filter((m) => !m.read).length;
  const recent = [...messages]
    .sort((a, b) => Number(b.timestamp - a.timestamp))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold gradient-text mb-1">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground text-sm">Welcome back, Admin</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Total Messages",
            value: messages.length,
            color: "--neon-blue",
          },
          { label: "Unread Messages", value: unread, color: "--neon-purple" },
          {
            label: "Read Messages",
            value: messages.length - unread,
            color: "--neon-cyan",
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-5"
          >
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">
              {stat.label}
            </p>
            <p className="text-4xl font-display font-bold gradient-text">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Recent Messages
        </h3>
        {recent.length === 0 ? (
          <p className="text-muted-foreground text-sm">No messages yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">
                    From
                  </th>
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">
                    Subject
                  </th>
                  <th className="text-left py-2 text-muted-foreground font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-2 pr-4 text-foreground truncate max-w-[140px]">
                      {msg.name}
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground truncate max-w-[200px]">
                      {msg.subject}
                    </td>
                    <td className="py-2">
                      {msg.read ? (
                        <Badge variant="secondary" className="text-xs">
                          Read
                        </Badge>
                      ) : (
                        <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                          Unread
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: messages = [] } = useMessages();
  const unreadCount = messages.filter((m) => !m.read).length;

  const handleAuth = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };

  if (isInitializing || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card neon-border rounded-2xl p-10 max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto neon-glow">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold gradient-text mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground text-sm">
              Authenticate with Internet Identity to access the admin dashboard.
            </p>
          </div>
          <Button
            data-ocid="admin.login_button"
            onClick={handleAuth}
            disabled={isInitializing || isLoggingIn}
            className="w-full btn-neon rounded-xl py-5 text-base font-semibold"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {isLoggingIn ? "Authenticating…" : "Login with Internet Identity"}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card neon-border-purple rounded-2xl p-10 max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-destructive mb-2">
              Access Denied
            </h1>
            <p className="text-muted-foreground text-sm">
              You do not have admin privileges. The first user to authenticate
              becomes admin.
            </p>
          </div>
          <Button
            data-ocid="admin.logout_button"
            variant="outline"
            onClick={handleAuth}
            className="w-full rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboardHome />;
      case "projects":
        return <AdminProjects />;
      case "skills":
        return <AdminSkills />;
      case "messages":
        return <AdminMessages />;
      case "analytics":
        return <AdminAnalytics />;
      case "resume":
        return <AdminResume />;
      case "settings":
        return <AdminSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex" data-ocid="admin.page">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 glass-card border-r border-border z-40 lg:relative lg:translate-x-0 lg:animate-none flex flex-col"
        style={{ transform: undefined }}
        data-ocid="admin.sidebar"
      >
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-foreground">
            Admin Panel
          </span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-ocid={`admin.nav.${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                  isActive
                    ? "bg-primary/15 text-primary neon-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {item.id === "messages" && unreadCount > 0 && (
                  <Badge className="ml-auto text-[10px] py-0 px-1.5 bg-primary/20 text-primary border-primary/30">
                    {unreadCount}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            type="button"
            data-ocid="admin.sidebar_logout_button"
            onClick={handleAuth}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 lg:px-8 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-display font-semibold text-foreground capitalize">
              {activeTab}
            </h1>
          </div>
          <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
            Admin
          </Badge>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
