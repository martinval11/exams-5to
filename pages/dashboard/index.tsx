import { useEffect, useState } from "react";
import Head from "next/head";
import { Toaster, toast } from "sonner";

import { supabase } from "@/lib/supabaseClient";
import styles from "./style.module.css";

import DeleteExamDialog from "./components/DeleteExamDialog";
import AddExamDialog from "./components/AddExamDialog";
import EditExamDialog from "./components/EditExamDialog";
import { syncDate } from "@/lib/syncDate";
import { EXAMS_TABLE } from "@/keys/keys";

type exam = {
	id: number;
	title: string;
	assignatures: string;
	date: string;
};

type examProps = {
	examsDB: exam[];
};

const Dashboard = ({ examsDB }: examProps) => {
	const [addExamDialog, setAddExamDialog] = useState(false);
	const [deleteExamDialog, setDeleteExamDialog] = useState(false);
	const [editExamDialog, setEditExamDialog] = useState(false);

	const [exams, setExams] = useState<exam[]>(examsDB);

	const [editValues, setEditValues] = useState<exam>({
		id: 0,
		title: "",
		assignatures: "",
		date: "",
	});

	const [deleteIdButton, setDeleteIdButton] = useState("");

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

			<main className={styles.container}>
				<h1>Panel de Control</h1>

				{addExamDialog && (
					<AddExamDialog
						onError={() => toast.error("Algo salió mal")}
						onFinish={async () => {
							const { data: exams } = await supabase.from(EXAMS_TABLE).select("*");
							setAddExamDialog(false);
							const sortedExamsByDate = exams?.sort(
								(a, b) =>
									new Date(a.date).getTime() - new Date(b.date).getTime(),
							);
							setExams(sortedExamsByDate || []);
							toast.success("Examen agregado con éxito");
						}}
						onCancelDialog={() => setAddExamDialog(false)}
					/>
				)}

				{deleteExamDialog && (
					<DeleteExamDialog
						onError={() => toast.error("Algo salió mal")}
						id={deleteIdButton}
						onFinish={async () => {
							const { data: exams } = await supabase.from(EXAMS_TABLE).select("*");
							const sortedExamsByDate = exams?.sort(
								(a, b) =>
									new Date(a.date).getTime() - new Date(b.date).getTime(),
							);
							setExams(sortedExamsByDate || []);
							setDeleteExamDialog(false);
							toast.success("Examen borrado con éxito");
						}}
						onCancelDialog={() => setDeleteExamDialog(false)}
					/>
				)}

				{editExamDialog && (
					<EditExamDialog
						onError={() => toast.error("Algo salió mal")}
						values={editValues}
						onFinish={() => {
							setEditExamDialog(false);
							toast.success("Los cambios se han subido correctamente");
						}}
						globalExams={exams}
						parentCallback={(childData: exam[]) => {
							const examData: exam[] = childData.map((item: exam) => ({
								id: item.id,
								title: item.title,
								assignatures: item.assignatures,
								date: item.date,
							}));
							const sortedExamsByDate = examData.sort(
								(a, b) =>
									new Date(a.date).getTime() - new Date(b.date).getTime(),
							);

							setExams(sortedExamsByDate);
						}}
						onCancelDialog={() => setEditExamDialog(false)}
					/>
				)}

				<section className="exams">
					<button type="button" onClick={() => setAddExamDialog(true)}>
						Añadir examen
					</button>

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
							{exams.map((exam: exam, index: number) => (
								<tr
									key={exam.id}
									className={index === 0 ? styles.important : ""}
									title={index === 0 ? "Examen más cercano" : exam.title}
								>
									<td>{exam.title}</td>
									<td>{exam.assignatures}</td>
									<td>{syncDate(exam.date)}</td>
									<td>
										<details
											role="list"
											className={styles.actionsButtonContainer}
										>
											<summary aria-haspopup="listbox" role="button">
												<span>&#8942;</span>
											</summary>
											<ul className={styles.actions}>
												<button
													type="button"
													id={`${exam.id}`}
													onClick={() => {
														setEditValues({
															id: exam.id,
															title: exam.title,
															assignatures: exam.assignatures,
															date: exam.date,
														});
														setEditExamDialog(true);
													}}
												>
													Editar
												</button>
												<button
													type="button"
													id={`${exam.id}`}
													onClick={(event) => {
														const button = event.target as HTMLButtonElement;
														setDeleteIdButton(button.id);
														setDeleteExamDialog(true);
													}}
												>
													Borrar
												</button>
											</ul>
										</details>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</main>
			<Toaster richColors position="bottom-right" />
		</>
	);
};

export default Dashboard;

export const getServerSideProps = async () => {
	const { data: exams, error } = await supabase.from(EXAMS_TABLE).select("*");

	if (error) {
		throw new Error(error.message);
	}

	const sortedExamsByDate = exams.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	return {
		props: { examsDB: sortedExamsByDate },
	};
};
