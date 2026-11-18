// src/lib/reference-id.ts
// Generates unique enquiry reference IDs in format: CYN-YYYY-XXXXXXX

export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let random = '';
  for (let i = 0; i < 7; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CYN-${year}-${random}`;
}

