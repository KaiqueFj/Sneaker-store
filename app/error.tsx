'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary-900 px-6">
      <div className="max-w-md w-full text-center bg-primary-800 rounded-2xl shadow-lg p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-600">Oops! Algo deu errado </h1>
          <p className="text-primary-600 text-base">
            Tivemos um problema inesperado. Você pode tentar novamente ou voltar mais tarde.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-primary-900 text-red-400 text-sm p-4 rounded-lg overflow-auto max-h-40 text-center">
            {error.message}
          </div>
        )}

        <button
          onClick={() => reset()}
          className="w-full py-3 rounded-xl font-semibold bg-accent-500 text-primary-900 hover:opacity-90 transition"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
