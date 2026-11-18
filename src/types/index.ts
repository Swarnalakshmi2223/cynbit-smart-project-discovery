// src/types/index.ts
// Shared TypeScript types for the entire application

export type ProjectGoal =
  | 'Build a new web application'
  | 'Develop a mobile application'
  | 'Automate business operations using AI'
  | 'Develop an AI-powered solution'
  | 'Migrate or improve cloud infrastructure'
  | 'Improve website performance and SEO'
  | 'Develop custom enterprise software'
  | 'Other';

export type Industry =
  | 'Information Technology'
  | 'Healthcare'
  | 'Education'
  | 'Finance'
  | 'E-commerce'
  | 'Manufacturing'
  | 'Real Estate'
  | 'Other';

export type CompanySize =
  | 'Individual / Startup'
  | '2–10 employees'
  | '11–50 employees'
  | '51–200 employees'
  | '200+ employees';

export type BudgetRange =
  | 'Below ₹50,000'
  | '₹50,000–₹1 lakh'
  | '₹1 lakh–₹2 lakh'
  | '₹2 lakh–₹5 lakh'
  | '₹5 lakh–₹10 lakh'
  | 'Above ₹10 lakh'
  | 'Not decided yet';

export type ExpectedTimeline =
  | 'Immediately'
  | 'Within 30 days'
  | 'Within 1–3 months'
  | 'Within 3–6 months'
  | 'Flexible';

export type PreferredContactMethod = 'Email' | 'Phone' | 'WhatsApp';

export type RecommendedService =
  | 'AI Automation & Workflow Engineering'
  | 'Custom Software Development'
  | 'Web & Mobile Application Development'
  | 'Cloud Infrastructure & Migration'
  | 'Technical SEO & Digital Growth'
  | 'Enterprise Software Solutions';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type LeadStatus =
  | 'New'
  | 'Under Review'
  | 'Contacted'
  | 'In Progress'
  | 'Completed'
  | 'Rejected';

// Multi-step form data
export interface DiscoveryFormData {
  // Step 1
  projectGoal: ProjectGoal | '';
  // Step 2
  industry: Industry | '';
  companyName: string;
  companySize: CompanySize | '';
  website: string;
  currentSystems: string;
  // Step 3
  projectDescription: string;
  requiredFeatures: string;
  currentChallenges: string;
  expectedOutcome: string;
  integrationRequirements: string;
  // Step 4
  budgetRange: BudgetRange | '';
  expectedTimeline: ExpectedTimeline | '';
  // Step 5
  fullName: string;
  email: string;
  phone: string;
  preferredContactMethod: PreferredContactMethod | '';
  additionalMessage: string;
  privacyConsent: boolean;
}

// Recommendation result
export interface RecommendationResult {
  recommendedService: RecommendedService;
  reason: string;
  priorityScore: number;
  priorityLevel: PriorityLevel;
  nextStep: string;
}

// Lead (from API responses)
export interface Lead {
  _id: string;
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: Industry;
  companySize: CompanySize;
  website?: string;
  projectGoal: ProjectGoal;
  projectDescription: string;
  requiredFeatures?: string;
  currentChallenges?: string;
  expectedOutcome?: string;
  integrationRequirements?: string;
  currentSystems?: string;
  budgetRange: BudgetRange;
  expectedTimeline: ExpectedTimeline;
  preferredContactMethod: PreferredContactMethod;
  additionalMessage?: string;
  recommendedService: RecommendedService;
  recommendationReason: string;
  priorityScore: number;
  priorityLevel: PriorityLevel;
  status: LeadStatus;
  privacyConsent: boolean;
  createdAt: string;
  updatedAt: string;
}

// API response shapes
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedLeads {
  leads: Lead[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AnalyticsData {
  summary: {
    total: number;
    newLeads: number;
    highPriority: number;
    inProgress: number;
    completed: number;
  };
  byStatus: { _id: LeadStatus; count: number }[];
  byPriority: { _id: PriorityLevel; count: number }[];
  byService: { _id: RecommendedService; count: number }[];
  byGoal: { _id: ProjectGoal; count: number }[];
  byDate: { _id: string; count: number }[];
}

