import Map "mo:core/Map";
import ProjectTypes "../types/projects";

module {
  public type Project = ProjectTypes.Project;

  public func getAll(projects : Map.Map<Text, Project>) : [Project] {
    var result : [Project] = [];
    for ((_, p) in projects.entries()) {
      result := result.concat([p]);
    };
    result
  };

  public func getFeatured(projects : Map.Map<Text, Project>) : [Project] {
    var result : [Project] = [];
    for ((_, p) in projects.entries()) {
      if (p.featured) {
        result := result.concat([p]);
      };
    };
    result
  };

  public func add(projects : Map.Map<Text, Project>, p : Project) : { #ok; #err : Text } {
    switch (projects.get(p.id)) {
      case (?_) { #err("Project with id '" # p.id # "' already exists") };
      case null {
        projects.add(p.id, p);
        #ok
      };
    }
  };

  public func update(projects : Map.Map<Text, Project>, id : Text, p : Project) : { #ok; #err : Text } {
    switch (projects.get(id)) {
      case null { #err("Project '" # id # "' not found") };
      case (?_) {
        projects.add(id, p);
        #ok
      };
    }
  };

  public func remove(projects : Map.Map<Text, Project>, id : Text) : { #ok; #err : Text } {
    if (not projects.containsKey(id)) {
      #err("Project '" # id # "' not found")
    } else {
      projects.remove(id);
      #ok
    }
  };
};
