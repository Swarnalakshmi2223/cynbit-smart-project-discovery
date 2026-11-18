// src/models/Lead.ts
// Mongoose model for project enquiry leads

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  companySize: string;
  website?: string;
  projectGoal: string;
  projectDescription: string;
  requiredFeatures?: string;
  currentChallenges?: string;
  expectedOutcome?: string;
  integrationRequirements?: string;
  currentSystems?: string;
  budgetRange: string;
  expectedTimeline: string;
  preferredContactMethod: string;
  additionalMessage?: string;
  recommendedService: string;
  recommendationReason: string;
  priorityScore: number;
  priorityLevel: 'High' | 'Medium' | 'Low';
  status: 'New' | 'Under Review' | 'Contacted' | 'In Progress' | 'Completed' | 'Rejected';
  privacyConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    industry: {
      type: String,
      required: true,
      enum: ['Information Technology', 'Healthcare', 'Education', 'Finance',
        'E-commerce', 'Manufacturing', 'Real Estate', 'Other'],
    },
    companySize: {
      type: String,
      required: true,
      enum: ['Individual / Startup', '2–10 employees', '11–50 employees',
        '51–200 employees', '200+ employees'],
    },
    website: { type: String, trim: true },
    projectGoal: {
      type: String,
      required: true,
      enum: [
        'Build a new web application', 'Develop a mobile application',
        'Automate business operations using AI', 'Develop an AI-powered solution',
        'Migrate or improve cloud infrastructure', 'Improve website performance and SEO',
        'Develop custom enterprise software', 'Other',
      ],
    },
    projectDescription: { type: String, required: true, maxlength: 2000 },
    requiredFeatures: { type: String, maxlength: 1000 },
    currentChallenges: { type: String, maxlength: 1000 },
    expectedOutcome: { type: String, maxlength: 1000 },
    integrationRequirements: { type: String, maxlength: 1000 },
    currentSystems: { type: String, maxlength: 500 },
    budgetRange: {
      type: String,
      required: true,
      enum: ['Below ₹50,000', '₹50,000–₹1 lakh', '₹1 lakh–₹2 lakh',
        '₹2 lakh–₹5 lakh', '₹5 lakh–₹10 lakh', 'Above ₹10 lakh', 'Not decided yet'],
    },
    expectedTimeline: {
      type: String,
      required: true,
      enum: ['Immediately', 'Within 30 days', 'Within 1–3 months', 'Within 3–6 months', 'Flexible'],
    },
    preferredContactMethod: {
      type: String,
      required: true,
      enum: ['Email', 'Phone', 'WhatsApp'],
    },
    additionalMessage: { type: String, maxlength: 1000 },
    recommendedService: {
      type: String,
      required: true,
      enum: [
        'AI Automation & Workflow Engineering', 'Custom Software Development',
        'Web & Mobile Application Development', 'Cloud Infrastructure & Migration',
        'Technical SEO & Digital Growth', 'Enterprise Software Solutions',
      ],
    },
    recommendationReason: { type: String, required: true },
    priorityScore: { type: Number, required: true, min: 0, max: 100 },
    priorityLevel: {
      type: String,
      required: true,
      enum: ['High', 'Medium', 'Low'],
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Under Review', 'Contacted', 'In Progress', 'Completed', 'Rejected'],
      default: 'New',
      index: true,
    },
    privacyConsent: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast dashboard queries
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ priorityLevel: 1, createdAt: -1 });

const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;

