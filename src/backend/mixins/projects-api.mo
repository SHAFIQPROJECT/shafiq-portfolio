import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProjectLib "../lib/projects";
import ProjectTypes "../types/projects";

mixin (
  accessControlState : AccessControl.AccessControlState,
  projects : Map.Map<Text, ProjectTypes.Project>,
) {
  public query func getProjects() : async [ProjectTypes.Project] {
    ProjectLib.getAll(projects)
  };

  public query func getFeaturedProjects() : async [ProjectTypes.Project] {
    ProjectLib.getFeatured(projects)
  };

  public shared ({ caller }) func addProject(p : ProjectTypes.Project) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    switch (ProjectLib.add(projects, p)) {
      case (#ok _) #ok;
      case (#err e) #err(e);
    }
  };

  public shared ({ caller }) func updateProject(id : Text, p : ProjectTypes.Project) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    switch (ProjectLib.update(projects, id, p)) {
      case (#ok _) #ok;
      case (#err e) #err(e);
    }
  };

  public shared ({ caller }) func deleteProject(id : Text) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    switch (ProjectLib.remove(projects, id)) {
      case (#ok _) #ok;
      case (#err e) #err(e);
    }
  };
};
