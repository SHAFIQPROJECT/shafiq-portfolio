import OutCall "mo:caffeineai-http-outcalls/outcall";
import AccessControl "mo:caffeineai-authorization/access-control";
import Error "mo:core/Error";

mixin (
  accessControlState : AccessControl.AccessControlState,
  openAIApiKey : { var value : ?Text },
) {
  public query func isOpenAIConfigured() : async Bool {
    openAIApiKey.value != null;
  };

  public shared ({ caller }) func setOpenAIKey(key : Text) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized: Only admins can set the OpenAI API key");
    };
    openAIApiKey.value := ?key;
    #ok;
  };

  public query func openAITransform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared func chatWithAI(
    message : Text,
    history : [{ role : Text; content : Text }],
  ) : async { #ok : Text; #err : Text } {
    let ?key = openAIApiKey.value else {
      return #err("OpenAI is not configured. Please ask the admin to set an API key.");
    };
    var messagesJson = "[{\"role\":\"system\",\"content\":\"You are an AI assistant on the portfolio website of A.Shafiq Ahamed, an AI & Data Science student at Sri Krishna College of Engineering and Technology. Help visitors learn about Shafiq's skills, projects, and background. Be friendly, professional, and concise.\"}";
    for (h in history.vals()) {
      messagesJson #= ",{\"role\":\"" # h.role # "\",\"content\":\"" # h.content # "\"}";
    };
    messagesJson #= ",{\"role\":\"user\",\"content\":\"" # message # "\"}]";
    let body = "{\"model\":\"gpt-4o-mini\",\"messages\":" # messagesJson # ",\"max_tokens\":500}";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # key },
      { name = "Content-Type"; value = "application/json" },
    ];
    try {
      let response = await OutCall.httpPostRequest(
        "https://api.openai.com/v1/chat/completions",
        headers,
        body,
        openAITransform,
      );
      #ok(response);
    } catch (e) {
      #err("Chat request failed: " # e.message());
    };
  };
};
