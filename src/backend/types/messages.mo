import CommonTypes "common";

module {
  public type Message = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : CommonTypes.Timestamp;
    read : Bool;
  };
};
