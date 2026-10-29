import { CareerRole } from "@/types";
import { MASTER_SKILLS } from "./skills";

const getSkills = (ids: string[]) =>
  MASTER_SKILLS.filter((s) => ids.includes(s.id));

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "full-stack",
    slug: "full-stack",
    title: "Full-Stack Web Engineering",
    shortDesc: "Ship modern reactive UIs, scalable APIs, and production deployments.",
    fullDesc:
      "Modern full-stack engineers don't just write HTML. They architect performant Next.js applications, design clean REST/GraphQL APIs, manage relational DBs with PostgreSQL & Prisma, and ship production containers.",
    category: "Full-Stack Web Development",
    accentColor: "#A855F7", // violet
    badgeText: "HOTTEST PLACEMENT ROLE",
    benchmarkHours: 320,
    averageSalary: "₹7.5 - ₹18 LPA ($75k - $120k)",
    demandTier: "VERY HIGH",
    coreSkills: getSkills([
      "ts",
      "js",
      "react",
      "nextjs",
      "tailwind",
      "nodejs",
      "postgres",
      "prisma",
      "git",
      "docker",
      "api-design",
      "auth",
    ]),
    commonPitfalls: [
      "Building 10 clone apps (Netflix, Spotify) without real database indexing or auth.",
      "Ignoring TypeScript strict mode and basic unit testing.",
      "Not deploying on real domains or using CI/CD preview branches.",
    ],
    careerPivotAdvice:
      "If pivoting with low CGPA, recruiters test your live portfolio. Two deployed, non-trivial full-stack apps with public GitHub repos outperform an 8.5 CGPA with empty GitHubs.",
  },
  {
    id: "data-ai",
    slug: "data-ai",
    title: "Data Science & Applied AI",
    shortDesc: "Transform raw telemetry into predictive models and production RAG pipelines.",
    fullDesc:
      "Bridge statistical analysis and state-of-the-art Generative AI. Master Python, Pandas, vector databases, prompt engineering, and operationalizing machine learning pipelines into live web applications.",
    category: "Data Science & AI",
    accentColor: "#FFE14D", // yellow
    badgeText: "HIGHEST SALARY UPSIDE",
    benchmarkHours: 360,
    averageSalary: "₹8.0 - ₹22 LPA ($85k - $135k)",
    demandTier: "CRITICAL",
    coreSkills: getSkills([
      "python",
      "pandas",
      "sql-analytics",
      "scikit",
      "pytorch",
      "llm-rag",
      "data-vis",
      "git",
      "docker",
      "api-design",
    ]),
    commonPitfalls: [
      "Submitting Kaggle Titanic/Iris notebooks on resumes — recruiters auto-reject this.",
      "Skipping advanced SQL window functions; 80% of technical screening rounds are SQL queries.",
      "Relying solely on black-box API wrappers without understanding embeddings or token limits.",
    ],
    careerPivotAdvice:
      "Build one end-to-end RAG system for a real domain (e.g. university syllabus query engine or legal document search) with evaluation metrics and benchmark latency.",
  },
  {
    id: "backend",
    slug: "backend",
    title: "Backend & Systems Architecture",
    shortDesc: "Architect resilient microservices, high-throughput pipelines, and ACID databases.",
    fullDesc:
      "The backbone of every enterprise. Backend specialists focus on data integrity, concurrency, caching strategies with Redis, message brokers (Kafka/RabbitMQ), and low-latency API contracts.",
    category: "Backend & Systems",
    accentColor: "#6366F1", // indigo
    badgeText: "MOST RESILIENT CAREER",
    benchmarkHours: 340,
    averageSalary: "₹8.0 - ₹20 LPA ($80k - $130k)",
    demandTier: "VERY HIGH",
    coreSkills: getSkills([
      "nodejs",
      "express",
      "postgres",
      "redis",
      "api-design",
      "auth",
      "microservices",
      "docker",
      "git",
      "dsa",
      "os-dbms",
    ]),
    commonPitfalls: [
      "Never load-testing endpoints with k6 or Apache Bench to see where connections pool fail.",
      "Storing passwords in plaintext or unhashed formats.",
      "Ignoring database transactions (ACID) and race conditions in financial/e-commerce endpoints.",
    ],
    careerPivotAdvice:
      "Create a distributed rate limiter or message queue worker that survives node crashes. Backends interviewers look for systems clarity over flashy UI.",
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    shortDesc: "Automate CI/CD pipelines, container orchestration, and multi-region AWS cloud.",
    fullDesc:
      "Ensure code goes from git commit to production zero-downtime deployment seamlessly. Master Linux internals, Docker, Kubernetes clusters, Terraform infrastructure, and observability.",
    category: "Cloud & DevOps",
    accentColor: "#FF5CAA", // hot pink
    badgeText: "ZERO COLLEGE SUPPLY (MASSIVE DEMAND)",
    benchmarkHours: 310,
    averageSalary: "₹9.0 - ₹21 LPA ($90k - $140k)",
    demandTier: "CRITICAL",
    coreSkills: getSkills([
      "docker",
      "k8s",
      "aws",
      "cicd",
      "linux",
      "iac",
      "git",
      "api-design",
    ]),
    commonPitfalls: [
      "Clicking through AWS console manually instead of writing declarative Terraform/IaC scripts.",
      "Not knowing basic Linux commands (grep, awk, htop, systemctl, journalctl).",
      "Running everything as root inside Docker containers without multi-stage builds.",
    ],
    careerPivotAdvice:
      "Colleges almost never teach Docker and Kubernetes deeply. A student who can demonstrate a multi-stage GitHub Actions pipeline into a live K8s cluster stands out immediately.",
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    title: "Cybersecurity & InfoSec",
    shortDesc: "Defend networks, audit web apps against OWASP Top 10, and hunt vulnerabilities.",
    fullDesc:
      "Become an ethical hacker or SOC defender. Understand network packet flows, reverse engineering, OWASP vulnerability exploitation and patch remediation, and security compliance.",
    category: "Cybersecurity & InfoSec",
    accentColor: "#10B981", // emerald
    badgeText: "RECESSION PROOF",
    benchmarkHours: 350,
    averageSalary: "₹8.0 - ₹19 LPA ($85k - $130k)",
    demandTier: "HIGH",
    coreSkills: getSkills([
      "net-sec",
      "owasp",
      "pen-testing",
      "linux-sec",
      "crypto",
      "linux",
      "git",
      "os-dbms",
    ]),
    commonPitfalls: [
      "Downloading script-kiddie tools without understanding the underlying TCP handshake.",
      "Ignoring web application basics (HTML, JS, HTTP headers) before attempting bug bounties.",
      "Failing to document findings with reproducible Proof of Concepts (PoCs).",
    ],
    careerPivotAdvice:
      "Rank on TryHackMe or HackTheBox and attach your profile link. Detailed write-ups of retired machines prove technical rigor regardless of your semester or marks.",
  },
];
