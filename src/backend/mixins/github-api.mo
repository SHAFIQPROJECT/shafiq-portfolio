import OutCall "mo:caffeineai-http-outcalls/outcall";
import Error "mo:core/Error";

mixin () {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared func getGithubStats(username : Text) : async { #ok : Text; #err : Text } {
    try {
      let url = "https://api.github.com/users/" # username;
      let headers : [OutCall.Header] = [
        { name = "User-Agent"; value = "portfolio-canister" },
        { name = "Accept"; value = "application/vnd.github.v3+json" },
      ];
      let result = await OutCall.httpGetRequest(url, headers, transform);
      #ok(result);
    } catch (e) {
      #err("GitHub API request failed: " # e.message());
    };
  };

  public shared func getGithubRepos(username : Text) : async { #ok : Text; #err : Text } {
    try {
      let url = "https://api.github.com/users/" # username # "/repos?per_page=10&sort=updated";
      let headers : [OutCall.Header] = [
        { name = "User-Agent"; value = "portfolio-canister" },
        { name = "Accept"; value = "application/vnd.github.v3+json" },
      ];
      let result = await OutCall.httpGetRequest(url, headers, transform);
      #ok(result);
    } catch (e) {
      #err("GitHub API request failed: " # e.message());
    };
  };
};
