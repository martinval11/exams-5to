import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Página no encontrada - Exámenes 5ºA',
	robots: {
		index: false,
		follow: false,
	}
}

const NotFound = () => {
	return (
		<main className='error'>
			<h2>Página no encontrada</h2>
			<p>Escribiste mal la URL?</p>
			<Link href='/'>Volver al inicio</Link>
		</main>
	)
}

export default NotFound;