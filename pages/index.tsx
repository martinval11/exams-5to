import { useState } from "react";
import Head from "next/head";

import { supabase } from "@/lib/supabaseClient";
import styles from "./style.module.css";

type exam = {
	id: number;
	title: string;
	assignatures: string;
	exam_date: string;
};

type examProps = {
	examsDB: exam[];
};

const Home = ({ examsDB }: examProps) => {
	const [exams] = useState<exam[]>(examsDB);

	return (
		<>
			<Head>
				<title>Exámenes 5ºA</title>
				<meta
					name="description"
					content="Verifica los exámenes que tienes que hacer y no te olvides de ninguno"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<main className={styles.container}>
				<div>
					<h1>Exámenes Pendientes</h1>
					<div className="exams">
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
								{exams.map((exam: exam) => (
									<tr key={exam.id}>
										<td>{exam.title}</td>
										<td>{exam.assignatures}</td>
										<td>{new Date(exam.exam_date).toLocaleDateString("en-GB") || exam.exam_date}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;

export async function getServerSideProps() {
	const { data: exams, error } = await supabase.from("exams").select("*");

	if (error) {
		throw new Error(error.message);
	}

	return {
		props: { examsDB: exams },
	};
}
