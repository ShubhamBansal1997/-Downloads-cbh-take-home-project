# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
Key points about the function from which my implementation is made.
1. By default candidate is always TRIVIAL_PARTITION_KEY
2. We always need a string value in the candidate so convert to string if it's not a string
3. If we chose event as the candidate key then we have to run hashing
4. Otherwise hashing is only executed when the candidate length is > MAX_PARTITION_KEY_LENGTH

In my implementation the key points I feel I improved:
1. Remove duplicate statements
   1. candidate = crypto.createHash("sha3-512").update(data).digest("hex");
   2. JSON.stringify(event)
2. Make the complex if else nest to simple if else, also remove extra else statements

