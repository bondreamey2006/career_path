# CareerPath: Adaptive Career Recovery & Reinvention Platform

> **Your Intelligent GPS for Career Recovery, Skill Growth, & Job Readiness.**  
> A high-impact Project-Based Learning (PBL) application engineered specifically for second-year (SY) and third-year (TY) college students balancing backlogs, low CGPA cutoffs, or aggressive career pivots into software engineering.

---

## 🎯 Design Direction: Neo-Brutalist (Strict)

CareerPath was designed by hand to feel authentic, tactile, and distinctively human—deliberately avoiding cookie-cutter AI SaaS templates:
- **Warm Canvas Palette**: Background in warm off-white/cream (`#F4F0E6`), borders and text in high-contrast near-black (`#0A0A0A`).
- **Saturated Flat Accents**: Electric Violet (`#A855F7`), Sunny Yellow (`#FFE14D`), Hot Pink (`#FF5CAA`), Indigo (`#6366F1`), and Emerald (`#10B981`, reserved strictly for readiness scores and progress).
- **Hard Offset Shadows**: `3px` solid black borders with `4px 4px 0 #0A0A0A` and `6px 6px 0 #0A0A0A` zero-blur offset drop shadows.
- **Punchy Typography**: Google Fonts **Space Grotesk** for massive headlines paired with **Space Mono** for telemetry readouts, badges, and labels.
- **Tactile Interactions**: Buttons translate toward their shadow on hover and flatten on press. Wobbly stickers, tape strips, starburst doodles, and dual infinite marquee strips.
- **Banned**: Gradients, soft box-shadows, blurred glassmorphism, dark navy SaaS backgrounds, and generic buzzwords like "unleash" or "revolutionize". Written in a direct, student-to-student voice.

---

## 🚀 Key Feature Engines

### 1. Interactive Career Roadmaps (`/roadmaps`)
- 5 comprehensive engineering domains:
  - **Full-Stack Web Engineering** (~320 hours)
  - **Data Science & Applied AI** (~360 hours)
  - **Backend & Systems Architecture** (~340 hours)
  - **Cloud & DevOps Engineering** (~310 hours)
  - **Cybersecurity & InfoSec** (~350 hours)
- 4 stages per path: Foundations → Core Stack → Production Capstone → Interview Defense.
- Interactive completion tracking persisted in `localStorage` with celebratory confetti triggers.

### 2. Skill Gap Analyzer (`/skill-gap`)
- Audit current skills against target role benchmarks via interactive checklist or by pasting raw resume text.
- Instant calculation of Role Fit Readiness Score (0-100%).
- Severity-ranked missing competencies (`CRITICAL`, `HIGH`, `MEDIUM`) with estimated learning hours and prioritized action steps.

### 3. Career Recovery & Backlog Balancer (`/recovery`)
- Input active backlogs, CGPA, semester, and available study hours.
- Computes deterministic academic risk tier (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`) and months to rebound.
- Generates a **12-week schedule** dynamically allocating hours between academic exam clearance and engineering upskilling.
- Features **Exam Shield Defense** during midterm and end-sem weeks (Weeks 7, 8, 11, 12).

### 4. What-If Career Readiness Simulator (`/simulator`)
- Interactive sliders for study hours/week and timeline horizon.
- Hand-crafted SVG growth curve modeling non-linear skill accumulation with realistic diminishing returns above 28 hours/week.
- Real-time forecast of exact estimated weeks to cross the 80% placement threshold.

### 5. AI Career Mentor & ATS Resume Screening (`/mentor`)
- **AI Mentor**: Tactical advice powered by Google's **Gemini 1.5 Flash** with persistent student context (backlogs, CGPA, target role).
- **Deterministic Rule-Based Fallback**: If `GEMINI_API_KEY` is not configured, a built-in deterministic advice engine steps in automatically with zero downtime.
- **ATS Resume Scanner**: Audits resume text for high-impact verbs, quantifiable metrics, keyword density, and provides before-and-after bullet point rewrites.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Neo-Brutalist design tokens
- **Animations**: Framer Motion (snappy spring physics, overshoot reveals, sliding tabs)
- **Icons**: Lucide React (used deliberately and sparingly)
- **Charts & Gauges**: Hand-built accessible SVG elements with spring animations
- **Validation**: Zod schema validation on all API endpoints
- **AI**: `@google/generative-ai` with deterministic rule-based fallback
- **Data Access Layer**: Clean `/lib/db.ts` abstraction ready for seamless Supabase/PostgreSQL drop-in

---

## 🔌 API Route Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/roles` | Lists available career tracks with benchmark metrics |
| `GET` | `/api/roadmaps?role=` | Retrieves 4-stage node graph for a specific role or all |
| `POST` | `/api/skill-gap` | Validates skills/resume text and returns matched, missing, readiness score |
| `POST` | `/api/recovery-plan` | Calculates 12-week academic vs upskilling split based on backlogs and CGPA |
| `POST` | `/api/simulate` | Evaluates study hours and produces projected readiness growth curve |
| `POST` | `/api/mentor` | AI mentor guidance via Gemini API with deterministic fallback |
| `POST` | `/api/resume/ats` | ATS scoring, keyword match, and bullet upgrade suggestions |
| `GET` | `/api/readiness` | Returns overview metrics (streak, modules completed, readiness) |

---

## 💻 Local Development Setup

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd career
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your free Gemini API key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY=AIzaSy...
```
*(Optional: If no key is provided, CareerPath automatically activates its deterministic offline mentor engine).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 One-Click Deploy on Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"** → **"Import"**.
3. Select this repository.
4. In the **Environment Variables** section, add:
   - `GEMINI_API_KEY` = `your_gemini_api_key` (optional, fallback active if blank).
5. Click **Deploy**. Vercel will build and host the Next.js App Router application in under 60 seconds.

---

## 📝 License & Credits
Built for student engineers. Open-source, MIT licensed.
