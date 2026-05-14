import Time "mo:core/Time";
import AnalyticsTypes "../types/analytics";

module {
  public type Analytics = AnalyticsTypes.Analytics;
  public type AnalyticsState = { var totalVisits : Nat; var pageViews : Nat; var lastUpdated : Int };

  public func initState() : AnalyticsState {
    { var totalVisits = 0; var pageViews = 0; var lastUpdated = Time.now() }
  };

  public func trackVisit(state : AnalyticsState) : () {
    state.totalVisits += 1;
    state.pageViews += 1;
    state.lastUpdated := Time.now();
  };

  public func toPublic(state : AnalyticsState) : Analytics {
    {
      totalVisits = state.totalVisits;
      pageViews = state.pageViews;
      lastUpdated = state.lastUpdated;
    }
  };
};
