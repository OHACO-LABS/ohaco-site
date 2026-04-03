/**
 * Auth state management — localStorage-backed JWT session
 */

const KEYS = {
  token: 'ohaco_auth_token',
  user: 'ohaco_auth_user',
  keys: 'ohaco_api_keys',
} as const;

export interface AuthUser {
  email: string;
  user_id: string;
  tenant_id: string;
  plan: string;
}

export interface ApiKeys {
  api_key_write: string;
  api_key_read: string;
  tenant_id: string;
}

export function getToken(): string | null {
  return localStorage.getItem(KEYS.token);
}

export function getUser(): AuthUser | null {
  const raw = localStorage.getItem(KEYS.user);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function getStoredKeys(): ApiKeys | null {
  const raw = localStorage.getItem(KEYS.keys);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function saveAuth(token: string, user: AuthUser, keys?: ApiKeys): void {
  localStorage.setItem(KEYS.token, token);
  localStorage.setItem(KEYS.user, JSON.stringify(user));
  if (keys) {
    localStorage.setItem(KEYS.keys, JSON.stringify(keys));
  }
}

export function clearAuth(): void {
  localStorage.removeItem(KEYS.token);
  localStorage.removeItem(KEYS.user);
  localStorage.removeItem(KEYS.keys);
}
