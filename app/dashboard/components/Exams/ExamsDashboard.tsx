'use client';

import { useState } from 'react';
import { Toaster, toast } from 'sonner';

import { supabase } from '@/lib/supabaseClient';
import styles from '../style.module.css';

import { EXAMS_TABLE } from '@/keys/keys';
import { sortedExamsByDate } from '@/lib/sortExamsByDate';
import { syncDate } from '@/lib/syncDate';
import AddExamDialog from '../../components/AddExamDialog';
import DeleteExamDialog from '../../components/DeleteExamDialog';
import EditExamDialog from '../../components/EditExamDialog';

type exam = {
	id: number;
	title: string;
	assignatures: string;
	date: string;
};

type examProps = {
	examsDB: exam[];
};

const ExamsDashboard: React.FC<examProps> = ({ examsDB }) => {
	const [addExamDialog, setAddExamDialog] = useState(false);
	const [deleteExamDialog, setDeleteExamDialog] = useState(false);
	const [editExamDialog, setEditExamDialog] = useState(false);

	const [exams, setExams] = useState<exam[]>(examsDB);

	const [editValues, setEditValues] = useState<exam>({
		id: 0,
		title: '',
		assignatures: '',
		date: '',
	});

	const [deleteIdButton, setDeleteIdButton] = useState('');

	const displayError = () => {
		toast.error('Algo salió mal');
	};

	const closeDialog = () => {
		setAddExamDialog(false);
		setDeleteExamDialog(false);
		setEditExamDialog(false);
	}

	return (
		<>
			<main className={styles.container}>
				<h1>Panel de Control</h1>

				{addExamDialog && (
					<AddExamDialog
						onError={displayError}
						onFinish={async () => {
							const { data: exams } = await supabase.from(EXAMS_TABLE).select('*');

							const examsByDate = sortedExamsByDate(exams || []);
							setExams(examsByDate);

							closeDialog();
							toast.success('Examen agregado con éxito');
						}}
						onCancelDialog={closeDialog}
					/>
				)}

				{deleteExamDialog && (
					<DeleteExamDialog
						onError={displayError}
						id={deleteIdButton}
						onFinish={async () => {
							const { data: exams } = await supabase
								.from(EXAMS_TABLE)
								.select('*');

							const examsByDate = sortedExamsByDate(exams || []);
							setExams(examsByDate);

							closeDialog();
							toast.success('Examen borrado con éxito');
						}}
						onCancelDialog={closeDialog}
					/>
				)}

				{editExamDialog && (
					<EditExamDialog
						onError={displayError}
						values={editValues}
						onFinish={() => {
							closeDialog();
							toast.success('Los cambios se han subido correctamente');
						}}
						globalExams={exams}
						parentCallback={(childData: exam[]) => {
							const examData: exam[] = childData.map((item: exam) => ({
								id: item.id,
								title: item.title,
								assignatures: item.assignatures,
								date: item.date,
							}));

							const examsByDate = sortedExamsByDate(examData || []);
							setExams(examsByDate);
						}}
						onCancelDialog={closeDialog}
					/>
				)}

				<section>
					<button
						type='button'
						onClick={() => setAddExamDialog(true)}
						data-cy='addExamButton'>
						Añadir examen
					</button>

					{exams.length === 0 ? <h2>No hay exámenes</h2> : null}

					<table className={styles.table}>
						<thead>
							<tr>
								<th>Título</th>
								<th>Temas</th>
								<th>Fecha</th>
								<th></th>
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
									<td>
										<details
											role='list'
											className={styles.actionsButtonContainer}
											data-cy='actionsButton'>
											<summary
												aria-haspopup='listbox'
												role='button'>
												<span>&#8942;</span>
											</summary>
											<ul className={styles.actions}>
												<button
													type='button'
													id={exam.id.toString()}
													data-cy='editExamButton'
													onClick={() => {
														setEditValues({
															id: exam.id,
															title: exam.title,
															assignatures: exam.assignatures,
															date: exam.date,
														});
														setEditExamDialog(true);
													}}>
													Editar
												</button>
												<button
													type='button'
													id={exam.id.toString()}
													data-cy='deleteExamButton'
													onClick={(event) => {
														const button = event.target as HTMLButtonElement;
														setDeleteIdButton(button.id);
														setDeleteExamDialog(true);
													}}>
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
			<Toaster
				richColors
				position='bottom-right'
			/>
		</>
	);
};

export default ExamsDashboard;