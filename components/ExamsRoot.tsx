'use client';

import { getAuth, signInAnonymously } from 'firebase/auth';
import { getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

import { syncDate } from '@/lib/syncDate';
import { messaging } from '../db/firebase';
import styles from './style.module.css';

type exam = {
	id: number;
	title: string;
	assignatures: string;
	date: string;
};

const ExamsRoot = ({ examsDB }: { examsDB: exam[] }) => {
	const [exams] = useState<exam[]>(examsDB);
	const [loggedIn, setLoggedIn] = useState(false);
	const [messagesActivated, setMessagesActivated] = useState(false);

	const login = () => {
		const auth = getAuth();
		signInAnonymously(auth)
			.then(() => {
				setLoggedIn(true);
				localStorage.setItem('loggedIn', 'true');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const activateMessages = async () => {
		if (!messaging) {
			console.error('Messaging is not initialized');
			return;
		}

		const token = await getToken(messaging, {
			vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?? '',
		}).catch((error) => {
			// This error only occurs when the page is loaded for the first time.
			throw new Error(error.message);
		});

		if (token) {
			setMessagesActivated(true);
			return;
		}
		return;
	};

	const register = async () => {
		try {
			await login();
			if (!messagesActivated) {
				await activateMessages();
			}
		} catch (error) {
			if (error instanceof Error && localStorage.getItem('load') === null) {
				localStorage.setItem('load', '2');
				window.location.reload();
				throw new Error(error.message);
			}
			localStorage.setItem('load', '2');
			return;
		}
	};

	useEffect(() => {
		if (!loggedIn) {
			register();
			return;
		}

		if (messaging) {
			onMessage(messaging, (message) => {
				if (message.notification) {
					toast(message.notification.title);
				}
			});
		}
	}, []);

	return (
		<>
			<main className={styles.container}>
				<section className='exams'>
					<h1>Exámenes Pendientes</h1>

					{exams.length === 0 ? <h2>No hay exámenes</h2> : null}

					<table className={styles.table}>
						<thead>
							<tr>
								<th>Título</th>
								<th>Temas</th>
								<th>Fecha</th>
							</tr>
						</thead>

						<tbody>
							{exams.map((exam: exam, index: number) => (
								<tr
									key={exam.id}
									className={index === 0 ? styles.important : ''}
									title={index === 0 ? 'Examen más cercano' : exam.title}>
									<td>{exam.title}</td>
									<td>{exam.assignatures}</td>
									<td>{syncDate(exam.date)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</main>
			<Toaster richColors />
		</>
	);
};

export default ExamsRoot;
