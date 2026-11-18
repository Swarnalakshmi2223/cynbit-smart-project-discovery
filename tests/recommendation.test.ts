// tests/recommendation.test.ts
// Unit tests for the recommendation engine
import { computeRecommendation } from '../src/services/recommendation.service';

describe('Intelligent Recommendation Engine', () => {
  test('recommends AI Automation & Workflow Engineering for AI operations', () => {
    const rec = computeRecommendation({
      projectGoal: 'Automate business operations using AI',
      expectedTimeline: 'Within 30 days',
      currentSystems: 'Existing CRM and ERP systems',
      budgetRange: '₹2 lakh–₹5 lakh',
      companySize: '11–50 employees',
      projectDescription: 'We want to automate lead triage and client onboarding using custom AI workflows.'
    });

    expect(rec.recommendedService).toBe('AI Automation & Workflow Engineering');
    expect(rec.priorityScore).toBeGreaterThanOrEqual(50);
    expect(['High', 'Medium']).toContain(rec.priorityLevel);
  });

  test('recommends Web & Mobile Development for app requests', () => {
    const rec = computeRecommendation({
      projectGoal: 'Build a new web application',
      budgetRange: '₹1 lakh–₹2 lakh',
      expectedTimeline: 'Within 1–3 months',
      projectDescription: 'We need a customer portal for our retail business with shopping cart and payment.'
    });

    expect(rec.recommendedService).toBe('Web & Mobile Application Development');
  });

  test('recommends Enterprise Software Solutions for large organizations with custom requirements', () => {
    const rec = computeRecommendation({
      projectGoal: 'Develop custom enterprise software',
      budgetRange: 'Above ₹10 lakh',
      companySize: '200+ employees',
      projectDescription: 'Multi-tenant ERP platform supporting thousands of employees across 5 regions.'
    });

    expect(rec.recommendedService).toBe('Enterprise Software Solutions');
    expect(rec.priorityLevel).toBe('High');
    expect(rec.priorityScore).toBeGreaterThanOrEqual(60);
  });

  test('calculates normalized priority scores between 0 and 100', () => {
    const rec = computeRecommendation({
      projectGoal: 'Other',
      budgetRange: 'Below ₹50,000',
      expectedTimeline: 'Flexible',
      projectDescription: 'Basic consulting enquiry'
    });

    expect(rec.priorityScore).toBeGreaterThanOrEqual(0);
    expect(rec.priorityScore).toBeLessThanOrEqual(100);
  });
});

