import { cookies } from 'next/headers';
import { getSessionCookieName, getSessionMaxAge } from './session';

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  const cookieName = getSessionCookieName();
  const maxAge = getSessionMaxAge();
  
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });
}

export async function getSessionCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieName = getSessionCookieName();
  
  return cookieStore.get(cookieName)?.value || null;
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const cookieName = getSessionCookieName();
  
  cookieStore.delete(cookieName);
}
