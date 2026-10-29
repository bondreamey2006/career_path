import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

const mentorSchema = z.object({
  messages: z.array(messageSchema).min(1, "At least one message is required"),
  profile: z
    .object({
      targetRole: z.string().optional(),
      cgpa: z.number().optional(),
      backlogs: z.number().optional(),
      semester: z.number().optional(),
      currentSkills: z.array(z.string()).optional(),
    })
    .optional(),
});

function getDeterministicReply(
  userQuery: string,
  profile?: {
    targetRole?: string;
    cgpa?: number;
    backlogs?: number;
    semester?: number;
  }
): { reply: string; suggestions: string[] } {
  const q = userQuery.toLowerCase();
  const backlogs = profile?.backlogs ?? 1;
  const cgpa = profile?.cgpa ?? 6.8;
  const role = profile?.targetRole || "Full-Stack Web Engineering";
  const sem = profile?.semester ?? 5;

  if (q.includes("backlog") || q.includes("kt") || q.includes("failed") || q.includes("exam")) {
    return {
      reply: `Here's the raw truth from someone who's seen hundreds of students panic: having ${backlogs > 0 ? `${backlogs} backlog(s)` : "backlogs"} in Semester ${sem} is stressful, but it only ruins your career if you let it freeze you.\n\nHere is your 3-step recovery playbook:\n\n1. **Stop studying the entire book**: Engineering exam boards recycle 60% of question patterns. Grab the last 5 years of semester question papers right now. Mark repeated derivations and algorithms. That guarantees your 40-mark passing baseline.\n\n2. **The 65/35 Split Rule**: If you have active backlogs, give 65% of your weekly study time to exam clearance and 35% to building software for ${role}. Never do 100% academics — if you clear exams with an empty GitHub, you'll still be unhirable at placement season.\n\n3. **Clear in the Next Supplementary Window**: Treat the next supplementary exam like a final boss. Kill the backlog, get the clean marksheet, and the psychological weight lifts immediately.`,
      suggestions: [
        "How do I balance backlog prep with learning React/Node?",
        "Will companies with 60% cutoffs reject me automatically?",
        "What should I say about my backlogs in an interview?",
      ],
    };
  }

  if (q.includes("cgpa") || q.includes("marks") || q.includes("cutoff") || q.includes("criteria")) {
    return {
      reply: `Let's talk about CGPA honestly. Your current CGPA is ~${cgpa}.\n\n- **Campus Mass Recruiters (TCS, Infosys, Wipro)**: Often enforce hard 60% (6.0 or 6.5) cutoffs. If you are above 6.5, you qualify for 80% of on-campus drives.\n- **Product Companies & Fast-Growing Startups**: Care 10x more about what you have deployed than whether you got an 8.9 in Engineering Graphics. A live Vercel link with authentic auth, PostgreSQL, and clean TypeScript will get you invited to interviews while 9.0 CGPA students with To-Do list apps get skipped.\n\n**Action Item**: Aim to stabilize your CGPA at or above 7.0 for exam safety, then let your GitHub do the heavy lifting.`,
      suggestions: [
        "How do I reach out to startup founders directly on Twitter/LinkedIn?",
        "What projects actually impress recruiters in 2026?",
        "Show me the 12-week academic vs upskilling split.",
      ],
    };
  }

  if (q.includes("project") || q.includes("portfolio") || q.includes("build") || q.includes("github")) {
    return {
      reply: `Stop building generic YouTube tutorial clones. No recruiter wants to see another Netflix clone, Spotify clone, or Weather App. They know you just copied a video.\n\nFor **${role}**, build these two specific things:\n\n1. **The 'System' Project**: Something with real data integrity. A multi-tenant collaborative tool, a distributed task queue with Redis, or an analytics dashboard handling 10,000 mock events with PostgreSQL indexing. Make sure you write a comprehensive README explaining architectural trade-offs.\n\n2. **The 'Solved Problem' Project**: Build a tool for your campus or local community. An anonymous backlog discussion board, an automated syllabus tracker, or an event ticket scanner with QR codes.\n\n**Rule of Thumb**: If it doesn't have a live URL and a public GitHub repo with commit history over at least 3 weeks, it doesn't exist to recruiters.`,
      suggestions: [
        "What are common mistakes students make in their GitHub README?",
        "How do I write a good resume bullet point for a project?",
        "Which database should I use: MongoDB or PostgreSQL?",
      ],
    };
  }

  if (q.includes("dsa") || q.includes("leetcode") || q.includes("algorithm") || q.includes("coding")) {
    return {
      reply: `Do NOT fall into the trap of doing 600 LeetCode problems blindly. You don't have the luxury of time.\n\nInstead, master the **14 Core Patterns**:\n- Two Pointers & Sliding Window\n- Fast & Slow Pointers (Cycle detection)\n- Binary Search (on arrays and on answer spaces)\n- Breadth-First & Depth-First Search on Trees/Graphs\n- Top K Elements (Heaps)\n- 0/1 Knapsack & Basic 1D Dynamic Programming\n\nSolve 3-4 problems per pattern (roughly 60 problems total). Once you can recognize which pattern a problem maps to within 90 seconds, you are ready for 85% of company screening rounds.`,
      suggestions: [
        "Should I do DSA in C++, Java, or TypeScript/Python?",
        "How many hours per day should I spend on LeetCode?",
        "How do I explain my thought process during a live coding interview?",
      ],
    };
  }

  return {
    reply: `Let's keep it straight: breaking into **${role}** in Semester ${sem} with your current academic balance is completely doable if you stop procrastinating on tutorials and start shipping code.\n\nHere's what you need to lock down this week:\n- **Master the Stage 1 roadmap nodes**: Solidify language syntax and async fundamentals.\n- **Commit to 15-20 hours/week**: Consistency beats 14-hour weekend binge sessions that burn you out.\n- **Protect your exam baseline**: Don't let new backlogs creep in while building tech skills.\n\nWhat specific roadblock are you hitting today: technical concepts, time management, or interview confidence?`,
    suggestions: [
      "I have 3 backlogs. How do I plan the next 60 days?",
      "Can I get a high-paying role if my CGPA is under 7.0?",
      "Audit my resume for ATS keyword gaps.",
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = mentorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { messages, profile } = result.data;
    const latestUserMessage = messages[messages.length - 1].content;

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is present, attempt generative call
    if (apiKey && apiKey.trim().length > 0 && !apiKey.includes("your-gemini-key")) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `You are an experienced, pragmatic senior tech mentor on "CareerPath: Adaptive Career Recovery & Reinvention Platform".
You are mentoring a student in Semester ${profile?.semester || 5} pursuing ${profile?.targetRole || "Full-Stack Web Engineering"} with CGPA ${profile?.cgpa || 6.8} and ${profile?.backlogs || 0} backlogs.
Tone rules:
- Speak in an authentic, blunt, encouraging student-to-student voice.
- BANNED BUZZWORDS: Do NOT use "unleash", "elevate", "seamless", "supercharge", "revolutionize", or fluffy corporate jargon.
- Emphasize real proof-of-work: live URLs, public GitHub repositories, PostgreSQL schema discipline, and deterministic recovery.
- Format responses cleanly with bold headings and concise bullet points.
- Always include 3 short follow-up questions at the very end formatted as:
[SUGGESTIONS]
1. Question one
2. Question two
3. Question three`,
        });

        // Map messages into Gemini history format
        const history = messages.slice(0, -1).map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const chat = model.startChat({ history });
        const geminiRes = await chat.sendMessage(latestUserMessage);
        const fullText = geminiRes.response.text();

        // Extract suggestions if present
        let reply = fullText;
        const suggestions: string[] = [];

        if (fullText.includes("[SUGGESTIONS]")) {
          const parts = fullText.split("[SUGGESTIONS]");
          reply = parts[0].trim();
          const suggestionsText = parts[1];
          const lines = suggestionsText.split("\n");
          lines.forEach((l) => {
            const cleaned = l.replace(/^\d+\.\s*/, "").trim();
            if (cleaned.length > 0) suggestions.push(cleaned);
          });
        }

        if (suggestions.length === 0) {
          suggestions.push("How do I structure my GitHub README?");
          suggestions.push("What is the best way to handle backlog questions in interviews?");
          suggestions.push("Can you review my weekly study hours split?");
        }

        return NextResponse.json({
          success: true,
          reply,
          suggestions: suggestions.slice(0, 3),
          mode: "gemini",
        });
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to deterministic mentor:", geminiError);
        // Fall back gracefully to rule-based
      }
    }

    // Deterministic Rule-Based Fallback
    const fallback = getDeterministicReply(latestUserMessage, profile);
    return NextResponse.json({
      success: true,
      reply: fallback.reply,
      suggestions: fallback.suggestions,
      mode: "rule-based-fallback",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal mentor error" },
      { status: 500 }
    );
  }
}
