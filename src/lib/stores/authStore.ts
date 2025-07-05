import { writable } from 'svelte/store';
import { auth } from '$lib/firebase/client.js';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { browser } from '$app/environment';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Auth state store
export const authUser = writable<AuthUser | null>(null);
export const authLoading = writable(true);

// Initialize auth state listener (only in browser)
if (browser) {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      authUser.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      });
    } else {
      authUser.set(null);
    }
    authLoading.set(false);
  });
}

// Auth actions
export const authActions = {
  async signIn(email: string, password: string) {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    return signInWithEmailAndPassword(auth, email, password);
  },
  
  async signOut() {
    const { signOut } = await import('firebase/auth');
    return signOut(auth);
  },
  
  async createUser(email: string, password: string) {
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    return createUserWithEmailAndPassword(auth, email, password);
  }
};
