import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  accessControlState : AccessControl.AccessControlState,
  resumeFileId : { var value : ?Text },
) {
  public query func getResumeFileId() : async ?Text {
    resumeFileId.value
  };

  public shared ({ caller }) func setResumeFileId(fileId : Text) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    resumeFileId.value := ?fileId;
    #ok
  };
};
