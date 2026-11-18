# Cynbit Smart Discovery
### Intelligent Project Enquiry & Lead Management System

An end-to-end full-stack prototype developed for the **Full Stack Developer Intern** assessment for **Cynbit Technologies** ([www.cynbit.in](https://www.cynbit.in)).

---

> [!IMPORTANT]
> ### 🔑 Default Administrative Credentials
> Access the Admin CRM & Analytics Portal at: **[`http://localhost:3000/admin/login`](http://localhost:3000/admin/login)**
>
> | Role | Email Address | Password |
> |---|---|---|
> | **Superadmin** | `admin@cynbit.in` | `AdminSecure2026!` |

---

## 🚀 Overview

Cynbit Smart Discovery bridges the gap between potential clients exploring Cynbit's digital services and the Cynbit team. Instead of a generic contact form, visitors go through an intelligent 5-step guided project discovery journey that:

1. **Captures Business Intent**: Identifies goals, company profile, technical stack, budget, and timeline.
2. **Deterministic Recommendation Engine**: Evaluates inputs against Cynbit's 6 service domains using rule-based scoring (0–100) to recommend the right engagement model.
3. **Collision-Resistant Reference Generation**: Issues a unique reference ID (e.g. `CYN-2026-A7K92X`) for client tracking.
4. **Automated Communications**: Sends structured acknowledgement emails to clients and urgent notifications to administrators via Resend.
5. **Secure Administrative Portal**: Role-based access with JWT in HTTP-only cookies, live MongoDB analytics, enquiry filtering, status pipeline management, and audit history.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React |
| **Backend** | Next.js Route Handlers (Edge & Node runtime), REST API |
| **Database** | MongoDB Atlas, Mongoose ODM with indexing & compound queries |
| **Authentication** | Jose (JWT), HTTP-only Secure Cookies, Bcrypt.js |
| **Validation** | Zod (Dual client-side & server-side schema verification) |
| **Email Service** | Resend API with graceful offline fallback |
| **Testing** | Jest, ts-jest |
| **Deployment** | Vercel, MongoDB Atlas |

---

## 📂 Project Architecture

```
cynbit-smart-discovery/
├── public/                 # Static assets
├── scripts/
│   └── seed-admin.ts       # Secure admin seeding script
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── analytics/  # Dynamic aggregations & charts
│   │   │   ├── dashboard/  # Metrics & KPI summary cards
│   │   │   ├── leads/      # Filterable, paginated lead table
│   │   │   │   └── [id]/   # Full enquiry dossier & status update
│   │   │   └── login/      # Secure JWT admin authentication
│   │   ├── api/
│   │   │   ├── admin/      # Protected administrative endpoints
│   │   │   ├── auth/       # Login, logout, session verification
│   │   │   └── leads/      # Public lead submission & status tracking
│   │   ├── discovery/      # 5-step interactive questionnaire
│   │   ├── success/        # Submission confirmation & reference copying
│   │   ├── track/          # Public reference ID status tracking
│   │   └── page.tsx        # High-conversion Cynbit landing page
│   ├── components/         # Modular UI components (form steps, layout, cards)
│   ├── constants/          # Application categories, budgets, and palettes
│   ├── lib/                # Database pooling, JWT helpers, validation schemas
│   ├── models/             # Mongoose schemas (Lead, Admin)
│   ├── services/           # Recommendation & scoring logic
│   └── types/              # Comprehensive TypeScript interfaces
├── tests/                  # Jest unit test suites
├── .env.example            # Environment configuration template
└── README.md
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory (based on `.env.example`):

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cynbit-smart-discovery

# Authentication Secret (min 32 characters)
JWT_SECRET=your-secure-jwt-secret-key-at-least-32-chars

# Admin User Seeding
ADMIN_EMAIL=admin@cynbit.in
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_NAME=Cynbit Administrator

# Resend Email Integration (Optional)
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_NOTIFICATION_EMAIL=admin@cynbit.in

# Public URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🏃 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Administrator Account
```bash
npx ts-node scripts/seed-admin.ts
```

### 3. Run Unit Tests
```bash
npx jest
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
Access the admin portal at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

---

## 🧪 Testing

The test suite validates:
- **Rule-based recommendation calculations** against all domain rules and point thresholds.
- **Zod validation schemas** ensuring invalid or malformed submissions are safely rejected.

```bash
PASS tests/recommendation.test.ts
PASS tests/validation.test.ts
Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
```

---

## 🔒 Security Best Practices

- **Zero Secret Leakage**: No credentials, tokens, or environment values are exposed to the client bundle.
- **Strict Rate Limiting**: In-memory IP-based submission and login throttling prevents automated abuse.
- **Dual-Layer Validation**: Prevents dirty input from touching MongoDB queries.
- **Safe Authentication**: Administrative session tokens are stored exclusively in HTTP-only, SameSite cookies.
