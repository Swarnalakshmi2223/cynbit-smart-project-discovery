// src/lib/validation.ts
// Zod schemas for server-side and client-side validation

import { z } from 'zod';

export const leadSubmissionSchema = z.object({
  // Step 1
  projectGoal: z.enum([
    'Build a new web application',
    'Develop a mobile application',
    'Automate business operations using AI',
    'Develop an AI-powered solution',
    'Migrate or improve cloud infrastructure',
    'Improve website performance and SEO',
    'Develop custom enterprise software',
    'Other',
  ]),

  // Step 2
  industry: z.enum([
    'Information Technology',
    'Healthcare',
    'Education',
    'Finance',
    'E-commerce',
    'Manufacturing',
    'Real Estate',
    'Other',
  ]),
  companyName: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  companySize: z.enum([
    'Individual / Startup',
    '2–10 employees',
    '11–50 employees',
    '51–200 employees',
    '200+ employees',
  ]),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  currentSystems: z.string().max(500).optional(),

  // Step 3
  projectDescription: z.string().min(50, 'Please describe your project in at least 50 characters').max(2000),
  requiredFeatures: z.string().max(1000).optional(),
  currentChallenges: z.string().max(1000).optional(),
  expectedOutcome: z.string().max(1000).optional(),
  integrationRequirements: z.string().max(1000).optional(),

  // Step 4
  budgetRange: z.enum([
    'Below ₹50,000',
    '₹50,000–₹1 lakh',
    '₹1 lakh–₹2 lakh',
    '₹2 lakh–₹5 lakh',
    '₹5 lakh–₹10 lakh',
    'Above ₹10 lakh',
    'Not decided yet',
  ]),
  expectedTimeline: z.enum([
    'Immediately',
    'Within 30 days',
    'Within 1–3 months',
    'Within 3–6 months',
    'Flexible',
  ]),

  // Step 5
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+]?[\d\s\-().]{10,15}$/, 'Please enter a valid phone number'),
  preferredContactMethod: z.enum(['Email', 'Phone', 'WhatsApp']),
  additionalMessage: z.string().max(1000).optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy to submit',
  }),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const statusUpdateSchema = z.object({
  status: z.enum(['New', 'Under Review', 'Contacted', 'In Progress', 'Completed', 'Rejected']),
});

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type StatusUpdateInput = z.infer<typeof statusUpdateSchema>;
