import { useAnalytics } from "@/hooks/useBackend";
import { Calendar, Eye, Loader2, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card rounded-xl p-6 flex items-start gap-4"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-3xl font-display font-bold gradient-text truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

export default function AdminAnalytics() {
  const { data: analytics, isLoading, error } = useAnalytics();

  const lastUpdated = analytics
    ? new Date(Number(analytics.lastUpdated) / 1_000_000).toLocaleString()
    : "—";

  return (
    <div className="space-y-8" data-ocid="admin.analytics.page">
      <div>
        <h2 className="text-2xl font-display font-bold gradient-text">
          Analytics
        </h2>
        <p className="text-muted-foreground text-sm">
          Visitor insights and portfolio traffic
        </p>
      </div>

      {isLoading ? (
        <div
          data-ocid="admin.analytics.loading_state"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin" /> Loading analytics…
        </div>
      ) : error ? (
        <div
          data-ocid="admin.analytics.error_state"
          className="glass-card rounded-xl p-8 text-center"
        >
          <p className="text-destructive">Failed to load analytics data.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={Users}
              label="Total Visits"
              value={analytics ? String(analytics.totalVisits) : "0"}
              color="#00d4ff"
              delay={0}
            />
            <StatCard
              icon={Eye}
              label="Page Views"
              value={analytics ? String(analytics.pageViews) : "0"}
              color="#7c3aed"
              delay={0.1}
            />
            <StatCard
              icon={Calendar}
              label="Last Updated"
              value={lastUpdated}
              color="#06ffd4"
              delay={0.2}
            />
          </div>

          {/* Visual bar */}
          {analytics && analytics.totalVisits > 0n && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Traffic Overview
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Total Visits</span>
                    <span>{String(analytics.totalVisits)}</span>
                  </div>
                  <div className="bg-muted/40 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                      className="h-full skill-bar-fill rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Page Views</span>
                    <span>{String(analytics.pageViews)}</span>
                  </div>
                  <div className="bg-muted/40 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          analytics.totalVisits > 0n
                            ? `${Math.min(100, Math.round((Number(analytics.pageViews) / Number(analytics.totalVisits)) * 100))}%`
                            : "0%",
                      }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #7c3aed, #00d4ff)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
