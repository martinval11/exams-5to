import { FormEvent, useRef, useState } from 'react';
import router from 'next/router';
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
}

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const auth = async (event: FormEvent) => {
		event.preventDefault();
		setIsLoading(true);

		const { data: users, error } = await supabase
			.from('users')
			.select('name, password');

		if (error) {
			toast.error('Algo salió mal');
			setIsLoading(false);
			throw new Error(error.message);
		}

		const searchUser = users.find(
			(user: user) =>
				user.name === usernameRef.current?.value &&
				decrypt(user.password).message === passwordRef.current?.value
		);

		if (searchUser) {
			sessionStorage.setItem('auth', 'true');
			router.push('/dashboard');
			return;
		}

		toast.error('Contraseña o Usuario Incorrectos');
		setIsLoading(false);
	};

	return (
		<>
			<main className={styles.container}>
				<h1>Iniciar Sesión</h1>
				<form onSubmit={auth}>
					<label>
						<span>Nombre de Usuario</span>
						<input
							type='text'
							placeholder='Tu nombre de usuario'
							ref={usernameRef}
							required
						/>
					</label>

					<label>
						<span>Contraseña</span>
						<input
							type='password'
							placeholder='Tu contraseña'
							ref={passwordRef}
							required
						/>
					</label>

					<button
						type='submit'
						aria-busy={isLoading}>
						{isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
					</button>
				</form>
			</main>
			<Toaster
				richColors
				position='bottom-right'
			/>
		</>
	);
};

export default Login;
