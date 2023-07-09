const { deterministicPartitionKey,TRIVIAL_PARTITION_KEY,generateHash } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("should returns trivial partition key, when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });


  it("should return trivial partition key for undefined event", () => {
    expect(deterministicPartitionKey(undefined)).toEqual(TRIVIAL_PARTITION_KEY);
  });

  it("should return trivial partition key for null event", () => {
    expect(deterministicPartitionKey(null)).toEqual(TRIVIAL_PARTITION_KEY);
  });

  it("should return a hashed value when event is a string", () => {
    const MOCK_STRING = "abc";
    const hash = generateHash(JSON.stringify(MOCK_STRING));

    expect(deterministicPartitionKey(MOCK_STRING)).toEqual(hash);
  });

  it("should return a hashed value if partition key is null", () => {
    const event = { partitionKey: null };
    const hash = generateHash(JSON.stringify(event));
    expect(deterministicPartitionKey(event)).toEqual(hash);
  });

  it("should return the provided partitionKey if it's a string and length is within limit", () => {
    const event = { partitionKey: "P-KEY" };
    expect(deterministicPartitionKey(event)).toEqual("P-KEY");
  });

  it("should return a hashed value if the provided partitionKey is a string but length exceeds limit", () => {
    const longString = "KEY".repeat(257);
    const event = { partitionKey: longString };
    const hash = generateHash(longString);
    expect(deterministicPartitionKey(event)).toEqual(hash);
  });

  it("should return a stringified if the partitionKey is not a string", () => {
    const event = { partitionKey: { k1: 'a', k2: 'b' } };
    const stringified = JSON.stringify(event.partitionKey);
    expect(deterministicPartitionKey(event)).toEqual(stringified);
  });

  it("should return a hashed value of the event object if no partitionKey is provided", () => {
    const event = { k1: 'a', k2: 'b' };
    const stringified = JSON.stringify(event);
    const hash = generateHash(stringified);
    expect(deterministicPartitionKey(event)).toEqual(hash);
  });

  it("should return stringified partitionKey when it's a long number", () => {
    const event = { partitionKey: 12345678901234567890123456789012345678901234567890 };
    const stringified = JSON.stringify(event.partitionKey);
    expect(deterministicPartitionKey(event)).toEqual(stringified);
  });

  it("should return stringified partitionKey when it's a boolean", () => {
    const event = { partitionKey: true };
    const stringified = JSON.stringify(event.partitionKey);
    expect(deterministicPartitionKey(event)).toEqual(stringified);
  });

  it("should return stringified partitionKey when it's an array", () => {
    const event = { partitionKey: [1, 2, 3, 4] };
    const stringified = JSON.stringify(event.partitionKey);
    expect(deterministicPartitionKey(event)).toEqual(stringified);
  });

  it("should return stringified partitionKey when it's an object", () => {
    const event = { partitionKey: { k1: 'a', k2: 'b' }};
    const stringified = JSON.stringify(event.partitionKey);
    expect(deterministicPartitionKey(event)).toEqual(stringified);
  });

  

});
