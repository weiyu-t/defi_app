import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var cValue: Float = 200;
  // cValue := 200;

  public func topUp(amount: Float) {
    cValue += amount;
    Debug.print(debug_show(cValue));
  };

  public func withDraw(amount: Float) {
    let valueCheck: Float = cValue - amount;
    if (valueCheck >= 0) {
      cValue -= amount;
      Debug.print(debug_show(cValue));
    } else {
      Debug.print("invalid transaction happened");
    }
  };

  public query func balance(): async Float {
    return cValue;
  };

  stable var startTime = Time.now();
  // startTime := Time.now();
  Debug.print(debug_show(startTime));

  public func compound() {
    let currentTime = Time.now();
    let calTime = (currentTime - startTime) / 1000000000;
    cValue := cValue * (1.001 ** Float.fromInt(calTime));
    startTime := currentTime;
  }


};
