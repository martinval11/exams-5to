import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { Toaster, toast } from 'sonner';

import { supabase } from '@/lib/supabaseClient';
import { decrypt } from '@/lib/decrypt';

import styles from './styles.module.css';

type user = {
  name: string;
  password: string;
};

export const metadata: Metadata = {
  title: 'Exámenes 5ºA - Iniciar Sesión',
  description: '',
  robots: {
    index: false,
    follow: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  icons: {
    shortcut: '/icon-512x512.png',
  },
};

const Login = () => {
  const auth = async (formData: FormData) => {
    'use server';
    const username = formData.get('username');
    const password = formData.get('password');

    const { data: users, error } = await supabase
      .from('users')
      .select('name, password');

    if (error) {
      toast.error('Algo salió mal');
      throw new Error(error.message);
    }

    const searchUser = users.find(
      (user: user) =>
        user.name === username && decrypt(user.password).message === password
    );

    if (searchUser) {
      //sessionStorage.setItem('auth', 'true');
      redirect('/dashboard');
    }

    toast.error('Contraseña o Usuario Incorrectos');
  };

  return (
    <>
      <main className={styles.container}>
        <h1>Iniciar Sesión</h1>
        <form action={auth}>
          <label>
            <span>Nombre de Usuario</span>
            <input
              type='text'
              placeholder='Tu nombre de usuario'
              name='username'
              required
            />
          </label>

          <label>
            <span>Contraseña</span>
            <input
              type='password'
              placeholder='Tu contraseña'
              name='password'
              required
            />
          </label>

          <button type='submit'>
            Iniciar Sesión
          </button>
        </form>
      </main>
      <Toaster richColors position='bottom-right' />
    </>
  );
};

export default Login;
