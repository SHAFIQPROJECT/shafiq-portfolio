module {
  public type Project = {
    id : Text;
    title : Text;
    description : Text;
    techStack : [Text];
    githubUrl : Text;
    demoUrl : Text;
    category : Text;
    imageUrl : Text;
    featured : Bool;
    order : Nat;
  };
};
