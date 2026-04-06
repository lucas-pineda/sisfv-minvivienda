import { Injectable } from '@angular/core';

export type AppRole = 'admin';

export interface AppSession {
  email: string;
  role: AppRole;
  loggedInAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'pb_admin_session';

  getSession(): AppSession | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as AppSession;
      if (!parsed?.email) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  login(email: string, password: string): boolean {
    const normalizedEmail = (email ?? '').trim().toLowerCase();
    const normalizedPassword = (password ?? '').trim();

    if (!normalizedEmail || !normalizedPassword) {
      return false;
    }

    const session: AppSession = {
      email: normalizedEmail,
      role: 'admin',
      loggedInAt: Date.now()
    };

    localStorage.setItem(this.storageKey, JSON.stringify(session));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}
