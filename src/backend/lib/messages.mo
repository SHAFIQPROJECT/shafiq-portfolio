import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import MsgTypes "../types/messages";

module {
  public type Message = MsgTypes.Message;

  public func submit(
    messages : Map.Map<Text, Message>,
    name : Text,
    email : Text,
    subject : Text,
    body : Text,
  ) : { #ok; #err : Text } {
    let now = Time.now();
    let id = "msg-" # now.toText();
    let msg : Message = {
      id = id;
      name = name;
      email = email;
      subject = subject;
      message = body;
      timestamp = now;
      read = false;
    };
    messages.add(id, msg);
    #ok
  };

  public func getAll(messages : Map.Map<Text, Message>) : [Message] {
    var result : [Message] = [];
    for ((_, m) in messages.entries()) {
      result := result.concat([m]);
    };
    // sort descending by timestamp
    result.sort(func(a : Message, b : Message) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    })
  };

  public func markRead(messages : Map.Map<Text, Message>, id : Text) : { #ok; #err : Text } {
    switch (messages.get(id)) {
      case null { #err("Message '" # id # "' not found") };
      case (?m) {
        let updated : Message = { m with read = true };
        messages.add(id, updated);
        #ok
      };
    }
  };

  public func remove(messages : Map.Map<Text, Message>, id : Text) : { #ok; #err : Text } {
    if (not messages.containsKey(id)) {
      #err("Message '" # id # "' not found")
    } else {
      messages.remove(id);
      #ok
    }
  };
};
