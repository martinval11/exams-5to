import { useState, useRef, MouseEventHandler, FormEvent } from 'react';

import styles from './style.module.css';
import { supabase } from '@/lib/supabaseClient';
import { EXAMS_TABLE } from '@/keys/keys';

type exam = {
	id: number;
	title: string;
	assignatures: string;
	date: string;
};

type EditExamDialogProps = {
	onError: () => void;
	onFinish: () => void;
	onCancelDialog: MouseEventHandler<HTMLButtonElement>;
	values: exam;
	globalExams: Array<exam>;
	parentCallback: (callback: exam[]) => void;
}

const EditExamDialog = ({
	onError,
	onFinish,
	onCancelDialog,
	values,
	globalExams,
	parentCallback,
}: EditExamDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const addEditedExam = async (event: FormEvent) => {
		event.preventDefault();
		setIsLoading(true);

		const form = new FormData(event.currentTarget as HTMLFormElement);
		const entries = Array.from(form.entries());
		
		const exam = {
			title: entries[0][1],
			assignatures: entries[1][1],
			date: entries[2][1],
		};

		const { data, error } = await supabase
			.from(EXAMS_TABLE)
			.update(exam)
			.eq('id', values.id)
			.select();

		if (error) {
			onError();
			setIsLoading(false);
			throw new Error(`DB error: ${error.message}`);
		}

		setIsLoading(false);

		// Remove the old exam from the exams array
		const updatedExams = globalExams.filter((exam) => exam.id !== values.id);
		parentCallback([...updatedExams, data[0]]);
		onFinish();
	};

	return (
		<dialog open>
			<article>
				<header className={styles.dialogHeader}>
					<button
						type='button'
						aria-label='Close'
						className={`close ${styles.closeModalButton}`}
						onClick={onCancelDialog}
					/>
					<h3>Editar examen</h3>
				</header>
				<form
					onSubmit={addEditedExam}
					className={styles.form}>
					<label>
						<span>Título del Examen</span>
						<input
							type='text'
							placeholder='Título del Examen'
							defaultValue={values?.title}
							name='examTitle'
							required
						/>
					</label>

					<label>
						<span>Temas</span>
						<input
							type='text'
							placeholder='Ej: Tema 1, Tema 2, Tema 3...'
							defaultValue={values?.assignatures}
							name='examAssignatures'
							required
						/>
					</label>

					<label>
						<span>Fecha del examen</span>
						<input
							type='date'
							defaultValue={values?.date}
							name='examDate'
							required
						/>
					</label>

					<button
						type='submit'
						aria-busy={isLoading}>
						{isLoading ? 'Publicando...' : 'Publicar'}
					</button>
				</form>
			</article>
		</dialog>
	);
};

export default EditExamDialog;
