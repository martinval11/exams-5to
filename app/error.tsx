'use client';

import { useEffect } from 'react';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="error">
      <h2>Algo salió mal</h2>
      <p>Intenta recargar la pagina o pulsa el botón para intentar de nuevo</p>
      <button onClick={() => reset()}>
        Intentar de nuevo
      </button>
    </main>
  );
}

export default Error;