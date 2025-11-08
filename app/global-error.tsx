'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            padding: '2rem',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Etwas ist schiefgelaufen
            </h2>
            <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
              {error.message || 'Ein unerwarteter Fehler ist aufgetreten.'}
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#4FD1FF',
                color: '#000000',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
