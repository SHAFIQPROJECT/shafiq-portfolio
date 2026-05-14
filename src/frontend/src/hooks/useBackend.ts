import { createActor } from "@/backend";
import type {
  Analytics,
  Certification,
  Message,
  Project,
  Skill,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { Project, Skill, Certification, Analytics, Message };

// ─── Query Hooks ────────────────────────────────────────────────────────────

export function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSkills() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkills();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCertifications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Certification[]>({
    queryKey: ["certifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCertifications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAnalytics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Analytics>({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getAnalytics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResumeFileId() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string | null>({
    queryKey: ["resumeFileId"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getResumeFileId();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsOpenAIConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["openAIConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOpenAIConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Mutation Hooks ──────────────────────────────────────────────────────────

export function useSubmitContactForm() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message,
    }: { name: string; email: string; subject: string; message: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitContactForm(name, email, subject, message);
    },
  });
}

export function useTrackVisit() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.trackVisit();
    },
  });
}

export function useChatWithAI() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      message,
      history,
    }: {
      message: string;
      history: Array<{ role: string; content: string }>;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.chatWithAI(message, history);
    },
  });
}

export function useAddProject() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: Project) => {
      if (!actor) throw new Error("No actor");
      return actor.addProject(p);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, p }: { id: string; p: Project }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProject(id, p);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteProject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useAddSkill() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (s: Skill) => {
      if (!actor) throw new Error("No actor");
      return actor.addSkill(s);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}

export function useDeleteSkill() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteSkill(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}

export function useAddCertification() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (c: Certification) => {
      if (!actor) throw new Error("No actor");
      return actor.addCertification(c);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["certifications"] }),
  });
}

export function useDeleteCertification() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteCertification(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["certifications"] }),
  });
}

export function useSetOpenAIKey() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error("No actor");
      return actor.setOpenAIKey(key);
    },
  });
}

export function useSetResumeFileId() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (fileId: string) => {
      if (!actor) throw new Error("No actor");
      return actor.setResumeFileId(fileId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resumeFileId"] }),
  });
}

export function useDeleteMessage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteMessage(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

export function useMarkMessageRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      return actor.markMessageRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

export function useGetGithubStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["githubStats", "shafiq-ahamed"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGithubStats("shafiq-ahamed");
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGetGithubRepos() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["githubRepos", "shafiq-ahamed"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGithubRepos("shafiq-ahamed");
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}
