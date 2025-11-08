'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="glass-card p-8 rounded-2xl max-w-md text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Etwas ist schiefgelaufen
        </h2>
        <p className="text-text-secondary mb-6">
          {error.message || 'Ein unerwarteter Fehler ist aufgetreten.'}
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
