// src/services/recommendation.service.ts
// Rule-based service recommendation engine
// Does NOT use ML or generative AI - pure deterministic logic

import {
  DiscoveryFormData,
  RecommendationResult,
  RecommendedService,
  PriorityLevel,
} from '@/types';

interface ServiceScore {
  service: RecommendedService;
  score: number;
}

export function computeRecommendation(data: Partial<DiscoveryFormData>): RecommendationResult {
  const scores: ServiceScore[] = [
    { service: 'AI Automation & Workflow Engineering', score: 0 },
    { service: 'Custom Software Development', score: 0 },
    { service: 'Web & Mobile Application Development', score: 0 },
    { service: 'Cloud Infrastructure & Migration', score: 0 },
    { service: 'Technical SEO & Digital Growth', score: 0 },
    { service: 'Enterprise Software Solutions', score: 0 },
  ];

  // ── Goal-based scoring ────────────────────────────────────────────
  switch (data.projectGoal) {
    case 'Automate business operations using AI':
    case 'Develop an AI-powered solution':
      addScore(scores, 'AI Automation & Workflow Engineering', 35);
      addScore(scores, 'Custom Software Development', 10);
      break;
    case 'Build a new web application':
      addScore(scores, 'Web & Mobile Application Development', 35);
      addScore(scores, 'Custom Software Development', 15);
      break;
    case 'Develop a mobile application':
      addScore(scores, 'Web & Mobile Application Development', 35);
      addScore(scores, 'Custom Software Development', 10);
      break;
    case 'Migrate or improve cloud infrastructure':
      addScore(scores, 'Cloud Infrastructure & Migration', 35);
      break;
    case 'Improve website performance and SEO':
      addScore(scores, 'Technical SEO & Digital Growth', 35);
      addScore(scores, 'Web & Mobile Application Development', 10);
      break;
    case 'Develop custom enterprise software':
      addScore(scores, 'Enterprise Software Solutions', 35);
      addScore(scores, 'Custom Software Development', 15);
      break;
    default:
      addScore(scores, 'Custom Software Development', 20);
  }

  // ── Budget-based scoring ─────────────────────────────────────────
  const highBudgets = ['₹2 lakh–₹5 lakh', '₹5 lakh–₹10 lakh', 'Above ₹10 lakh'];
  const midBudgets = ['₹1 lakh–₹2 lakh'];
  if (highBudgets.includes(data.budgetRange ?? '')) {
    addScore(scores, 'Enterprise Software Solutions', 15);
    addScore(scores, 'AI Automation & Workflow Engineering', 10);
    addScore(scores, 'Custom Software Development', 10);
  } else if (midBudgets.includes(data.budgetRange ?? '')) {
    addScore(scores, 'Web & Mobile Application Development', 10);
    addScore(scores, 'Custom Software Development', 5);
  }

  // ── Timeline-based scoring ────────────────────────────────────────
  if (data.expectedTimeline === 'Immediately' || data.expectedTimeline === 'Within 30 days') {
    addScore(scores, 'Technical SEO & Digital Growth', 10);
    addScore(scores, 'Cloud Infrastructure & Migration', 5);
  }

  // ── Existing systems integration bonus ───────────────────────────
  if (data.currentSystems && data.currentSystems.trim().length > 10) {
    addScore(scores, 'AI Automation & Workflow Engineering', 10);
    addScore(scores, 'Enterprise Software Solutions', 10);
  }

  // ── Description quality bonus ─────────────────────────────────────
  if (data.projectDescription && data.projectDescription.trim().length > 100) {
    // Give a small bonus to the top service (indicates serious enquiry)
    const top = getTopService(scores);
    addScore(scores, top.service, 10);
  }

  // ── Company size factor ───────────────────────────────────────────
  if (data.companySize === '51–200 employees' || data.companySize === '200+ employees') {
    addScore(scores, 'Enterprise Software Solutions', 15);
    addScore(scores, 'Cloud Infrastructure & Migration', 5);
  }

  // ── Normalize to 0–100 ────────────────────────────────────────────
  const best = getTopService(scores);
  const rawScore = best.score;
  const normalizedScore = Math.min(100, Math.max(0, rawScore));

  const priorityLevel: PriorityLevel =
    normalizedScore >= 60 ? 'High' : normalizedScore >= 35 ? 'Medium' : 'Low';

  const reason = buildReason(data, best.service, priorityLevel);
  const nextStep = buildNextStep(best.service, priorityLevel);

  return {
    recommendedService: best.service,
    reason,
    priorityScore: normalizedScore,
    priorityLevel,
    nextStep,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────

function addScore(scores: ServiceScore[], service: RecommendedService, points: number): void {
  const entry = scores.find(s => s.service === service);
  if (entry) entry.score += points;
}

function getTopService(scores: ServiceScore[]): ServiceScore {
  return scores.reduce((best, curr) => (curr.score > best.score ? curr : best));
}

function buildReason(
  data: Partial<DiscoveryFormData>,
  service: RecommendedService,
  priority: PriorityLevel,
): string {
  const parts: string[] = [];
  parts.push(`Based on your selected project goal "${data.projectGoal || 'your requirements'}"`);
  if (data.budgetRange && data.budgetRange !== 'Not decided yet') {
    parts.push(`budget of ${data.budgetRange}`);
  }
  if (data.expectedTimeline) {
    parts.push(`and timeline of "${data.expectedTimeline}"`);
  }
  parts.push(`${service} is the most suitable Cynbit service for your needs.`);
  if (priority === 'High') {
    parts.push('Your enquiry has been classified as high priority based on your requirements.');
  }
  return parts.join(', ');
}

function buildNextStep(service: RecommendedService, priority: PriorityLevel): string {
  if (priority === 'High') {
    return `A Cynbit specialist in ${service} will reach out within 24 hours to schedule a discovery call.`;
  } else if (priority === 'Medium') {
    return `Our team will review your enquiry and contact you within 2 business days to discuss ${service} options.`;
  }
  return `Submit your enquiry and our team will reach out within 3–5 business days with information about ${service}.`;
}

