'use client';

import { useState } from 'react';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  onCloseLogin: () => void;
  onCloseSignup: () => void;
  onSwitchToSignup: () => void;
  onSwitchToLogin: () => void;
}

export default function AuthModals({
  isLoginOpen,
  isSignupOpen,
  onCloseLogin,
  onCloseSignup,
  onSwitchToSignup,
  onSwitchToLogin,
}: AuthModalsProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase Auth
    console.log('Login:', { loginEmail, loginPassword });
    alert('Login-Funktion kommt in Phase 2 (Supabase Auth Integration)');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase Auth + Stripe
    console.log('Signup:', { signupName, signupEmail, signupPassword });
    alert('Sign-up wird zu Pricing weitergeleitet (Phase 2)');
    window.location.href = '/pricing';
  };

  return (
    <>
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-pricing p-8 max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={onCloseLogin}
              className="absolute top-4 right-4 text-text-secondary hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-bold mb-2">Willkommen zurück</h2>
            <p className="text-text-secondary mb-6">Log dich in deinen ReleaseHub-Account ein.</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-primary"
                  placeholder="deine@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="login-password" className="block text-sm font-semibold mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="login-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full mb-4">
                Log in
              </button>

              <div className="text-center text-sm text-text-secondary">
                Noch kein Account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-primary font-semibold hover:text-accent"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-pricing p-8 max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={onCloseSignup}
              className="absolute top-4 right-4 text-text-secondary hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-bold mb-2">Starte mit ReleaseHub</h2>
            <p className="text-text-secondary mb-6">Erstelle deinen Account und wähle dein Abo.</p>

            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label htmlFor="signup-name" className="block text-sm font-semibold mb-2">
                  Name / Artist-Name
                </label>
                <input
                  type="text"
                  id="signup-name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Dein Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="signup-email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-primary"
                  placeholder="deine@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="signup-password" className="block text-sm font-semibold mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="signup-password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <p className="text-xs text-text-secondary mt-1">Mindestens 8 Zeichen</p>
              </div>

              <button type="submit" className="btn-primary w-full mb-4">
                Weiter zu Pricing →
              </button>

              <div className="text-center text-sm text-text-secondary">
                Schon ein Account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-primary font-semibold hover:text-accent"
                >
                  Log in
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-border-light text-xs text-text-secondary text-center">
              Mit Sign up akzeptierst du unsere{' '}
              <a href="/agb" className="text-primary hover:underline">
                AGB
              </a>{' '}
              und{' '}
              <a href="/datenschutz" className="text-primary hover:underline">
                Datenschutz
              </a>
              .
            </div>
          </div>
        </div>
      )}
    </>
  );
}
