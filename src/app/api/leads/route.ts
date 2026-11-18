// src/app/api/leads/route.ts
// POST /api/leads — Submit a new project enquiry

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead, { ILead } from '@/models/Lead';
import { leadSubmissionSchema } from '@/lib/validation';
import { generateReferenceId } from '@/lib/reference-id';
import { computeRecommendation } from '@/services/recommendation.service';
import { sendCustomerConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';
import { Lead as LeadType } from '@/types';

// Simple in-memory rate limiting (5 submissions per IP per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitMap.get(ip);
  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (existing.count >= 5) return false;
  existing.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Server-side validation with Zod
    const result = leadSubmissionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = result.data;

    await connectDB();

    // Check for duplicate email within last 24 hours (prevent spam)
    const twentyFourHoursAgo = new Date(Date.now() - 86400_000);
    const existing = await Lead.findOne({
      email: data.email.toLowerCase(),
      createdAt: { $gte: twentyFourHoursAgo },
    });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'An enquiry with this email was submitted recently. Please wait 24 hours before submitting again.',
          referenceId: existing.referenceId,
        },
        { status: 409 }
      );
    }

    // Compute service recommendation
    const recommendation = computeRecommendation({
      projectGoal: data.projectGoal,
      industry: data.industry,
      companyName: data.companyName,
      companySize: data.companySize,
      website: data.website ?? '',
      currentSystems: data.currentSystems ?? '',
      projectDescription: data.projectDescription,
      requiredFeatures: data.requiredFeatures ?? '',
      currentChallenges: data.currentChallenges ?? '',
      expectedOutcome: data.expectedOutcome ?? '',
      integrationRequirements: data.integrationRequirements ?? '',
      budgetRange: data.budgetRange,
      expectedTimeline: data.expectedTimeline,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      preferredContactMethod: data.preferredContactMethod,
      additionalMessage: data.additionalMessage ?? '',
      privacyConsent: data.privacyConsent,
    });

    // Generate unique reference ID with collision retry
    let referenceId = generateReferenceId();
    let attempts = 0;
    while (await Lead.findOne({ referenceId }) && attempts < 5) {
      referenceId = generateReferenceId();
      attempts++;
    }

    // Save lead to MongoDB
    const lead = (await Lead.create({
      ...data,
      referenceId,
      recommendedService: recommendation.recommendedService,
      recommendationReason: recommendation.reason,
      priorityScore: recommendation.priorityScore,
      priorityLevel: recommendation.priorityLevel,
      status: 'New',
    })) as ILead;

    // Send emails (non-blocking — don't fail if email fails)
    const plainLead = lead.toObject() as unknown as LeadType;
    const [customerEmail, adminEmail] = await Promise.allSettled([
      sendCustomerConfirmationEmail(plainLead),
      sendAdminNotificationEmail(plainLead),
    ]);

    const emailStatus = {
      customerEmail: customerEmail.status === 'fulfilled' && customerEmail.value.success
        ? 'sent'
        : customerEmail.status === 'fulfilled' && customerEmail.value.skipped
          ? 'not_configured'
          : 'failed',
      adminEmail: adminEmail.status === 'fulfilled' && adminEmail.value.success
        ? 'sent'
        : adminEmail.status === 'fulfilled' && adminEmail.value.skipped
          ? 'not_configured'
          : 'failed',
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been submitted successfully.',
        data: {
          referenceId: lead.referenceId,
          projectGoal: lead.projectGoal,
          recommendedService: lead.recommendedService,
          priorityLevel: lead.priorityLevel,
          emailStatus,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/leads]', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
