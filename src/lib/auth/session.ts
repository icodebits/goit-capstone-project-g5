import { prisma } from '@/lib/db';

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'SESSION_ID';
const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
}

export async function createSession(userId: string): Promise<string> {
  // Generate random session token using Web Crypto API
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  
  // Hash token using Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Calculate expiry date
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE);
  
  // Store session in database
  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });
  
  return token;
}

export async function verifySession(token: string): Promise<SessionUser | null> {
  if (!token) return null;
  
  // Hash token using Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Find session and include user data
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
  
  if (!session || session.expiresAt < new Date()) {
    return null;
  }
  
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
  };
}

export async function destroySession(token: string): Promise<void> {
  if (!token) return;
  
  // Hash token using Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  await prisma.session.deleteMany({
    where: { tokenHash },
  });
}

export async function destroyAllUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId },
  });
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export function getSessionMaxAge(): number {
  return SESSION_MAX_AGE;
}
