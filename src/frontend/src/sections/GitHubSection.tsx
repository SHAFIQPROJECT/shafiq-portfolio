import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGithubRepos, useGetGithubStats } from "@/hooks/useBackend";
import {
  AlertCircle,
  BookOpen,
  ExternalLink,
  GitFork,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { SiGithub } from "react-icons/si";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
  Shell: "#89e051",
  Motoko: "#b22222",
};

interface GithubUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

function parseBEResult(data: unknown): GithubUser | GithubRepo[] | null {
  if (!data) return null;
  const d = data as { ok?: string; err?: string };
  if (d.ok) {
    try {
      return JSON.parse(d.ok) as GithubUser | GithubRepo[];
    } catch {
      return null;
    }
  }
  return null;
}

function StatCard({
  label,
  value,
  icon,
}: { label: string; value: number | string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      className="glass-card neon-border rounded-xl p-5 flex flex-col items-center gap-2 text-center transition-smooth"
    >
      <div className="text-[var(--neon-cyan)] mb-1">{icon}</div>
      <span className="text-2xl font-bold gradient-text">{value}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

function StatSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5 flex flex-col items-center gap-2">
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="w-12 h-7 rounded" />
      <Skeleton className="w-20 h-3 rounded" />
    </div>
  );
}

export function GitHubSection() {
  const statsQuery = useGetGithubStats();
  const reposQuery = useGetGithubRepos();

  const statsData = parseBEResult(statsQuery.data) as GithubUser | null;
  const reposData = parseBEResult(reposQuery.data) as GithubRepo[] | null;
  const topRepos = reposData?.slice(0, 6) ?? [];

  const isLoading = statsQuery.isLoading || reposQuery.isLoading;
  const hasError = (statsQuery.isError || !statsData) && !isLoading;

  return (
    <section id="github" className="py-24 px-4 relative">
      <div className="section-divider mb-16" />
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <SiGithub className="w-8 h-8 text-[var(--neon-cyan)]" />
            <h2 className="text-3xl md:text-4xl font-bold font-display gradient-text">
              GitHub Activity
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Open-source contributions & public repositories
          </p>
        </motion.div>

        {/* Error */}
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-12 text-muted-foreground"
            data-ocid="github.error_state"
          >
            <AlertCircle className="w-8 h-8 text-destructive" />
            <p>Unable to load GitHub stats</p>
          </motion.div>
        )}

        {/* Stats Grid */}
        {!hasError && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {isLoading
                ? Array.from({ length: 4 }, (_, i) => `sk${i}`).map((k) => (
                    <StatSkeleton key={k} />
                  ))
                : statsData && (
                    <>
                      <StatCard
                        label="Repositories"
                        value={statsData.public_repos}
                        icon={<BookOpen className="w-5 h-5" />}
                      />
                      <StatCard
                        label="Followers"
                        value={statsData.followers}
                        icon={<Users className="w-5 h-5" />}
                      />
                      <StatCard
                        label="Following"
                        value={statsData.following}
                        icon={<Users className="w-5 h-5" />}
                      />
                      <StatCard
                        label="Public Gists"
                        value={statsData.public_gists}
                        icon={<GitFork className="w-5 h-5" />}
                      />
                    </>
                  )}
            </div>

            {/* Repos */}
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="gradient-text">Top Repositories</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {isLoading
                ? Array.from({ length: 6 }, (_, i) => `sr${i}`).map((k) => (
                    <div
                      key={k}
                      className="glass-card rounded-xl p-5 flex flex-col gap-3"
                    >
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-full rounded" />
                      <Skeleton className="h-3 w-5/6 rounded" />
                      <div className="flex gap-2 mt-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>
                    </div>
                  ))
                : topRepos.map((repo, i) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={`github.repo.item.${i + 1}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -4 }}
                      className="glass-card neon-border rounded-xl p-5 flex flex-col gap-2 transition-smooth cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm text-foreground group-hover:text-[var(--neon-blue)] transition-colors line-clamp-1">
                          {repo.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      </div>
                      {repo.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-auto pt-1">
                        {repo.language && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0.5 gap-1 bg-[rgba(255,255,255,0.06)] border-white/10"
                          >
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  LANGUAGE_COLORS[repo.language] ?? "#8b8b8b",
                              }}
                            />
                            {repo.language}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </motion.a>
                  ))}
            </div>
          </>
        )}

        {/* Profile link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://github.com/shafiq-ahamed"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="github.profile_link"
            className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-smooth"
          >
            <SiGithub className="w-4 h-4" />
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
