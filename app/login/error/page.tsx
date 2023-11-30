import Link from 'next/link';
import styles from './styles.module.css';

const AuthError = () => {
	return (
		<main className={styles.container}>
			<h1>Error al autenticar al usuario</h1>
			<Link href='/login'>Volver al Login</Link>
		</main>
	)
}

export default AuthError;