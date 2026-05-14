import Map "mo:core/Map";
import SkillTypes "../types/skills";

module {
  public type Skill = SkillTypes.Skill;

  public func getAll(skills : Map.Map<Text, Skill>) : [Skill] {
    var result : [Skill] = [];
    for ((_, s) in skills.entries()) {
      result := result.concat([s]);
    };
    result
  };

  public func add(skills : Map.Map<Text, Skill>, s : Skill) : { #ok; #err : Text } {
    switch (skills.get(s.id)) {
      case (?_) { #err("Skill with id '" # s.id # "' already exists") };
      case null {
        skills.add(s.id, s);
        #ok
      };
    }
  };

  public func update(skills : Map.Map<Text, Skill>, id : Text, s : Skill) : { #ok; #err : Text } {
    switch (skills.get(id)) {
      case null { #err("Skill '" # id # "' not found") };
      case (?_) {
        skills.add(id, s);
        #ok
      };
    }
  };

  public func remove(skills : Map.Map<Text, Skill>, id : Text) : { #ok; #err : Text } {
    if (not skills.containsKey(id)) {
      #err("Skill '" # id # "' not found")
    } else {
      skills.remove(id);
      #ok
    }
  };
};
