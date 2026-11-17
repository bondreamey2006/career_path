import { ProblemSolvingQuestion } from "@/types";

export const PROBLEM_SOLVING_QUESTIONS: ProblemSolvingQuestion[] = [
  // ==========================================
  // PILLAR 1: ALGORITHMIC THINKING
  // ==========================================
  {
    id: "algo-1",
    dimension: "algorithmic",
    dimensionTitle: "Algorithmic Pattern Recognition",
    title: "Contiguous Subarray With Target Sum",
    scenario:
      "You are given a stream of 10,000,000 positive integers and a target sum K. You must find the length of the shortest contiguous subarray whose sum is at least K. The memory limit is strictly O(1) auxiliary space.",
    codeSnippet: `// Input: nums = [2, 3, 1, 2, 4, 3], target = 7
// Output: 2 (the subarray [4, 3] has the minimal length)`,
    difficulty: "CORE",
    options: [
      {
        id: "opt-1a",
        text: "Dynamic Programming table with memoization (O(N^2) time, O(N) space)",
        isCorrect: false,
        explanation:
          "Violates the O(1) auxiliary space constraint and O(N^2) will time out for 10M records.",
      },
      {
        id: "opt-1b",
        text: "Dynamic Variable-Size Sliding Window with two pointers (O(N) time, O(1) space)",
        isCorrect: true,
        explanation:
          "Since all integers are positive, expanding the right pointer monotonically increases the sum, and shrinking the left pointer monotonically decreases it. This guarantees O(N) time and O(1) auxiliary space.",
      },
      {
        id: "opt-1c",
        text: "Sorting the array first with QuickSort, then binary searching (O(N log N) time, O(1) space)",
        isCorrect: false,
        explanation:
          "Sorting destroys the contiguous order of subarrays, making it impossible to identify the original sequence.",
      },
      {
        id: "opt-1d",
        text: "Breadth-First Search on a state graph (O(2^N) time, O(N) space)",
        isCorrect: false,
        explanation:
          "BFS on subsets introduces exponential branching and immediately causes Out-Of-Memory errors.",
      },
    ],
  },
  {
    id: "algo-2",
    dimension: "algorithmic",
    dimensionTitle: "Algorithmic Pattern Recognition",
    title: "Package Dependency Build Order & Cycle Detection",
    scenario:
      "A monorepo has 450 interdependent packages. Before running the compiler, you must determine a linear compilation order such that every dependency builds before the package that depends on it. If a circular dependency exists (e.g. A -> B -> C -> A), the system must reject the build immediately.",
    difficulty: "CRITICAL",
    options: [
      {
        id: "opt-2a",
        text: "Topological Sort using Kahn's Algorithm (in-degree tracking) or Post-order DFS with cycle coloring",
        isCorrect: true,
        explanation:
          "Topological sorting on a Directed Acyclic Graph (DAG) executes in O(V + E) time. If the number of processed nodes is less than V, a cycle is deterministically detected.",
      },
      {
        id: "opt-2b",
        text: "Dijkstra's Shortest Path Algorithm computing minimum weights between nodes",
        isCorrect: false,
        explanation:
          "Dijkstra's algorithm finds weighted shortest paths, not DAG topological orderings, and fails to identify cycle structures.",
      },
      {
        id: "opt-2c",
        text: "Union-Find (Disjoint Set) with rank and path compression",
        isCorrect: false,
        explanation:
          "Standard Union-Find detects cycles in undirected graphs, but fails to preserve directionality and cannot produce a linear compilation sequence for directed dependencies.",
      },
      {
        id: "opt-2d",
        text: "Depth-First Search without cycle visit states",
        isCorrect: false,
        explanation:
          "Without three-state node coloring (UNVISITED, VISITING, VISITED), a cyclic graph will trigger an infinite recursive stack overflow.",
      },
    ],
  },
  {
    id: "algo-3",
    dimension: "algorithmic",
    dimensionTitle: "Algorithmic Pattern Recognition",
    title: "Minimizing Maximum Latency (Binary Search on Answer Space)",
    scenario:
      "You have N backend workers and M batch jobs of variable durations. You must distribute all jobs among the workers such that the maximum total time allocated to any single worker is minimized. The jobs must be assigned in contiguous order.",
    difficulty: "ADVANCED",
    options: [
      {
        id: "opt-3a",
        text: "Binary Search on the Answer Space [max(jobs), sum(jobs)] paired with a greedy feasibility validator",
        isCorrect: true,
        explanation:
          "The search space for the bottleneck workload is monotonic: if workload W is feasible with M workers, any W' > W is also feasible. Binary searching the target capacity in O(N log(sum)) is the gold standard pattern.",
      },
      {
        id: "opt-3b",
        text: "Greedy round-robin assignment sorted by descending duration",
        isCorrect: false,
        explanation:
          "Greedy allocation does not guarantee contiguous partitioning and yields sub-optimal solutions.",
      },
      {
        id: "opt-3c",
        text: "Brute-force recursion checking all (N-1) choose (M-1) partition split points",
        isCorrect: false,
        explanation:
          "Combinatorial explosion makes this computationally impossible for N > 30.",
      },
      {
        id: "opt-3d",
        text: "Floyd-Warshall all-pairs shortest paths algorithm",
        isCorrect: false,
        explanation:
          "Floyd-Warshall is designed for dense graph distance matrices (O(V^3)), not contiguous workload partitioning.",
      },
    ],
  },

  // ==========================================
  // PILLAR 2: PRODUCTION DEBUGGING
  // ==========================================
  {
    id: "debug-1",
    dimension: "debugging",
    dimensionTitle: "Production Debugging",
    title: "Async Race Condition in Financial Ledger Balance",
    scenario:
      "A fintech API allows concurrent wallet transfers. Under high load, users report that two simultaneous transfers of $50 from a $60 account both succeed, leaving a negative balance (-$40). Review the snippet below and isolate the root cause.",
    codeSnippet: `async function transfer(userId, amount) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (user.balance >= amount) {
    // Artificial delay or network pause here
    await db.user.update({
      where: { id: userId },
      data: { balance: user.balance - amount },
    });
    return { success: true };
  }
  return { success: false, error: "Insufficient funds" };
}`,
    difficulty: "CRITICAL",
    options: [
      {
        id: "opt-d1a",
        text: "Missing input validation: amount is not checked to be greater than 0",
        isCorrect: false,
        explanation:
          "While important, this does not explain why two concurrent valid $50 deductions succeed.",
      },
      {
        id: "opt-d1b",
        text: "Time-of-Check to Time-of-Use (TOCTOU) race condition without database row-level locking or atomic decrement",
        isCorrect: true,
        explanation:
          "Both requests read `balance = 60` concurrently before either executes the update. You must use atomic decrement (`UPDATE user SET balance = balance - $amount WHERE id = $id AND balance >= $amount`) or a Serializable transaction with `SELECT FOR UPDATE`.",
      },
      {
        id: "opt-d1c",
        text: "JavaScript's single-threaded event loop prevents asynchronous database operations",
        isCorrect: false,
        explanation:
          "The event loop executes JavaScript synchronously, but asynchronous I/O allows interleaved interleaved reads and writes against the database.",
      },
      {
        id: "opt-d1d",
        text: "db.user.update does not return a Promise",
        isCorrect: false,
        explanation:
          "Prisma and modern ORMs always return Promises. The issue is concurrency isolation, not return types.",
      },
    ],
  },
  {
    id: "debug-2",
    dimension: "debugging",
    dimensionTitle: "Production Debugging",
    title: "SQL N+1 Bottleneck in Feed Generation",
    scenario:
      "A student portfolio dashboard endpoint takes 4,800ms to load 50 posts. The database telemetry log reveals 51 separate SQL queries firing sequentially for a single HTTP request. What is occurring and how do you resolve it?",
    codeSnippet: `const posts = await db.post.findMany({ take: 50 });
for (const post of posts) {
  post.author = await db.user.findUnique({ where: { id: post.authorId } });
}`,
    difficulty: "CORE",
    options: [
      {
        id: "opt-d2a",
        text: "The database connection pool is full; increase max connections from 10 to 100",
        isCorrect: false,
        explanation:
          "Increasing the connection pool masks the symptom without fixing the underlying unbatched sequential queries.",
      },
      {
        id: "opt-d2b",
        text: "N+1 query anti-pattern: replace the iterative loop with eager SQL JOIN or ORM relation inclusion (`include: { author: true }`)",
        isCorrect: true,
        explanation:
          "Fetching 50 records in loop results in 1 query for the list + 50 queries for the authors (N+1). Using an INNER/LEFT JOIN or `include` executes in a single optimized query or batched `WHERE id IN (...)`.",
      },
      {
        id: "opt-d2c",
        text: "Change `findUnique` to `findFirst` to bypass index lookup overhead",
        isCorrect: false,
        explanation:
          "`findFirst` provides no performance benefit and still executes 50 distinct network roundtrips.",
      },
      {
        id: "opt-d2d",
        text: "Wrap the loop in a try/catch block to suppress latency errors",
        isCorrect: false,
        explanation:
          "Try/catch does nothing to fix database I/O overhead.",
      },
    ],
  },
  {
    id: "debug-3",
    dimension: "debugging",
    dimensionTitle: "Production Debugging",
    title: "Node.js Process Memory Leak Under WebSocket Load",
    scenario:
      "A live chat service's RSS memory grows monotonically by 25MB/hour until the container crashes with `JavaScript heap out of memory`. The garbage collector runs constantly at 99% CPU. What is the most probable architectural culprit?",
    difficulty: "ADVANCED",
    options: [
      {
        id: "opt-d3a",
        text: "Accumulating dangling event listeners on a shared singleton emitter or uncleaned closures in client disconnect handlers",
        isCorrect: true,
        explanation:
          "Registering `emitter.on('event', fn)` for every connecting client without calling `emitter.off` on socket disconnect retains closures and all referenced client context in memory permanently.",
      },
      {
        id: "opt-d3b",
        text: "Using `const` instead of `let` inside loop bodies",
        isCorrect: false,
        explanation:
          "`const` has block scope and has zero negative impact on heap memory retention.",
      },
      {
        id: "opt-d3c",
        text: "JSON.stringify() leaks memory by default in modern V8 engines",
        isCorrect: false,
        explanation:
          "JSON.stringify is a native C++ method and frees its memory immediately once serialization completes.",
      },
      {
        id: "opt-d3d",
        text: "Running Node.js in production mode instead of development mode",
        isCorrect: false,
        explanation:
          "Production mode optimizes memory and performance. It does not introduce memory leaks.",
      },
    ],
  },

  // ==========================================
  // PILLAR 3: DECISION-MAKING & TRADE-OFFS
  // ==========================================
  {
    id: "decide-1",
    dimension: "decision-making",
    dimensionTitle: "Engineering Decision-Making",
    title: "High-Traffic Cache Invalidation Strategy",
    scenario:
      "An e-commerce flash sale endpoint handles 20,000 requests/second for 10 hot product items. You are introducing a Redis caching layer. How do you prevent a 'Thundering Herd' (cache stampede) when the 60-second TTL expires?",
    difficulty: "CRITICAL",
    options: [
      {
        id: "opt-dec1a",
        text: "Set the TTL to Infinity and never invalidate the cache",
        isCorrect: false,
        explanation:
          "Users will see stale stock counts and out-of-stock items will continue to be ordered.",
      },
      {
        id: "opt-dec1b",
        text: "Implement Mutex Locking (single-flight) or Probabilistic Early Expiration (XFetch algorithm) combined with background revalidation",
        isCorrect: true,
        explanation:
          "When the cache key nears expiration or misses, only one worker acquires a lock to regenerate the database response while others serve stale-while-revalidate data, preventing 20,000 concurrent database queries.",
      },
      {
        id: "opt-dec1c",
        text: "Reduce the TTL from 60 seconds to 500 milliseconds",
        isCorrect: false,
        explanation:
          "Reducing TTL increases the frequency of cache stampedes and overloads the database even further.",
      },
      {
        id: "opt-dec1d",
        text: "Move Redis to the client browser's localStorage",
        isCorrect: false,
        explanation:
          "Browser localStorage cannot serve as a shared multi-user cache for real-time inventory counts.",
      },
    ],
  },
  {
    id: "decide-2",
    dimension: "decision-making",
    dimensionTitle: "Engineering Decision-Making",
    title: "Database Choice: Relational PostgreSQL vs Document Store",
    scenario:
      "You are designing the core ledger for an enterprise student tuition fee & refund management platform. Transactions involve multi-table ledger balancing, strict audit logs, zero partial writes, and complex reporting aggregations. Which database paradigm represents the appropriate engineering trade-off?",
    difficulty: "CORE",
    options: [
      {
        id: "opt-dec2a",
        text: "PostgreSQL: ACID compliance, foreign key relational integrity, check constraints, and serializable isolation",
        isCorrect: true,
        explanation:
          "Financial accounting demands strict schema constraints, foreign key referential integrity, and ACID guarantees where half-completed writes can lead to severe balance discrepancies.",
      },
      {
        id: "opt-dec2b",
        text: "MongoDB: Schemaless flexibility to dump unstructured transaction payloads into one document",
        isCorrect: false,
        explanation:
          "Financial ledgers require strict schema enforcement. Lack of foreign key enforcement makes audit tracking prone to orphan records.",
      },
      {
        id: "opt-dec2c",
        text: "SQLite running on ephemeral serverless lambda containers",
        isCorrect: false,
        explanation:
          "Ephemeral containers lose local filesystem SQLite files across cold restarts and cannot handle concurrent distributed writes.",
      },
      {
        id: "opt-dec2d",
        text: "A flat JSON file stored in AWS S3 with manual string replaces",
        isCorrect: false,
        explanation:
          "Completely lacks concurrency controls, locking, indexing, and atomicity.",
      },
    ],
  },
  {
    id: "decide-3",
    dimension: "decision-making",
    dimensionTitle: "Engineering Decision-Making",
    title: "API Rate Limiting Under Distributed DDoS Pressure",
    scenario:
      "Your authentication endpoint (`POST /api/auth/login`) is being attacked with credential stuffing. You must enforce a limit of 5 login attempts per minute per IP address across 12 autoscaling backend server instances.",
    difficulty: "CRITICAL",
    options: [
      {
        id: "opt-dec3a",
        text: "In-memory JavaScript Map object stored inside each Node.js process instance",
        isCorrect: false,
        explanation:
          "With 12 instances, round-robin load balancers will route attackers to different servers, effectively allowing 12x the intended limit (60 attempts/minute).",
      },
      {
        id: "opt-dec3b",
        text: "Centralized Redis Token Bucket or Sliding Window Log via atomic Redis Lua scripts",
        isCorrect: true,
        explanation:
          "Redis acts as a shared, sub-millisecond in-memory data store across all 12 instances. Atomic Lua scripts prevent race conditions between read and increment operations.",
      },
      {
        id: "opt-dec3c",
        text: "Cron job running every 60 seconds that truncates the auth logs table",
        isCorrect: false,
        explanation:
          "Periodic cron jobs do not provide real-time per-request rate-limiting and destroy security audit logs.",
      },
      {
        id: "opt-dec3d",
        text: "Client-side `setTimeout` on the Submit button",
        isCorrect: false,
        explanation:
          "Attackers bypass browser JavaScript completely via curl or automated Python bot scripts.",
      },
    ],
  },
];
