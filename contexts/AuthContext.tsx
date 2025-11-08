'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, getCurrentUser, onAuthStateChange } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session with error handling
    getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Auth initialization error:', error);
        setLoading(false);
      });

    // Subscribe to auth changes with error handling
    try {
      const subscription = onAuthStateChange((newUser) => {
        setUser(newUser);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Auth subscription error:', error);
      setLoading(false);
    }
  }, []);

  const handleSignOut = async () => {
    const { signOut: signOutFn } = await import('@/lib/auth');
    await signOutFn();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
