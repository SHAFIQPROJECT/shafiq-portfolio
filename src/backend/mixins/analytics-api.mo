import AccessControl "mo:caffeineai-authorization/access-control";
import AnalyticsLib "../lib/analytics";
import AnalyticsTypes "../types/analytics";

mixin (
  accessControlState : AccessControl.AccessControlState,
  analyticsState : AnalyticsLib.AnalyticsState,
) {
  public shared func trackVisit() : async () {
    AnalyticsLib.trackVisit(analyticsState)
  };

  public query ({ caller }) func getAnalytics() : async AnalyticsTypes.Analytics {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return { totalVisits = 0; pageViews = 0; lastUpdated = 0 }
    };
    AnalyticsLib.toPublic(analyticsState)
  };
};
