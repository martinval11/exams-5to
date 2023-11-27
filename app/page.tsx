import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Toaster, toast } from 'sonner';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getToken, onMessage } from 'firebase/messaging';

import { messaging } from '../db/firebase';
import { supabase } from '@/lib/supabaseClient';
import styles from './style.module.css';
import { syncDate } from '@/lib/syncDate';
import { EXAMS_TABLE } from '@/keys/keys';

type exam = {
	id: number;
	title: string;
	assignatures: string;
	date: string;
};

type examProps = {
	examsDB: exam[];
};

const Home = ({ examsDB }: examProps) => {
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
			vapidKey:
				'BM1V4ir72Km1eI3AFasKofEKi8M169EB8W9Gf5UGaNHDWQL7LS7cEs_UItFx0hnBnYu1S2YNKhMc5dOrO_7h2q8',
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
			<Head>
				<title>Exámenes 5ºA</title>
				
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
			</Head>

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

export default Home;

export const getServerSideProps = async () => {
	const { data: exams, error } = await supabase.from(EXAMS_TABLE).select('*');

	if (error) {
		console.error(error)
		throw new Error(error.message);
	}

	const sortedExamsByDate = exams.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	return {
		props: { examsDB: sortedExamsByDate },
	};
};
