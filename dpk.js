const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const generateHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const deterministicPartitionKey = (event) => {

  if(!event) return TRIVIAL_PARTITION_KEY;

  let candidate = event.partitionKey ?? generateHash(JSON.stringify(event));

  if(typeof candidate !== "string") candidate = JSON.stringify(candidate);
  if(candidate.length > MAX_PARTITION_KEY_LENGTH) candidate = generateHash(candidate);

  return candidate;
};

module.exports = {
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
  generateHash,
  deterministicPartitionKey,
}
