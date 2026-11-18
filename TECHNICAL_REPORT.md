# Cynbit Smart Discovery — Technical Report
### Engineering Analysis, System Architecture & Implementation Report

---

## 1. Executive Summary

- **Project Title:** Cynbit Smart Discovery
- **Assessment Scope:** Full Stack Developer Intern – Improve Cynbit's Website
- **Target Platform:** Cynbit Technologies ([www.cynbit.in](https://www.cynbit.in))
- **Author:** Full Stack Developer Candidate
- **Repository:** `https://github.com/Swarnalakshmi2223/cynbit-smart-project-discovery.git`

This technical report details the architectural design, problem identification, implementation methodology, and operational outcomes of the **Cynbit Smart Discovery** prototype. The project transforms Cynbit's traditional static client enquiry process into an intelligent, guided discovery workflow powered by Next.js 15, React 19, TypeScript, Tailwind CSS, MongoDB Atlas, and Next.js Route Handlers.

---

## 2. Company & Website Analysis

### 2.1 Brand & Business Assessment
Cynbit Technologies is a forward-looking technology company providing:
- AI Automation & Workflow Engineering
- Web & Mobile Application Development
- Custom Enterprise Software
- Cloud Infrastructure & DevOps
- Technical SEO & Digital Growth
- BitElevate (Flagship incubation & scaling initiative)

### 2.2 Existing User Journey Limitations
Upon analyzing the production website ([www.cynbit.in](https://www.cynbit.in)):
1. **High Cognitive Load:** Prospective clients must self-categorize their technical needs without technical advisory or domain orientation.
2. **Generic Lead Intake:** Standard contact forms fail to collect project-critical parameters (budget brackets, timeline expectations, legacy system interfaces, team size).
3. **Delayed Lead Triage:** Without automated prioritization or qualification scoring, incoming enquiries are manually sorted by sales/engineering teams.
4. **Lack of Client Visibility:** Enquirers receive no real-time reference key, tracking capability, or tailored service recommendation.

---

## 3. Proposed Solution: Smart Discovery System

The solution replaces generic contact forms with a structured 5-step interactive discovery pipeline:
- **Phase 1: Project Goal Selection** — Categorizes core business intent.
- **Phase 2: Business Demographics** — Captures industry, enterprise size, and existing systems.
- **Phase 3: Requirements Engineering** — Elicits functional requirements, challenges, and integrations.
- **Phase 4: Budget & Timeline Estimation** — Sets realistic delivery parameters.
- **Intermediate Step: Service Recommendation Engine** — Deterministically computes the best-matching Cynbit service division with priority score (0–100) before final contact submission.
- **Phase 5: Contact & Consent** — Compliant data collection with privacy consent.
- **Post-Submission:** Unique reference ID generation (`CYN-YYYY-XXXXXXX`), public tracking, and an administrative pipeline dashboard.

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│   Landing Page │ Discovery Form │ Public Tracker │ Admin UI │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON / Cookies
┌──────────────────────────────▼──────────────────────────────┐
│                    Next.js 15 App Router                    │
│   Route Handlers (/api/leads, /api/auth, /api/admin)        │
│   Rate Limiting Middleware │ Zod Request Validator         │
└──────────────┬──────────────────────────────┬───────────────┘
               │ Mongoose Pools               │ REST API
┌──────────────▼──────────────┐┌──────────────▼───────────────┐
│     MongoDB Atlas Cluster   ││          Resend API          │
│   - leads (indexed)         ││   - Customer Confirmation    │
│   - admins (bcrypt hashed)  ││   - Admin Notification       │
└─────────────────────────────┘└──────────────────────────────┘
```

---

## 5. Module Implementation Breakdown

### 5.1 Deterministic Service Recommendation Engine
Implemented in `src/services/recommendation.service.ts`:
- **Deterministic Rule Base:** Recommends services across Cynbit's 6 core technical offerings.
- **Point-Based Prioritization:** Combines requirement complexity (+35), budget tier (+15), timeline urgency (+10), legacy integration presence (+10), and description depth (+10).
- **Normalized Output:** Produces a 0–100 priority score categorized into High (≥60), Medium (≥35), and Low (<35) tiers, accompanied by tailored explanatory rationales.

### 5.2 Lead Storage & Database Schema
Implemented with Mongoose ODM in `src/models/Lead.ts`:
- Compound indexing on `{ createdAt: -1 }`, `{ status: 1, createdAt: -1 }`, and `{ priorityLevel: 1, createdAt: -1 }`.
- Unique reference index on `referenceId` with automated collision retry logic.
- Complete audit fields: status lifecycle (`New`, `Under Review`, `Contacted`, `In Progress`, `Completed`, `Rejected`).

### 5.3 Administrative Security & Authentication
- **Edge-compatible JWT** (`jose`) with 24-hour expiration.
- Tokens delivered via `httpOnly`, `SameSite: 'lax'`, `secure` cookies to eliminate XSS token theft vectors.
- Bcrypt password hashing (cost factor 12).
- Zero exposure of hashed passwords or token strings in API responses.

### 5.4 Lead Analytics Engine
Implemented in `/api/admin/analytics` and `src/app/admin/analytics/page.tsx`:
- Calculates live MongoDB aggregation pipelines for status counts, priority distribution, top goals, and 30-day submission timelines.
- Real zero-state empty views with clean UI fallbacks when no records are present.

---

## 6. Verification and Testing Results

### 6.1 Unit Tests (Jest)
- `tests/recommendation.test.ts`: Verified proper domain scoring, edge conditions, timeline prioritization, and score normalization.
- `tests/validation.test.ts`: Verified input constraints (min 50 characters description, valid email/phone formats, mandatory privacy consent).
- **Result:** 7/7 tests passing.

### 6.2 Production Build Verification
- Validated with Next.js 16/15 Turbopack production compiler (`next build`).
- All 15 application routes cleanly compiled and optimized.

---

## 7. Conclusion

The Cynbit Smart Discovery prototype demonstrates how structured qualification workflows can elevate business conversion rates, reduce initial consulting overhead, and provide executive visibility into prospective project pipelines.

