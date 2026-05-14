import Map "mo:core/Map";
import CertTypes "../types/certifications";

module {
  public type Certification = CertTypes.Certification;

  public func getAll(certs : Map.Map<Text, Certification>) : [Certification] {
    var result : [Certification] = [];
    for ((_, c) in certs.entries()) {
      result := result.concat([c]);
    };
    result
  };

  public func add(certs : Map.Map<Text, Certification>, c : Certification) : { #ok; #err : Text } {
    switch (certs.get(c.id)) {
      case (?_) { #err("Certification with id '" # c.id # "' already exists") };
      case null {
        certs.add(c.id, c);
        #ok
      };
    }
  };

  public func update(certs : Map.Map<Text, Certification>, id : Text, c : Certification) : { #ok; #err : Text } {
    switch (certs.get(id)) {
      case null { #err("Certification '" # id # "' not found") };
      case (?_) {
        certs.add(id, c);
        #ok
      };
    }
  };

  public func remove(certs : Map.Map<Text, Certification>, id : Text) : { #ok; #err : Text } {
    if (not certs.containsKey(id)) {
      #err("Certification '" # id # "' not found")
    } else {
      certs.remove(id);
      #ok
    }
  };
};
