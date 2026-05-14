module {
  public type Config = {
    apiKey : Text;
  };

  public type ChatMessage = {
    role : Text;
    content : Text;
  };

  public func configForKey(key : Text) : Config {
    { apiKey = key }
  };
}
