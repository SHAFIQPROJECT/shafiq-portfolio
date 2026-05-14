import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ProjectTypes "types/projects";
import SkillTypes "types/skills";
import CertTypes "types/certifications";
import MsgTypes "types/messages";
import AnalyticsLib "lib/analytics";
import ProjectsApi "mixins/projects-api";
import SkillsApi "mixins/skills-api";
import CertificationsApi "mixins/certifications-api";
import MessagesApi "mixins/messages-api";
import AnalyticsApi "mixins/analytics-api";
import ResumeApi "mixins/resume-api";
import OpenAIChatApi "mixins/openai-chat-api";
import GithubApi "mixins/github-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (resume upload infrastructure)
  include MixinObjectStorage();

  // Projects
  let projects = Map.empty<Text, ProjectTypes.Project>();
  include ProjectsApi(accessControlState, projects);

  // Skills
  let skills = Map.empty<Text, SkillTypes.Skill>();
  include SkillsApi(accessControlState, skills);

  // Certifications
  let certs = Map.empty<Text, CertTypes.Certification>();
  include CertificationsApi(accessControlState, certs);

  // Messages
  let messages = Map.empty<Text, MsgTypes.Message>();
  include MessagesApi(accessControlState, messages);

  // Analytics
  let analyticsState = AnalyticsLib.initState();
  include AnalyticsApi(accessControlState, analyticsState);

  // Resume file reference
  let resumeFileId = { var value : ?Text = null };
  include ResumeApi(accessControlState, resumeFileId);

  // OpenAI chatbot (admin-key variant)
  let openAIApiKey = { var value : ?Text = null };
  include OpenAIChatApi(accessControlState, openAIApiKey);

  // GitHub API outcalls
  include GithubApi();
};
