import { cookies } from 'next/headers';
import { getSessionCookieName, getSessionMaxAge } from './session';

export function setSessionCookie(token: string): void {
  const cookieStore = cookies();
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

export function getSessionCookie(): string | null {
  const cookieStore = cookies();
  const cookieName = getSessionCookieName();
  
  return cookieStore.get(cookieName)?.value || null;
}

export function clearSessionCookie(): void {
  const cookieStore = cookies();
  const cookieName = getSessionCookieName();
  
  cookieStore.delete(cookieName);
}
