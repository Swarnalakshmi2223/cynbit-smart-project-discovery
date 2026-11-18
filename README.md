# 🚀 Cynbit Smart Discovery
### Intelligent Project Enquiry, Qualification & Lead Management System

An end-to-end full-stack prototype engineered for the **Full Stack Developer Intern** technical assessment for **Cynbit Technologies** ([www.cynbit.in](https://www.cynbit.in)).

---

## 🌟 Quick Links & Live Demonstration

| Resource | Link |
|---|---|
| 🌐 **Live Deployed Prototype** | **[https://cynbit-smart-project-discovery.vercel.app/](https://cynbit-smart-project-discovery.vercel.app/)** |
| 🛡️ **Admin Portal Login** | **[https://cynbit-smart-project-discovery.vercel.app/admin/login](https://cynbit-smart-project-discovery.vercel.app/admin/login)** |
| 🔭 **Project Discovery Studio** | **[https://cynbit-smart-project-discovery.vercel.app/discovery](https://cynbit-smart-project-discovery.vercel.app/discovery)** |
| 📡 **Real-Time Status Tracker** | **[https://cynbit-smart-project-discovery.vercel.app/track](https://cynbit-smart-project-discovery.vercel.app/track)** |
| 📄 **Comprehensive Technical Report** | **[TECHNICAL_REPORT.md](./TECHNICAL_REPORT.md)** |

---

> [!IMPORTANT]
> ### 🔑 Administrator Access Credentials
> Reviewers and evaluators can immediately access the full **Administrative CRM, Live Lead Pipeline, and Aggregation Analytics** using the credentials below:
>
> | Parameter | Value |
> |---|---|
> | **Admin Login URL** | **[`https://cynbit-smart-project-discovery.vercel.app/admin/login`](https://cynbit-smart-project-discovery.vercel.app/admin/login)** |
> | **Email Address** | `admin@cynbit.in` |
> | **Password** | `AdminSecure2026!` |
> | **Assigned Role** | `Superadmin` |
>
> *(Local alternative: [`http://localhost:3000/admin/login`](http://localhost:3000/admin/login))*

---

## 💡 What Problem Does This Solve?

On the existing Cynbit website, prospective clients encounter a traditional, open-ended contact form. This creates three critical friction points:
1. **Unqualified Enquiries**: Clients don't specify their budget, technical constraints, or timelines upfront.
2. **Delayed Response Times**: Engineering leads must spend hours exchanging basic qualifying emails.
3. **Zero Client Visibility**: Once submitted, clients receive no reference tracking code or visibility into their enquiry review status.

### The Solution: **Cynbit Smart Discovery**
Instead of a generic form, visitors enter a modern, 5-step guided technical discovery studio that qualifies their requirements in real-time, calculates a deterministic squad match, issues a permanent tracking identifier (`CYN-2026-XXXXXXX`), and feeds into a real-time administrative pipeline.

---

## 🧭 The 5-Step Guided Discovery Flow

```
1. Define Goal       ➔  Select from 6 Cynbit core service domains (AI, Web, Mobile, Cloud, SEO, Enterprise)
2. Business Profile  ➔  Company size, industry vertical, and current software infrastructure
3. Technical Scope   ➔  Problem statement, feature requirements, and expected business outcomes (min 50 chars)
4. Budget & Timeline ➔  Structured financial allocations and target completion milestones
        ⬇
[ Deterministic Recommendation Engine calculates squad fit & priority score (0–100) ]
        ⬇
5. Contact Dossier   ➔  Name, verified email, international phone validation, channel preference, & privacy consent
        ⬇
[ Unique Reference Generated (CYN-YYYY-XXXXXXX) + Real-Time Status Portal Tracking ]
```

---

## ✨ Key Features & Technical Highlights

- **Deterministic Recommendation Engine (`recommendation.service.ts`)**: Evaluates parameters across all 6 Cynbit engineering clusters with 100% reproducible, explainable scoring (no AI hallucinations or unexpected API costs).
- **Collision-Resistant Reference Generator (`CYN-YYYY-XXXXXXX`)**: Cryptographically random, human-friendly tracking codes with automatic collision retry loops.
- **Real-Time Client Tracking Portal (`/track`)**: 5-stage interactive lifecycle stepper (`New` → `Under Review` → `Contacted` → `In Progress` → `Completed`) with auto-lookup via URL query parameters (`/track?ref=...`).
- **Executive Administrative CRM (`/admin/*`)**:
  - **KPI Dashboard**: Total leads, high-priority counts, and pipeline conversion metrics.
  - **Filterable Lead Pipeline**: Filter by stage, priority tier (`High`, `Medium`, `Low`), and live text search.
  - **Interactive Dossier View**: Review full client scopes and update operational statuses with instant MongoDB sync.
  - **Live Aggregation Analytics**: Dynamic MongoDB aggregation pipelines calculating service demand and budget breakdowns.
  - **Session Security & Sign-Out Guard**: JWT in `HttpOnly`, `SameSite=Lax` cookies with an interactive sign-out confirmation modal.
- **Dual-Layer Validation**: Strict Zod schemas shared across client-side forms and server-side route handlers.
- **Dark SaaS Studio UI/UX**: Built with Tailwind CSS v4 featuring responsive glassmorphic cards, ambient lighting glows, and fluid typography.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React |
| **Backend & APIs** | Next.js Route Handlers (Edge & Node runtime), REST API |
| **Database & ODM** | MongoDB Atlas, Mongoose ODM with compound indexing |
| **Authentication** | Jose (Edge-compatible JWT), HTTP-only Secure Cookies, Bcrypt.js |
| **Validation** | Zod (Dual client-side & server-side schema verification) |
| **Email Service** | Resend API integration with graceful offline fallback |
| **Unit Testing** | Jest, ts-jest (100% test pass rate) |
| **Deployment** | Vercel (Global Edge Network) & MongoDB Atlas Cloud |

---

## 📂 Project Architecture

```
cynbit-smart-discovery/
├── public/                 # Static assets & icons
├── scripts/
│   └── seed-admin.ts       # Secure initial administrator seeding script
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── analytics/  # Dynamic MongoDB aggregations & visual charts
│   │   │   ├── dashboard/  # Metrics & KPI summary cards
│   │   │   ├── leads/      # Filterable, paginated CRM pipeline table
│   │   │   │   └── [id]/   # Detailed enquiry dossier & stage updater
│   │   │   └── login/      # Secure JWT admin sign-in portal
│   │   ├── api/
│   │   │   ├── admin/      # Protected administrative CRM endpoints
│   │   │   ├── auth/       # Login, logout, and session check handlers
│   │   │   └── leads/      # Public lead submission & tracking endpoints
│   │   ├── discovery/      # 5-step interactive discovery funnel
│   │   ├── success/        # Submission confirmation & reference generator
│   │   ├── track/          # Public real-time enquiry status portal
│   │   └── page.tsx        # High-conversion Cynbit landing page
│   ├── components/
│   │   ├── dashboard/      # Admin navigation layout & confirmation modal
│   │   ├── discovery/      # Multi-step forms & recommendation cards
│   │   └── layout/         # Glassmorphic Navbar & Footer
│   ├── constants/          # Application categories, service offerings, budgets
│   ├── lib/                # Database pooling, JWT helpers, Zod validation
│   ├── models/             # Mongoose schemas (Lead, Admin)
│   ├── services/           # Deterministic recommendation & scoring engine
│   └── types/              # Comprehensive TypeScript interfaces
├── tests/                  # Jest automated test suites
├── .env.example            # Environment configuration template
├── README.md               # Quick-start documentation & credentials
└── TECHNICAL_REPORT.md     # In-depth architectural & assessment report
```

---

## 🏃 Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Swarnalakshmi2223/cynbit-smart-project-discovery.git
cd cynbit-smart-project-discovery
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory (based on `.env.example`):
```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cynbit-smart-discovery

# Authentication Secret (min 32 characters)
JWT_SECRET=your-secure-jwt-secret-key-at-least-32-chars

# Initial Admin Seeding Credentials
ADMIN_EMAIL=admin@cynbit.in
ADMIN_PASSWORD=AdminSecure2026!
ADMIN_NAME=Cynbit Administrator

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed Administrator & Run Tests
```bash
# Seed initial administrator into MongoDB
npx ts-node scripts/seed-admin.ts

# Run automated Jest unit tests
npm test
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Automated Testing

The project includes unit test suites validating both business logic and security constraints:

```bash
PASS tests/recommendation.test.ts
PASS tests/validation.test.ts

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.887 s
Ran all test suites.
```

- **`recommendation.test.ts`**: Tests domain matching, budget multipliers, priority score tiers (`High`, `Medium`, `Low`), and rationale outputs.
- **`validation.test.ts`**: Tests form input constraints, minimum character counts, international phone number regex formats, and mandatory privacy consent.

---

## 🔒 Security Best Practices

- **Zero Secret Exposure**: No database URIs, API keys, or JWT secrets are exposed to the client bundle.
- **HttpOnly Cookies**: Admin session tokens are isolated in `HttpOnly`, `SameSite=Lax`, `Secure` cookies to prevent XSS theft.
- **Bcrypt Password Hashing**: Passwords stored with salt cost factor 12; hashes never leave the database.
- **IP Rate Limiting**: In-memory rate limiting prevents automated form spam and brute-force login attempts.
- **Duplicate Suppression**: Re-submissions with the same email within 24 hours return `409 Conflict` to prevent database flooding.

---

## 👤 Author & Candidate Details

- **Candidate**: Swarnalakshmi Perumal
- **Email**: `swarnalakshmip4@gmail.com`
- **Institution**: University College of Engineering, Kanchipuram (Anna University)
- **Role Applied**: Full Stack Developer Intern
- **Target Company**: Cynbit Technologies ([www.cynbit.in](https://www.cynbit.in))
- **Live Prototype**: [https://cynbit-smart-project-discovery.vercel.app/](https://cynbit-smart-project-discovery.vercel.app/)
