import { Metadata, Viewport } from 'next';

import Form from './Form';
import styles from './styles.module.css';

export const metadata: Metadata = {
  title: 'Exámenes 5ºA - Iniciar Sesión',
  description: '',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    shortcut: '/icon-512x512.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const Login = () => {
  return (
    <main className={styles.container}>
      <h1>Iniciar Sesión</h1>
      <Form />
    </main>
  );
};

export default Login;
