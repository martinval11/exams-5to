import { FormEvent, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Toaster, toast } from "sonner";

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

const Dashboard = ({ examsDB }: examProps) => {
	const [exams, setExams] = useState<exam[]>(examsDB);
	const [examDate, setExamDate] = useState("");
	const [isLoading, setIsLoading] = useState("false");

	const [deleteIdButton, setDeleteIdButton] = useState("");

	const examTitleRef = useRef<HTMLInputElement>(null);
	const examAssignaturesRef = useRef<HTMLInputElement>(null);
	const addExamRef = useRef<HTMLDialogElement>(null);
	const deleteExamRef = useRef<HTMLDialogElement>(null);

	const addExam = async (event: FormEvent) => {
		event.preventDefault();
		setIsLoading("true");

		const { data, error } = await supabase
			.from("exams")
			.insert([
				{
					title: examTitleRef?.current?.value,
					assignatures: examAssignaturesRef?.current?.value,
					exam_date: examDate,
				},
			])
			.select();

		if (error) {
			toast.error("Ha ocurrido un error");
			addExamRef.current?.close();
			setIsLoading("false");
			throw new Error(`DB error: ${error}`);
		}

		setIsLoading("false");
		addExamRef.current?.close();
		setExams([...exams, data[0]]);
	};

	const deleteExam = async () => {
		const { error } = await supabase
			.from("exams")
			.delete()
			.eq("id", Number(deleteIdButton));

		if (error) {
			toast.error("Algo salió mal");
			console.error(`DB error: ${error}`);
			return;
		}

		const { data: exams } = await supabase.from("exams").select("*");
		deleteExamRef.current?.close();
		setExams(exams || []);
	};

	useEffect(() => {
		const token = sessionStorage.getItem("auth");

		if (token !== "true") {
			window.location.href = "/login";
			return;
		}
	}, []);

	return (
		<>
			<Head>
				<title>Exámenes 5ºA - Panel de Control</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Toaster richColors position="bottom-right" />

			<main className={styles.container}>
				<h1>Panel de Control</h1>
				<div>
					<button type="button" onClick={() => addExamRef.current?.showModal()}>
						Añadir examen
					</button>
					<dialog ref={addExamRef}>
						<article>
							<header className={styles.dialogHeader}>
								<button
									type="button"
									aria-label="Close"
									className={`close ${styles.closeModalButton}`}
									onClick={() => addExamRef.current?.close()}
								/>
								<h3>Añadir examen</h3>
							</header>
							<form onSubmit={addExam} className={styles.form}>
								<label>
									<span>Título del Examen</span>
									<input
										type="text"
										placeholder="Título del Examen"
										ref={examTitleRef}
										required
									/>
								</label>

								<label>
									<span>Temas</span>
									<input
										type="text"
										placeholder="Ej: Tema 1, Tema 2, Tema 3..."
										ref={examAssignaturesRef}
										required
									/>
								</label>

								<label>
									<span>Fecha del examen</span>
									<input
										type="date"
										value={examDate}
										onChange={(e) => setExamDate(e.target.value)}
										required
									/>
								</label>

								<button type="submit" aria-busy={isLoading === "true"}>
									{isLoading === "true" ? "Publicando..." : "Publicar"}
								</button>
							</form>
						</article>
					</dialog>

					<dialog ref={deleteExamRef}>
						<article>
							<h3>¿Estas seguro que deseas borrar este elemento?</h3>
							<p>Esta acción no se puede deshacer.</p>
							<footer className={styles.dialogFooter}>
								<button
									type="button"
									className="secondary"
									onClick={() => deleteExamRef.current?.close()}
								>
									Cancelar
								</button>
								<button type="button" onClick={deleteExam}>
									Borrar
								</button>
							</footer>
						</article>
					</dialog>

					<section className="exams">
						{exams.length === 0 ? <h2>No hay exámenes</h2> : null}

						<table className={styles.table}>
							<thead>
								<tr>
									<th>Título</th>
									<th>Temas</th>
									<th>Fecha</th>
									<th>{""}</th>
								</tr>
							</thead>

							<tbody>
								{exams.map((exam: exam) => (
									<tr key={exam.id}>
										<td>{exam.title}</td>
										<td>{exam.assignatures}</td>
										<td>
											{new Date(
												new Date(exam.exam_date).getTime() + 86400000,
											).toLocaleDateString("es-ar") || exam.exam_date}
										</td>
										<td>
											<details
												role="list"
												className={styles.actionsButtonContainer}
											>
												<summary aria-haspopup="listbox" role="button">
													<span>&#8942;</span>
												</summary>
												<ul className={styles.actions}>
													<li>
														<button
															type="button"
															id={`${exam.id}`}
															onClick={(event) => {
																const button =
																	event.target as HTMLButtonElement;
																setDeleteIdButton(button.id);
																deleteExamRef.current?.showModal();
															}}
														>
															Borrar
														</button>
													</li>
												</ul>
											</details>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				</div>
			</main>
		</>
	);
};

export default Dashboard;

export async function getServerSideProps() {
	const { data: exams, error } = await supabase.from("exams").select("*");

	if (error) {
		throw new Error(error.message);
	}

	return {
		props: { examsDB: exams },
	};
}
