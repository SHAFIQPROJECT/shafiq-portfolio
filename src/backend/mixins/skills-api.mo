import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import SkillLib "../lib/skills";
import SkillTypes "../types/skills";

mixin (
  accessControlState : AccessControl.AccessControlState,
  skills : Map.Map<Text, SkillTypes.Skill>,
) {
  public query func getSkills() : async [SkillTypes.Skill] {
    SkillLib.getAll(skills)
  };

  public shared ({ caller }) func addSkill(s : SkillTypes.Skill) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    switch (SkillLib.add(skills, s)) {
      case (#ok _) #ok;
      case (#err e) #err(e);
    }
  };

  public shared ({ caller }) func updateSkill(id : Text, s : SkillTypes.Skill) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    switch (SkillLib.update(skills, id, s)) {
      case (#ok _) #ok;
      case (#err e) #err(e);
    }
  };

  public shared ({ caller }) func deleteSkill(id : Text) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    switch (SkillLib.remove(skills, id)) {
      case (#ok _) #ok;
      case (#err e) #err(e);
    }
  };
};
