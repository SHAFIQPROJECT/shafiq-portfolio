import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MsgLib "../lib/messages";
import MsgTypes "../types/messages";

mixin (
  accessControlState : AccessControl.AccessControlState,
  messages : Map.Map<Text, MsgTypes.Message>,
) {
  public shared func submitContactForm(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async { #ok; #err : Text } {
    MsgLib.submit(messages, name, email, subject, message)
  };

  public query ({ caller }) func getMessages() : async [MsgTypes.Message] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return []
    };
    MsgLib.getAll(messages)
  };

  public shared ({ caller }) func markMessageRead(id : Text) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    MsgLib.markRead(messages, id)
  };

  public shared ({ caller }) func deleteMessage(id : Text) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    MsgLib.remove(messages, id)
  };
};
