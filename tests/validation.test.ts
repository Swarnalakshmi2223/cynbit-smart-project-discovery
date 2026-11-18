// tests/validation.test.ts
// Unit tests for Zod schemas
import { leadSubmissionSchema, adminLoginSchema } from '../src/lib/validation';

describe('Validation Schemas', () => {
  test('validates full valid enquiry data', () => {
    const validData = {
      projectGoal: 'Build a new web application',
      industry: 'Information Technology',
      companyName: 'Acme Corp',
      companySize: '11–50 employees',
      website: 'https://acme.example.com',
      currentSystems: 'Custom Node.js app',
      projectDescription: 'We are looking to develop a comprehensive customer portal that automates discovery and project tracking for our digital business.',
      budgetRange: '₹2 lakh–₹5 lakh',
      expectedTimeline: 'Within 1–3 months',
      fullName: 'Jane Doe',
      email: 'jane@acme.example.com',
      phone: '+91 9876543210',
      preferredContactMethod: 'Email',
      privacyConsent: true,
    };

    const result = leadSubmissionSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('rejects short descriptions below 50 characters', () => {
    const invalidData = {
      projectGoal: 'Build a new web application',
      industry: 'Information Technology',
      companyName: 'Acme',
      companySize: '2–10 employees',
      projectDescription: 'Too short',
      budgetRange: 'Below ₹50,000',
      expectedTimeline: 'Flexible',
      fullName: 'John',
      email: 'john@example.com',
      phone: '9876543210',
      preferredContactMethod: 'Phone',
      privacyConsent: true,
    };

    const result = leadSubmissionSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.projectDescription).toBeDefined();
    }
  });

  test('validates admin login credentials format', () => {
    const validLogin = {
      email: 'admin@cynbit.in',
      password: 'SecurePassword123!',
    };
    expect(adminLoginSchema.safeParse(validLogin).success).toBe(true);

    const invalidEmail = {
      email: 'not-an-email',
      password: 'pass',
    };
    expect(adminLoginSchema.safeParse(invalidEmail).success).toBe(false);
  });
});

