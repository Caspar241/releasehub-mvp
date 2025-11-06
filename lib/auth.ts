import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(
  email: string,
  password: string,
  name?: string
): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        },
      },
    });

    if (error) {
      return { user: null, error: { message: error.message, code: error.code } };
    }

    if (!data.user) {
      return { user: null, error: { message: 'Sign up failed' } };
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name || name,
        created_at: data.user.created_at,
      },
      error: null,
    };
  } catch (err) {
    return {
      user: null,
      error: { message: 'An unexpected error occurred' },
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: { message: error.message, code: error.code } };
    }

    if (!data.user) {
      return { user: null, error: { message: 'Sign in failed' } };
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        created_at: data.user.created_at,
      },
      error: null,
    };
  } catch (err) {
    return {
      user: null,
      error: { message: 'An unexpected error occurred' },
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: { message: error.message, code: error.code } };
    }

    return { error: null };
  } catch (err) {
    return { error: { message: 'An unexpected error occurred' } };
  }
}

/**
 * Get the current user session
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Get session error:', error);
      return null;
    }

    if (!data.session?.user) {
      return null;
    }

    return {
      id: data.session.user.id,
      email: data.session.user.email!,
      name: data.session.user.user_metadata?.name,
      created_at: data.session.user.created_at,
    };
  } catch (err) {
    console.error('Get session error:', err);
    return null;
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      created_at: data.user.created_at,
    };
  } catch (err) {
    return null;
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name,
          created_at: session.user.created_at,
        });
      } else {
        callback(null);
      }
    }
  );

  return subscription;
}
