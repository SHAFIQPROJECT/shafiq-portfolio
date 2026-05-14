import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Certification {
    id: string;
    title: string;
    date: string;
    description: string;
    issuer: string;
    imageUrl: string;
    credentialUrl: string;
}
export interface Analytics {
    lastUpdated: Timestamp;
    totalVisits: bigint;
    pageViews: bigint;
}
export interface Skill {
    id: string;
    name: string;
    description: string;
    level: bigint;
    category: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Message {
    id: string;
    subject: string;
    name: string;
    read: boolean;
    email: string;
    message: string;
    timestamp: Timestamp;
}
export interface Project {
    id: string;
    title: string;
    featured: boolean;
    order: bigint;
    description: string;
    githubUrl: string;
    imageUrl: string;
    demoUrl: string;
    category: string;
    techStack: Array<string>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCertification(c: Certification): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addProject(p: Project): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addSkill(s: Skill): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    chatWithAI(message: string, history: Array<{
        content: string;
        role: string;
    }>): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteCertification(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteMessage(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProject(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteSkill(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAnalytics(): Promise<Analytics>;
    getCallerUserRole(): Promise<UserRole>;
    getCertifications(): Promise<Array<Certification>>;
    getFeaturedProjects(): Promise<Array<Project>>;
    getGithubRepos(username: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getGithubStats(username: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMessages(): Promise<Array<Message>>;
    getProjects(): Promise<Array<Project>>;
    getResumeFileId(): Promise<string | null>;
    getSkills(): Promise<Array<Skill>>;
    isCallerAdmin(): Promise<boolean>;
    isOpenAIConfigured(): Promise<boolean>;
    markMessageRead(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    openAITransform(input: TransformationInput): Promise<TransformationOutput>;
    setOpenAIKey(key: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setResumeFileId(fileId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitContactForm(name: string, email: string, subject: string, message: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    trackVisit(): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCertification(id: string, c: Certification): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProject(id: string, p: Project): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateSkill(id: string, s: Skill): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
