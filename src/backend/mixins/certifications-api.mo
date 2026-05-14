import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import CertLib "../lib/certifications";
import CertTypes "../types/certifications";

mixin (
  accessControlState : AccessControl.AccessControlState,
  certs : Map.Map<Text, CertTypes.Certification>,
) {
  public query func getCertifications() : async [CertTypes.Certification] {
    CertLib.getAll(certs)
  };

  public shared ({ caller }) func addCertification(c : CertTypes.Certification) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    CertLib.add(certs, c)
  };

  public shared ({ caller }) func updateCertification(id : Text, c : CertTypes.Certification) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    CertLib.update(certs, id, c)
  };

  public shared ({ caller }) func deleteCertification(id : Text) : async { #ok; #err : Text } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return #err("Unauthorized")
    };
    CertLib.remove(certs, id)
  };
};
