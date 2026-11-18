// src/constants/index.ts
import {
  ProjectGoal,
  Industry,
  CompanySize,
  BudgetRange,
  ExpectedTimeline,
  PreferredContactMethod,
  RecommendedService,
  LeadStatus,
} from '@/types';

export const PROJECT_GOALS: ProjectGoal[] = [
  'Build a new web application',
  'Develop a mobile application',
  'Automate business operations using AI',
  'Develop an AI-powered solution',
  'Migrate or improve cloud infrastructure',
  'Improve website performance and SEO',
  'Develop custom enterprise software',
  'Other',
];

export const INDUSTRIES: Industry[] = [
  'Information Technology',
  'Healthcare',
  'Education',
  'Finance',
  'E-commerce',
  'Manufacturing',
  'Real Estate',
  'Other',
];

export const COMPANY_SIZES: CompanySize[] = [
  'Individual / Startup',
  '2–10 employees',
  '11–50 employees',
  '51–200 employees',
  '200+ employees',
];

export const BUDGET_RANGES: BudgetRange[] = [
  'Below ₹50,000',
  '₹50,000–₹1 lakh',
  '₹1 lakh–₹2 lakh',
  '₹2 lakh–₹5 lakh',
  '₹5 lakh–₹10 lakh',
  'Above ₹10 lakh',
  'Not decided yet',
];

export const EXPECTED_TIMELINES: ExpectedTimeline[] = [
  'Immediately',
  'Within 30 days',
  'Within 1–3 months',
  'Within 3–6 months',
  'Flexible',
];

export const PREFERRED_CONTACT_METHODS: PreferredContactMethod[] = [
  'Email',
  'Phone',
  'WhatsApp',
];

export const RECOMMENDED_SERVICES: RecommendedService[] = [
  'AI Automation & Workflow Engineering',
  'Custom Software Development',
  'Web & Mobile Application Development',
  'Cloud Infrastructure & Migration',
  'Technical SEO & Digital Growth',
  'Enterprise Software Solutions',
];

export const LEAD_STATUSES: LeadStatus[] = [
  'New',
  'Under Review',
  'Contacted',
  'In Progress',
  'Completed',
  'Rejected',
];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-yellow-100 text-yellow-800',
  Contacted: 'bg-purple-100 text-purple-800',
  'In Progress': 'bg-orange-100 text-orange-800',
  Completed: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export const PRIORITY_COLORS: Record<string, string> = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

export const FORM_STEPS = [
  { id: 1, title: 'Project Goal', description: 'What are you looking to achieve?' },
  { id: 2, title: 'Business Info', description: 'Tell us about your company' },
  { id: 3, title: 'Requirements', description: 'Describe your project needs' },
  { id: 4, title: 'Budget & Timeline', description: 'Set your expectations' },
  { id: 5, title: 'Contact Details', description: 'How should we reach you?' },
];

