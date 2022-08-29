const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal '0' when given null event", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });
  it("Returns the hex value when given event without partitionKey is passed", () => {
    const trivialKey = deterministicPartitionKey({"test": 123});
    expect(trivialKey).toBe("1b9f8d070a7e35531de189af81d8f3e3ad17ea7d013a1ef0369381130c3f6dc40354ab90947b98b9340952d4fc93ed44c35fb89a2373f5df21f05924c2be2a91");
  });
  it("Returns the hex value when given event with partitionKey (string) (> MAX_PARTITION_KEY_LENGTH) is passed", () => {
    const trivialKey = deterministicPartitionKey({"partitionKey": "1b9f8d070a7e35531de189af81d8f3e3ad17ea7d013a1ef0369381130c3f6dc40354ab90947b98b9340952d4fc93ed44c35fb89a2373f5df21f05924c2be2a911b9f8d070a7e35531de189af81d8f3e3ad17ea7d013a1ef0369381130c3f6dc40354ab90947b98b9340952d4fc93ed44c35fb89a2373f5df21f05924c2be2a911b9f8d070a7e35531de189af81d8f3e3ad17ea7d013a1ef0369381130c3f6dc40354ab90947b98b9340952d4fc93ed44c35fb89a2373f5df21f05924c2be2a91"});
    expect(trivialKey).toBe("c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9");
  });
  it("Returns the hex value when given event with partitionKe (string) (< MAX_PARTITION_KEY_LENGTH) is passed", () => {
    const trivialKey = deterministicPartitionKey({"partitionKey": "c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9"});
    expect(trivialKey).toBe("c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9");
  });
  it("Returns the hex value when given event with partitionKey (object) (< MAX_PARTITION_KEY_LENGTH) is passed", () => {
    const trivialKey = deterministicPartitionKey({"partitionKey": {"test": "c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9"}});
    expect(trivialKey).toBe("{\"test\":\"c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9\"}");
  });
  it("Returns the hex value when given event with partitionKey (object) (> MAX_PARTITION_KEY_LENGTH) is passed", () => {
    const trivialKey = deterministicPartitionKey({"partitionKey": {"test": "c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9c3d631083976bc21ce893693fc2507dae733e9b28a17e157fc7c92bdae0de4299d0b4a64eced2bb7c599bd7eb328f60aa2a6a5804e8348795f7176b3c65aeca9"}});
    expect(trivialKey).toBe("a8366e50596341cf56b902345f8f877d34c4eb09b6ed8b7943d0599bc294f8d0bb156a48e52ef3f3f2008e3f9bc748ed7320de6487029d397a2f44deded9592a");
  });
});
