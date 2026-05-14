import CommonTypes "common";

module {
  public type Analytics = {
    totalVisits : Nat;
    pageViews : Nat;
    lastUpdated : CommonTypes.Timestamp;
  };
};
