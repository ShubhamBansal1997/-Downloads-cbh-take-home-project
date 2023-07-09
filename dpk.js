const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let runHash = false;
  let candidate = TRIVIAL_PARTITION_KEY;
  if(event) {
    if (event.partitionKey) {
        candidate = event.partitionKey;
    } else {
        candidate = event;
        runHash = true;
    }
  }
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH || runHash) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};